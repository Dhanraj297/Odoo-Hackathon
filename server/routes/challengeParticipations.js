const express = require('express');
const router = express.Router();
const ChallengeParticipation = require('../models/ChallengeParticipation');
const User = require('../models/User');
const Challenge = require('../models/Challenge');
const Notification = require('../models/Notification');
const Settings = require('../models/Settings');
const upload = require('../middleware/upload');
const { protect, requireRole } = require('../middleware/auth');
const { autoBadgeAward } = require('../utils/badgeEngine');

router.get('/', protect, async (req, res) => {
  try {
    const { challenge, employee } = req.query;
    const filter = {};
    if (challenge) filter.challenge = challenge;
    if (employee) filter.employee = employee;
    if (req.user.role === 'employee') filter.employee = req.user._id;
    res.json(await ChallengeParticipation.find(filter)
      .populate('challenge', 'title xp difficulty')
      .populate('employee', 'name email avatar')
      .populate('approvedBy', 'name'));
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Join a challenge
router.post('/', protect, upload.single('proof'), async (req, res) => {
  try {
    const { challenge } = req.body;
    const ch = await Challenge.findById(challenge);
    if (!ch || ch.status !== 'Active') return res.status(400).json({ message: 'Challenge is not active' });

    const settings = await Settings.findOne();
    if (ch.evidenceRequired && settings?.evidenceRequired && !req.file)
      return res.status(400).json({ message: 'Evidence file is required' });

    const data = { challenge, employee: req.user._id, progress: 100 };
    if (req.file) data.proof = `/uploads/${req.file.filename}`;
    const participation = await ChallengeParticipation.create(data);
    res.status(201).json(participation);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

// Approve/reject
router.put('/:id/approve', protect, requireRole('admin', 'hr_manager'), async (req, res) => {
  try {
    const { status, note } = req.body;
    const part = await ChallengeParticipation.findById(req.params.id).populate('challenge');
    if (!part) return res.status(404).json({ message: 'Not found' });

    part.approval = status;
    part.approvedBy = req.user._id;
    part.approvalNote = note || '';

    if (status === 'Approved') {
      part.xpAwarded = part.challenge.xp;
      part.completedAt = new Date();
      await User.findByIdAndUpdate(part.employee, {
        $inc: { xp: part.challenge.xp, completedChallenges: 1 }
      });
      const settings = await Settings.findOne();
      if (settings?.badgeAutoAward) await autoBadgeAward(req.app.get('io'));
    }

    await part.save();

    const notif = await Notification.create({
      user: part.employee,
      type: 'challenge_approval',
      title: `Challenge ${status}`,
      message: `Your submission for "${part.challenge.title}" was ${status.toLowerCase()}. ${status === 'Approved' ? `+${part.xpAwarded} XP!` : ''}`,
      data: { participationId: part._id }
    });
    req.app.get('io')?.to(part.employee.toString()).emit('notification', notif);

    res.json(part);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
