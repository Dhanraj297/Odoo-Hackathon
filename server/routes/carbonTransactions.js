const express = require('express');
const router = express.Router();
const CarbonTransaction = require('../models/CarbonTransaction');
const EmissionFactor = require('../models/EmissionFactor');
const Settings = require('../models/Settings');
const { protect, requireRole } = require('../middleware/auth');

router.get('/', protect, async (req, res) => {
  try {
    const { department, startDate, endDate, source } = req.query;
    const filter = {};
    if (department) filter.department = department;
    if (source) filter.source = source;
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }
    const txs = await CarbonTransaction.find(filter)
      .populate('department', 'name')
      .populate('emissionFactor', 'name unit scope')
      .populate('recordedBy', 'name')
      .sort('-date');
    res.json(txs);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/', protect, async (req, res) => {
  try {
    const settings = await Settings.findOne();
    const { emissionFactor: efId, quantity } = req.body;
    const ef = await EmissionFactor.findById(efId);
    if (!ef) return res.status(400).json({ message: 'Emission factor not found' });
    const calculatedCO2 = ef.factor * quantity;
    const tx = await CarbonTransaction.create({
      ...req.body,
      calculatedCO2,
      isAutoCalculated: settings?.autoEmissionCalculation || false,
      recordedBy: req.user._id
    });
    res.status(201).json(await tx.populate(['department', 'emissionFactor', 'recordedBy']));
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.put('/:id', protect, requireRole('admin', 'hr_manager'), async (req, res) => {
  try {
    if (req.body.quantity || req.body.emissionFactor) {
      const efId = req.body.emissionFactor;
      const qty = req.body.quantity;
      if (efId && qty) {
        const ef = await EmissionFactor.findById(efId);
        if (ef) req.body.calculatedCO2 = ef.factor * qty;
      }
    }
    const tx = await CarbonTransaction.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('department', 'name').populate('emissionFactor', 'name unit');
    res.json(tx);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.delete('/:id', protect, requireRole('admin'), async (req, res) => {
  try { await CarbonTransaction.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); }
  catch (err) { res.status(500).json({ message: err.message }); }
});

// GET /api/carbon-transactions/summary - aggregated by department/month
router.get('/summary', protect, async (req, res) => {
  try {
    const summary = await CarbonTransaction.aggregate([
      { $group: { _id: { dept: '$department', month: { $month: '$date' }, year: { $year: '$date' } }, totalCO2: { $sum: '$calculatedCO2' }, count: { $sum: 1 } } },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);
    res.json(summary);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
