const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const CarbonTransaction = require('../models/CarbonTransaction');
const EmployeeParticipation = require('../models/EmployeeParticipation');
const ComplianceIssue = require('../models/ComplianceIssue');
const PolicyAcknowledgement = require('../models/PolicyAcknowledgement');
const DepartmentScore = require('../models/DepartmentScore');
const Challenge = require('../models/Challenge');
const ChallengeParticipation = require('../models/ChallengeParticipation');
const Audit = require('../models/Audit');

// GET /api/reports/environmental
router.get('/environmental', protect, async (req, res) => {
  try {
    const { department, startDate, endDate } = req.query;
    const dateFilter = {};
    if (startDate) dateFilter.$gte = new Date(startDate);
    if (endDate) dateFilter.$lte = new Date(endDate);

    const txFilter = {};
    if (department) txFilter.department = department;
    if (Object.keys(dateFilter).length) txFilter.date = dateFilter;

    const transactions = await CarbonTransaction.find(txFilter)
      .populate('department', 'name').populate('emissionFactor', 'name scope unit');

    const totalCO2 = transactions.reduce((s, t) => s + t.calculatedCO2, 0);
    const byScope = { 'Scope 1': 0, 'Scope 2': 0, 'Scope 3': 0 };
    transactions.forEach(t => {
      const scope = t.emissionFactor?.scope || 'Scope 1';
      byScope[scope] = (byScope[scope] || 0) + t.calculatedCO2;
    });

    const monthlyTrend = {};
    transactions.forEach(t => {
      const key = t.date.toISOString().slice(0, 7);
      monthlyTrend[key] = (monthlyTrend[key] || 0) + t.calculatedCO2;
    });

    res.json({ totalCO2: Math.round(totalCO2 * 100) / 100, byScope, monthlyTrend, transactions: transactions.slice(0, 100) });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// GET /api/reports/social
router.get('/social', protect, async (req, res) => {
  try {
    const { department, startDate, endDate } = req.query;
    const partFilter = {};
    if (startDate || endDate) {
      partFilter.createdAt = {};
      if (startDate) partFilter.createdAt.$gte = new Date(startDate);
      if (endDate) partFilter.createdAt.$lte = new Date(endDate);
    }
    const participations = await EmployeeParticipation.find(partFilter)
      .populate('employee', 'name department').populate('activity', 'title pointsReward');

    const approved = participations.filter(p => p.approvalStatus === 'Approved');
    const totalPoints = approved.reduce((s, p) => s + p.pointsEarned, 0);

    res.json({
      totalParticipations: participations.length,
      approved: approved.length,
      pending: participations.filter(p => p.approvalStatus === 'Pending').length,
      rejected: participations.filter(p => p.approvalStatus === 'Rejected').length,
      totalPointsAwarded: totalPoints,
      participations: participations.slice(0, 100)
    });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// GET /api/reports/governance
router.get('/governance', protect, async (req, res) => {
  try {
    const { department, startDate, endDate } = req.query;
    const issueFilter = {};
    if (department) issueFilter.department = department;
    const issues = await ComplianceIssue.find(issueFilter).populate('owner', 'name').populate('department', 'name');
    const audits = await Audit.find(department ? { department } : {}).populate('department', 'name');
    const acks = await PolicyAcknowledgement.find().populate('policy', 'title').populate('employee', 'name');

    const issueSeverityCount = { Low: 0, Medium: 0, High: 0, Critical: 0 };
    issues.forEach(i => { issueSeverityCount[i.severity] = (issueSeverityCount[i.severity] || 0) + 1; });

    const avgAuditScore = audits.length ? audits.reduce((s, a) => s + a.score, 0) / audits.length : 0;

    res.json({
      totalIssues: issues.length,
      openIssues: issues.filter(i => i.status === 'Open').length,
      overdueIssues: issues.filter(i => i.flagged).length,
      issueSeverityCount,
      totalAudits: audits.length,
      avgAuditScore: Math.round(avgAuditScore),
      totalAcknowledgements: acks.length,
      issues: issues.slice(0, 50),
      audits: audits.slice(0, 50)
    });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// GET /api/reports/summary - ESG Summary
router.get('/summary', protect, async (req, res) => {
  try {
    const period = req.query.period || new Date().toISOString().slice(0, 7);
    const scores = await DepartmentScore.find({ period }).populate('department', 'name');
    const overallScore = scores.length ? scores.reduce((s, d) => s + d.totalScore, 0) / scores.length : 0;

    const [totalTransactions, totalParticipations, totalIssues, totalChallenges] = await Promise.all([
      CarbonTransaction.countDocuments(),
      EmployeeParticipation.countDocuments({ approvalStatus: 'Approved' }),
      ComplianceIssue.countDocuments({ status: { $in: ['Open', 'In Progress'] } }),
      ChallengeParticipation.countDocuments({ approval: 'Approved' })
    ]);

    res.json({ overallScore: Math.round(overallScore * 10) / 10, period, departmentScores: scores, stats: { totalTransactions, totalParticipations, openIssues: totalIssues, completedChallenges: totalChallenges } });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// GET /api/reports/custom - custom filters
router.get('/custom', protect, async (req, res) => {
  try {
    const { module, department, startDate, endDate, employee, challenge, category } = req.query;
    const result = { module, filters: { department, startDate, endDate, employee, challenge, category } };

    if (!module || module === 'all' || module === 'environmental') {
      const filter = {};
      if (department) filter.department = department;
      if (startDate || endDate) { filter.date = {}; if (startDate) filter.date.$gte = new Date(startDate); if (endDate) filter.date.$lte = new Date(endDate); }
      result.environmental = await CarbonTransaction.find(filter).populate('department', 'name').populate('emissionFactor', 'name').limit(200);
    }
    if (!module || module === 'all' || module === 'social') {
      const filter = {};
      if (employee) filter.employee = employee;
      result.social = await EmployeeParticipation.find(filter).populate('employee', 'name').populate('activity', 'title').limit(200);
    }
    if (!module || module === 'all' || module === 'governance') {
      const filter = {};
      if (department) filter.department = department;
      result.governance = await ComplianceIssue.find(filter).populate('owner', 'name').populate('department', 'name').limit(200);
    }

    res.json(result);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
