const mongoose = require('mongoose');

const complianceIssueSchema = new mongoose.Schema({
  audit: { type: mongoose.Schema.Types.ObjectId, ref: 'Audit' },
  severity: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'], required: true },
  description: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ['Open', 'In Progress', 'Resolved', 'Closed'], default: 'Open' },
  resolution: { type: String, default: '' },
  flagged: { type: Boolean, default: false }, // overdue flag
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('ComplianceIssue', complianceIssueSchema);
