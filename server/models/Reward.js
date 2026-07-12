const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  pointsRequired: { type: Number, required: true, min: 0 },
  stock: { type: Number, default: -1 }, // -1 = unlimited
  status: { type: String, enum: ['active', 'inactive', 'out_of_stock'], default: 'active' },
  image: { type: String, default: '' },
  category: { type: String, enum: ['Gift Card', 'Experience', 'Merchandise', 'Time Off', 'Other'], default: 'Other' },
  redeemCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Reward', rewardSchema);
