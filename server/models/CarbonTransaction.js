const mongoose = require('mongoose');

const carbonTransactionSchema = new mongoose.Schema({
  source: { type: String, enum: ['Purchase', 'Manufacturing', 'Expense', 'Fleet', 'Manual'], required: true },
  sourceRef: { type: String, default: '' }, // Reference ID from ERP
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  emissionFactor: { type: mongoose.Schema.Types.ObjectId, ref: 'EmissionFactor', required: true },
  quantity: { type: Number, required: true, min: 0 },
  calculatedCO2: { type: Number, required: true, min: 0 }, // kg CO2e
  description: { type: String, default: '' },
  date: { type: Date, required: true, default: Date.now },
  isAutoCalculated: { type: Boolean, default: false },
  recordedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('CarbonTransaction', carbonTransactionSchema);
