const mongoose = require('mongoose');

const auditSchema = new mongoose.Schema({
  title: { type: String, required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  auditor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  auditDate: { type: Date, required: true },
  type: { type: String, enum: ['Internal', 'External', 'Regulatory'], default: 'Internal' },
  category: { type: String, enum: ['Environmental', 'Social', 'Governance'], required: true },
  findings: { type: String, default: '' },
  score: { type: Number, min: 0, max: 100, default: 0 },
  status: { type: String, enum: ['Scheduled', 'In Progress', 'Completed', 'Cancelled'], default: 'Scheduled' },
  reportUrl: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Audit', auditSchema);
