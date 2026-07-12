const mongoose = require('mongoose');

const emissionFactorSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  scope: { type: String, enum: ['Scope 1', 'Scope 2', 'Scope 3'], required: true },
  source: { type: String, enum: ['Purchase', 'Manufacturing', 'Expense', 'Fleet', 'Other'], required: true },
  factor: { type: Number, required: true, min: 0 }, // kg CO2 per unit
  unit: { type: String, required: true }, // e.g., 'per km', 'per kWh', 'per kg'
  description: { type: String, default: '' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('EmissionFactor', emissionFactorSchema);
