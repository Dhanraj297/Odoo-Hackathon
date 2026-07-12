const mongoose = require('mongoose');

const rewardRedemptionSchema = new mongoose.Schema({
  reward: { type: mongoose.Schema.Types.ObjectId, ref: 'Reward', required: true },
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pointsDeducted: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Fulfilled', 'Cancelled'], default: 'Pending' },
  notes: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('RewardRedemption', rewardRedemptionSchema);
