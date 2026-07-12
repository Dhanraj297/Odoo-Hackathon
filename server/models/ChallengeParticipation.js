const mongoose = require('mongoose');

const challengeParticipationSchema = new mongoose.Schema({
  challenge: { type: mongoose.Schema.Types.ObjectId, ref: 'Challenge', required: true },
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  progress: { type: Number, min: 0, max: 100, default: 0 },
  proof: { type: String, default: '' },
  approval: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  approvalNote: { type: String, default: '' },
  xpAwarded: { type: Number, default: 0 },
  completedAt: { type: Date }
}, { timestamps: true });

challengeParticipationSchema.index({ challenge: 1, employee: 1 }, { unique: true });

module.exports = mongoose.model('ChallengeParticipation', challengeParticipationSchema);
