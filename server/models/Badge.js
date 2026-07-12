const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  icon: { type: String, default: '🏆' },
  unlockRule: {
    type: { type: String, enum: ['xp', 'challenges_completed', 'csr_activities', 'points'], required: true },
    threshold: { type: Number, required: true }
  },
  rarity: { type: String, enum: ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'], default: 'Common' },
  xpBonus: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Badge', badgeSchema);
