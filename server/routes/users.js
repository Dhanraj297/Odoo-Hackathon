const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect, requireRole } = require('../middleware/auth');

router.get('/', protect, requireRole('admin', 'hr_manager'), async (req, res) => {
  try {
    const { department, role } = req.query;
    const filter = {};
    if (department) filter.department = department;
    if (role) filter.role = role;
    res.json(await User.find(filter).select('-password').populate('department', 'name').populate('badges', 'name icon'));
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/:id', protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password').populate('department').populate('badges');
    if (!user) return res.status(404).json({ message: 'Not found' });
    res.json(user);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.put('/:id', protect, requireRole('admin'), async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
    res.json(user);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

module.exports = router;
