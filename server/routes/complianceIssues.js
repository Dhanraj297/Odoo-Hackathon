const express = require('express');
const router = express.Router();
const ComplianceIssue = require('../models/ComplianceIssue');
const Notification = require('../models/Notification');
const { protect, requireRole } = require('../middleware/auth');

router.get('/', protect, async (req, res) => {
  try {
    const { severity, status, department, flagged } = req.query;
    const filter = {};
    if (severity) filter.severity = severity;
    if (status) filter.status = status;
    if (department) filter.department = department;
    if (flagged !== undefined) filter.flagged = flagged === 'true';
    res.json(await ComplianceIssue.find(filter)
      .populate('owner', 'name email')
      .populate('department', 'name')
      .populate('audit', 'title')
      .populate('createdBy', 'name')
      .sort('-createdAt'));
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/:id', protect, async (req, res) => {
  try {
    const issue = await ComplianceIssue.findById(req.params.id)
      .populate('owner', 'name email').populate('department').populate('audit');
    if (!issue) return res.status(404).json({ message: 'Not found' });
    res.json(issue);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/', protect, requireRole('admin', 'auditor', 'hr_manager'), async (req, res) => {
  try {
    if (!req.body.owner || !req.body.dueDate)
      return res.status(400).json({ message: 'Owner and Due Date are required' });
    const issue = await ComplianceIssue.create({ ...req.body, createdBy: req.user._id });

    // Notify the owner
    const notif = await Notification.create({
      user: issue.owner,
      type: 'general',
      title: `New Compliance Issue Assigned`,
      message: `A ${issue.severity} compliance issue has been assigned to you. Due: ${new Date(issue.dueDate).toLocaleDateString()}`,
      data: { issueId: issue._id }
    });
    req.app.get('io')?.to(issue.owner.toString()).emit('notification', notif);

    res.status(201).json(issue);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const issue = await ComplianceIssue.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!issue) return res.status(404).json({ message: 'Not found' });
    res.json(issue);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.delete('/:id', protect, requireRole('admin'), async (req, res) => {
  try { await ComplianceIssue.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); }
  catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
