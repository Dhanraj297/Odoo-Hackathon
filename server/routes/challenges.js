const express = require('express');
const router = express.Router();
const Challenge = require('../models/Challenge');
const { protect, requireRole } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Valid lifecycle transitions
const validTransitions = {
  Draft: ['Active', 'Archived'],
  Active: ['Under Review', 'Archived'],
  'Under Review': ['Completed', 'Active', 'Archived'],
  Completed: ['Archived'],
  Archived: []
};

router.get('/', protect, async (req, res) => {
  try {
    const { status, department, difficulty } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (department) filter.department = department;
    if (difficulty) filter.difficulty = difficulty;
    res.json(await Challenge.find(filter)
      .populate('category', 'name color')
      .populate('createdBy', 'name')
      .populate('department', 'name')
      .sort('-createdAt'));
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/:id', protect, async (req, res) => {
  try {
    const ch = await Challenge.findById(req.params.id).populate('category', 'name').populate('department', 'name');
    if (!ch) return res.status(404).json({ message: 'Not found' });
    res.json(ch);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/', protect, requireRole('admin', 'hr_manager'), upload.single('image'), async (req, res) => {
  try {
    const data = { ...req.body, createdBy: req.user._id };
    if (req.file) data.image = `/uploads/${req.file.filename}`;
    res.status(201).json(await Challenge.create(data));
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.put('/:id', protect, requireRole('admin', 'hr_manager'), async (req, res) => {
  try {
    const ch = await Challenge.findById(req.params.id);
    if (!ch) return res.status(404).json({ message: 'Not found' });

    // Validate status transition
    if (req.body.status && req.body.status !== ch.status) {
      const allowed = validTransitions[ch.status] || [];
      if (!allowed.includes(req.body.status)) {
        return res.status(400).json({ message: `Cannot transition from ${ch.status} to ${req.body.status}` });
      }
    }

    Object.assign(ch, req.body);
    await ch.save();
    res.json(ch);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.delete('/:id', protect, requireRole('admin'), async (req, res) => {
  try { await Challenge.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); }
  catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
