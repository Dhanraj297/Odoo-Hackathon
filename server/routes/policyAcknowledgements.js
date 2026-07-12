const express = require('express');
const router = express.Router();
const PolicyAcknowledgement = require('../models/PolicyAcknowledgement');
const { protect } = require('../middleware/auth');

router.get('/', protect, async (req, res) => {
  try {
    const { policy, employee } = req.query;
    const filter = {};
    if (policy) filter.policy = policy;
    if (employee) filter.employee = employee;
    res.json(await PolicyAcknowledgement.find(filter)
      .populate('policy', 'title version')
      .populate('employee', 'name email'));
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Employee acknowledges a policy
router.post('/', protect, async (req, res) => {
  try {
    const { policy } = req.body;
    const existing = await PolicyAcknowledgement.findOne({ policy, employee: req.user._id });
    if (existing) return res.status(400).json({ message: 'Already acknowledged' });
    const ack = await PolicyAcknowledgement.create({ policy, employee: req.user._id });
    res.status(201).json(ack);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

// Stats: how many acknowledged a specific policy
router.get('/stats/:policyId', protect, async (req, res) => {
  try {
    const { policyId } = req.params;
    const count = await PolicyAcknowledgement.countDocuments({ policy: policyId });
    const User = require('../models/User');
    const total = await User.countDocuments({ isActive: true });
    res.json({ acknowledged: count, total, rate: total ? Math.round((count / total) * 100) : 0 });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
