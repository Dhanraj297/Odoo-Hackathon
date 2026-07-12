const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');
const { protect, requireRole } = require('../middleware/auth');

router.get('/', protect, async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) settings = await Settings.create({});
    res.json(settings);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.put('/', protect, requireRole('admin'), async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) settings = new Settings();
    Object.assign(settings, req.body);
    await settings.save();
    res.json(settings);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

module.exports = router;
