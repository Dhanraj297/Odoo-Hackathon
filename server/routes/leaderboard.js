const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/auth');

router.get('/', protect, async (req, res) => {
  try {
    const { type = 'xp', department, limit = 20 } = req.query;
    const filter = { isActive: true };
    if (department) filter.department = department;
    const sortField = type === 'points' ? '-points' : '-xp';
    const users = await User.find(filter)
      .select('name email avatar xp points level department completedChallenges badges')
      .populate('department', 'name')
      .populate('badges', 'name icon rarity')
      .sort(sortField)
      .limit(parseInt(limit));
    res.json(users);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
