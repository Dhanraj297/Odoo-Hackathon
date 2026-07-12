const express = require('express');
const router = express.Router();
const ESGPolicy = require('../models/ESGPolicy');
const PolicyAcknowledgement = require('../models/PolicyAcknowledgement');
const Notification = require('../models/Notification');
const User = require('../models/User');
const { protect, requireRole } = require('../middleware/auth');

router.get('/', protect, async (req, res) => {
  try {
    const { category, department } = req.query;
    const filter = { isActive: true };
    if (category) filter.category = category;
    if (department) filter.department = department;
    const policies = await ESGPolicy.find(filter).populate('department', 'name').populate('createdBy', 'name');
    res.json(policies);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/:id', protect, async (req, res) => {
  try {
    const policy = await ESGPolicy.findById(req.params.id).populate('department', 'name');
    if (!policy) return res.status(404).json({ message: 'Not found' });
    res.json(policy);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/', protect, requireRole('admin'), async (req, res) => {
  try {
    const policy = await ESGPolicy.create({ ...req.body, createdBy: req.user._id });
    // Send policy reminder notifications to all employees
    const employees = await User.find({ role: 'employee', isActive: true });
    const notifs = employees.map(emp => ({
      user: emp._id,
      type: 'policy_reminder',
      title: 'New Policy: Acknowledgement Required',
      message: `Please review and acknowledge the policy: "${policy.title}"`,
      data: { policyId: policy._id }
    }));
    const created = await Notification.insertMany(notifs);
    const io = req.app.get('io');
    created.forEach(n => io?.to(n.user.toString()).emit('notification', n));
    res.status(201).json(policy);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.put('/:id', protect, requireRole('admin'), async (req, res) => {
  try {
    const p = await ESGPolicy.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!p) return res.status(404).json({ message: 'Not found' });
    res.json(p);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.delete('/:id', protect, requireRole('admin'), async (req, res) => {
  try {
    await ESGPolicy.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ message: 'Policy deactivated' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
