const express = require('express');
const router = express.Router();
const EmissionFactor = require('../models/EmissionFactor');
const { protect, requireRole } = require('../middleware/auth');

router.get('/', protect, async (req, res) => {
  try { res.json(await EmissionFactor.find()); }
  catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/', protect, requireRole('admin'), async (req, res) => {
  try { res.status(201).json(await EmissionFactor.create(req.body)); }
  catch (err) { res.status(400).json({ message: err.message }); }
});

router.put('/:id', protect, requireRole('admin'), async (req, res) => {
  try {
    const ef = await EmissionFactor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!ef) return res.status(404).json({ message: 'Not found' });
    res.json(ef);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.delete('/:id', protect, requireRole('admin'), async (req, res) => {
  try { await EmissionFactor.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); }
  catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
