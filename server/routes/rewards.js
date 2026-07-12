const express = require('express');
const router = express.Router();
const Reward = require('../models/Reward');
const RewardRedemption = require('../models/RewardRedemption');
const User = require('../models/User');
const Notification = require('../models/Notification');
const { protect, requireRole } = require('../middleware/auth');

router.get('/', protect, async (req, res) => {
  try { res.json(await Reward.find({ status: { $ne: 'inactive' } })); }
  catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/', protect, requireRole('admin'), async (req, res) => {
  try { res.status(201).json(await Reward.create(req.body)); }
  catch (err) { res.status(400).json({ message: err.message }); }
});

router.put('/:id', protect, requireRole('admin'), async (req, res) => {
  try {
    const reward = await Reward.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!reward) return res.status(404).json({ message: 'Not found' });
    res.json(reward);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

// Redeem a reward
router.post('/:id/redeem', protect, async (req, res) => {
  try {
    const reward = await Reward.findById(req.params.id);
    if (!reward) return res.status(404).json({ message: 'Reward not found' });
    if (reward.status !== 'active') return res.status(400).json({ message: 'Reward is not available' });
    if (reward.stock === 0) return res.status(400).json({ message: 'Out of stock' });

    const user = await User.findById(req.user._id);
    if (user.points < reward.pointsRequired)
      return res.status(400).json({ message: `Insufficient points. Need ${reward.pointsRequired}, have ${user.points}` });

    // Deduct points
    user.points -= reward.pointsRequired;
    await user.save();

    // Reduce stock
    if (reward.stock > 0) { reward.stock -= 1; reward.redeemCount += 1; }
    if (reward.stock === 0) reward.status = 'out_of_stock';
    await reward.save();

    const redemption = await RewardRedemption.create({
      reward: reward._id, employee: user._id, pointsDeducted: reward.pointsRequired
    });

    const notif = await Notification.create({
      user: user._id, type: 'reward_redeemed',
      title: '🎁 Reward Redeemed!',
      message: `You've redeemed "${reward.name}" for ${reward.pointsRequired} points.`,
      data: { redemptionId: redemption._id }
    });
    req.app.get('io')?.to(user._id.toString()).emit('notification', notif);

    res.json({ redemption, remainingPoints: user.points });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Get redemptions
router.get('/redemptions/my', protect, async (req, res) => {
  try {
    res.json(await RewardRedemption.find({ employee: req.user._id }).populate('reward'));
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
