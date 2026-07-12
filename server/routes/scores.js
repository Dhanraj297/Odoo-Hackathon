const express = require('express');
const router = express.Router();
const DepartmentScore = require('../models/DepartmentScore');
const Department = require('../models/Department');
const Settings = require('../models/Settings');
const { protect } = require('../middleware/auth');
const { computeDepartmentScore } = require('../utils/scoringEngine');

// GET /api/scores/overall - overall ESG score
router.get('/overall', protect, async (req, res) => {
  try {
    const period = req.query.period || new Date().toISOString().slice(0, 7);
    const scores = await DepartmentScore.find({ period }).populate('department', 'name');
    if (!scores.length) return res.json({ overall: 0, breakdown: [], period });

    const settings = await Settings.findOne() || {};
    const overall = scores.reduce((sum, s) => sum + s.totalScore, 0) / scores.length;

    const envAvg = scores.reduce((sum, s) => sum + s.environmentalScore, 0) / scores.length;
    const socialAvg = scores.reduce((sum, s) => sum + s.socialScore, 0) / scores.length;
    const govAvg = scores.reduce((sum, s) => sum + s.governanceScore, 0) / scores.length;

    res.json({ overall: Math.round(overall * 10) / 10, envAvg: Math.round(envAvg * 10) / 10, socialAvg: Math.round(socialAvg * 10) / 10, govAvg: Math.round(govAvg * 10) / 10, breakdown: scores, period });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// POST /api/scores/compute - trigger score computation for a period
router.post('/compute', protect, async (req, res) => {
  try {
    const { period, startDate, endDate } = req.body;
    const departments = await Department.find({ status: 'active' });
    const results = [];

    for (const dept of departments) {
      const scores = await computeDepartmentScore(
        dept._id, period,
        new Date(startDate || `${period}-01`),
        new Date(endDate || new Date())
      );
      results.push({ department: dept.name, ...scores });
    }

    res.json({ message: 'Scores computed', results });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// GET /api/scores/departments - all dept scores for a period
router.get('/departments', protect, async (req, res) => {
  try {
    const period = req.query.period || new Date().toISOString().slice(0, 7);
    res.json(await DepartmentScore.find({ period }).populate('department', 'name code').sort('-totalScore'));
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// GET /api/scores/history - trend data
router.get('/history', protect, async (req, res) => {
  try {
    const { department, periods } = req.query;
    const filter = {};
    if (department) filter.department = department;
    res.json(await DepartmentScore.find(filter).populate('department', 'name').sort('period').limit(12));
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
