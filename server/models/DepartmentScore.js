const mongoose = require('mongoose');

const departmentScoreSchema = new mongoose.Schema({
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  period: { type: String, required: true }, // e.g., '2024-Q1', '2024-01'
  periodType: { type: String, enum: ['monthly', 'quarterly', 'annual'], default: 'monthly' },
  environmentalScore: { type: Number, min: 0, max: 100, default: 0 },
  socialScore: { type: Number, min: 0, max: 100, default: 0 },
  governanceScore: { type: Number, min: 0, max: 100, default: 0 },
  totalScore: { type: Number, min: 0, max: 100, default: 0 },
  // Weights used (from settings)
  envWeight: { type: Number, default: 0.4 },
  socialWeight: { type: Number, default: 0.3 },
  govWeight: { type: Number, default: 0.3 }
}, { timestamps: true });

departmentScoreSchema.index({ department: 1, period: 1 }, { unique: true });

module.exports = mongoose.model('DepartmentScore', departmentScoreSchema);
