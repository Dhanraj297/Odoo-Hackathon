const mongoose = require('mongoose');

const esgPolicySchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  version: { type: String, default: '1.0' },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' }, // null = company-wide
  category: { type: String, enum: ['Environmental', 'Social', 'Governance', 'General'], default: 'General' },
  dueDate: { type: Date }, // acknowledgement due date
  isActive: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  documentUrl: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('ESGPolicy', esgPolicySchema);
