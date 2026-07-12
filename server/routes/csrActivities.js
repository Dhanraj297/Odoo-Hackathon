const express = require('express');
const router = express.Router();
const CSRActivity = require('../models/CSRActivity');
const { protect, requireRole } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', protect, async (req, res) => {
  try {
    const { status, department } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (department) filter.department = department;
    res.json(await CSRActivity.find(filter).populate('organizer', 'name').populate('department', 'name').populate('category', 'name'));
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/:id', protect, async (req, res) => {
  try {
    const act = await CSRActivity.findById(req.params.id).populate('organizer', 'name').populate('department', 'name').populate('category', 'name');
    if (!act) return res.status(404).json({ message: 'Not found' });
    res.json(act);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/', protect, requireRole('admin', 'hr_manager'), upload.single('image'), async (req, res) => {
  try {
    const data = { ...req.body, organizer: req.user._id };
    if (req.file) data.image = `/uploads/${req.file.filename}`;
    res.status(201).json(await CSRActivity.create(data));
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.put('/:id', protect, requireRole('admin', 'hr_manager'), async (req, res) => {
  try {
    const act = await CSRActivity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!act) return res.status(404).json({ message: 'Not found' });
    res.json(act);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.delete('/:id', protect, requireRole('admin'), async (req, res) => {
  try { await CSRActivity.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); }
  catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
