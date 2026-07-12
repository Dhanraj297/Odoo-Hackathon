const mongoose = require('mongoose');

const environmentalGoalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  target: { type: Number, required: true },
  current: { type: Number, default: 0 },
  unit: { type: String, required: true }, // e.g., 'tCO2e', 'kWh', '%'
  startDate: { type: Date, required: true },
  deadline: { type: Date, required: true },
  status: { type: String, enum: ['on_track', 'at_risk', 'achieved', 'missed'], default: 'on_track' },
  category: { type: String, enum: ['Carbon Reduction', 'Energy Efficiency', 'Waste Reduction', 'Water Conservation', 'Other'], default: 'Carbon Reduction' }
}, { timestamps: true });

module.exports = mongoose.model('EnvironmentalGoal', environmentalGoalSchema);
