const express = require('express');
const router = express.Router();
const Badge = require('../models/Badge');
const User = require('../models/User');
const { protect, requireRole } = require('../middleware/auth');
const { autoBadgeAward } = require('../utils/badgeEngine');

router.get('/', protect, async (req, res) => {
  try { res.json(await Badge.find({ isActive: true })); }
  catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/', protect, requireRole('admin'), async (req, res) => {
  try { res.status(201).json(await Badge.create(req.body)); }
  catch (err) { res.status(400).json({ message: err.message }); }
});

router.put('/:id', protect, requireRole('admin'), async (req, res) => {
  try {
    const badge = await Badge.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!badge) return res.status(404).json({ message: 'Not found' });
    res.json(badge);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.delete('/:id', protect, requireRole('admin'), async (req, res) => {
  try { await Badge.findByIdAndUpdate(req.params.id, { isActive: false }); res.json({ message: 'Deactivated' }); }
  catch (err) { res.status(500).json({ message: err.message }); }
});

// Trigger manual badge check
router.post('/check', protect, requireRole('admin'), async (req, res) => {
  try {
    await autoBadgeAward(req.app.get('io'));
    res.json({ message: 'Badge check complete' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
