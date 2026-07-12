const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  code: { type: String, required: true, unique: true, uppercase: true },
  head: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  parentDepartment: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', default: null },
  employeeCount: { type: Number, default: 0 },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  description: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Department', departmentSchema);
