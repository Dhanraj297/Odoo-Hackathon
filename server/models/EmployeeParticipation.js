const mongoose = require('mongoose');

const employeeParticipationSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  activity: { type: mongoose.Schema.Types.ObjectId, ref: 'CSRActivity', required: true },
  proof: { type: String, default: '' }, // file path
  approvalStatus: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  approvalNote: { type: String, default: '' },
  pointsEarned: { type: Number, default: 0 },
  completionDate: { type: Date }
}, { timestamps: true });

// Unique: one participation per employee per activity
employeeParticipationSchema.index({ employee: 1, activity: 1 }, { unique: true });

module.exports = mongoose.model('EmployeeParticipation', employeeParticipationSchema);
