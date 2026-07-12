const express = require('express');
const router = express.Router();
const Audit = require('../models/Audit');
const { protect, requireRole } = require('../middleware/auth');

router.get('/', protect, async (req, res) => {
  try {
    const { department, status, category } = req.query;
    const filter = {};
    if (department) filter.department = department;
    if (status) filter.status = status;
    if (category) filter.category = category;
    res.json(await Audit.find(filter)
      .populate('department', 'name')
      .populate('auditor', 'name email')
      .sort('-auditDate'));
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/:id', protect, async (req, res) => {
  try {
    const audit = await Audit.findById(req.params.id).populate('department').populate('auditor', 'name');
    if (!audit) return res.status(404).json({ message: 'Not found' });
    res.json(audit);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/', protect, requireRole('admin', 'auditor'), async (req, res) => {
  try {
    const audit = await Audit.create({ ...req.body, auditor: req.user._id });
    res.status(201).json(audit);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.put('/:id', protect, requireRole('admin', 'auditor'), async (req, res) => {
  try {
    const audit = await Audit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!audit) return res.status(404).json({ message: 'Not found' });
    res.json(audit);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.delete('/:id', protect, requireRole('admin'), async (req, res) => {
  try { await Audit.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); }
  catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
