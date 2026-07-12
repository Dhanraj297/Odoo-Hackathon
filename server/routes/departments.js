const express = require('express');
const router = express.Router();
const Department = require('../models/Department');
const { protect, requireRole } = require('../middleware/auth');

router.get('/', protect, async (req, res) => {
  try {
    const depts = await Department.find().populate('head', 'name email').populate('parentDepartment', 'name');
    res.json(depts);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/:id', protect, async (req, res) => {
  try {
    const dept = await Department.findById(req.params.id).populate('head', 'name email').populate('parentDepartment', 'name');
    if (!dept) return res.status(404).json({ message: 'Department not found' });
    res.json(dept);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/', protect, requireRole('admin', 'hr_manager'), async (req, res) => {
  try {
    const dept = await Department.create(req.body);
    res.status(201).json(dept);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.put('/:id', protect, requireRole('admin', 'hr_manager'), async (req, res) => {
  try {
    const dept = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!dept) return res.status(404).json({ message: 'Not found' });
    res.json(dept);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.delete('/:id', protect, requireRole('admin'), async (req, res) => {
  try {
    await Department.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
