const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'hr_manager', 'employee', 'auditor'], default: 'employee' },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  avatar: { type: String, default: '' },
  xp: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
  badges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Badge' }],
  level: { type: Number, default: 1 },
  completedChallenges: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
