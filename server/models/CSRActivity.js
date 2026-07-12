const mongoose = require('mongoose');

const csrActivitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  description: { type: String, default: '' },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  pointsReward: { type: Number, default: 50 },
  deadline: { type: Date },
  maxParticipants: { type: Number, default: 0 }, // 0 = unlimited
  status: { type: String, enum: ['upcoming', 'ongoing', 'completed', 'cancelled'], default: 'upcoming' },
  location: { type: String, default: '' },
  image: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('CSRActivity', csrActivitySchema);
