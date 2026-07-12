const express = require('express');
const router = express.Router();
const EmployeeParticipation = require('../models/EmployeeParticipation');
const CSRActivity = require('../models/CSRActivity');
const User = require('../models/User');
const Notification = require('../models/Notification');
const Settings = require('../models/Settings');
const upload = require('../middleware/upload');
const { protect, requireRole } = require('../middleware/auth');
const { autoBadgeAward } = require('../utils/badgeEngine');

router.get('/', protect, async (req, res) => {
  try {
    const { employee, activity, status } = req.query;
    const filter = {};
    if (employee) filter.employee = employee;
    if (activity) filter.activity = activity;
    if (status) filter.approvalStatus = status;
    // Employees only see their own
    if (req.user.role === 'employee') filter.employee = req.user._id;
    res.json(await EmployeeParticipation.find(filter)
      .populate('employee', 'name email avatar')
      .populate('activity', 'title pointsReward')
      .populate('approvedBy', 'name'));
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Employee joins an activity
router.post('/', protect, upload.single('proof'), async (req, res) => {
  try {
    const settings = await Settings.findOne();
    const { activity } = req.body;
    if (settings?.evidenceRequired && !req.file)
      return res.status(400).json({ message: 'Proof file is required' });

    const data = { employee: req.user._id, activity };
    if (req.file) data.proof = `/uploads/${req.file.filename}`;
    const participation = await EmployeeParticipation.create(data);
    res.status(201).json(participation);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

// Approve/Reject participation (admin/hr)
router.put('/:id/approve', protect, requireRole('admin', 'hr_manager'), async (req, res) => {
  try {
    const { status, note } = req.body; // 'Approved' or 'Rejected'
    const part = await EmployeeParticipation.findById(req.params.id).populate('activity');
    if (!part) return res.status(404).json({ message: 'Not found' });

    part.approvalStatus = status;
    part.approvedBy = req.user._id;
    part.approvalNote = note || '';

    if (status === 'Approved') {
      part.completionDate = new Date();
      part.pointsEarned = part.activity.pointsReward;
      // Award points to user
      await User.findByIdAndUpdate(part.employee, {
        $inc: { points: part.activity.pointsReward, xp: Math.floor(part.activity.pointsReward * 0.5) }
      });

      // Check badge auto-award
      const settings = await Settings.findOne();
      if (settings?.badgeAutoAward) await autoBadgeAward(req.app.get('io'));
    }

    await part.save();

    // Notify employee
    const notif = await Notification.create({
      user: part.employee,
      type: 'csr_approval',
      title: `CSR Activity ${status}`,
      message: `Your participation in "${part.activity.title}" has been ${status.toLowerCase()}.`,
      data: { participationId: part._id }
    });
    req.app.get('io')?.to(part.employee.toString()).emit('notification', notif);

    res.json(part);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
