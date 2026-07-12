const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  description: { type: String, default: '' },
  xp: { type: Number, required: true, min: 0 },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard', 'Expert'], default: 'Medium' },
  evidenceRequired: { type: Boolean, default: false },
  deadline: { type: Date },
  status: { type: String, enum: ['Draft', 'Active', 'Under Review', 'Completed', 'Archived'], default: 'Draft' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  maxParticipants: { type: Number, default: 0 },
  image: { type: String, default: '' },
  tags: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Challenge', challengeSchema);
