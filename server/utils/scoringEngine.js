const CarbonTransaction = require('../models/CarbonTransaction');
const EmployeeParticipation = require('../models/EmployeeParticipation');
const PolicyAcknowledgement = require('../models/PolicyAcknowledgement');
const Audit = require('../models/Audit');
const ComplianceIssue = require('../models/ComplianceIssue');
const EnvironmentalGoal = require('../models/EnvironmentalGoal');
const ESGPolicy = require('../models/ESGPolicy');
const User = require('../models/User');
const Settings = require('../models/Settings');

/**
 * Calculate Environmental Score for a department in a date range
 * Score based on: goal achievement, carbon reduction vs baseline
 */
const calcEnvironmentalScore = async (departmentId, startDate, endDate) => {
  const goals = await EnvironmentalGoal.find({ department: departmentId });
  if (!goals.length) return 50; // neutral if no goals

  const achieved = goals.filter(g => g.status === 'achieved').length;
  const onTrack = goals.filter(g => g.status === 'on_track').length;
  const atRisk = goals.filter(g => g.status === 'at_risk').length;
  const total = goals.length;

  const score = ((achieved * 100) + (onTrack * 70) + (atRisk * 40)) / total;
  return Math.min(100, Math.max(0, score));
};

/**
 * Calculate Social Score for a department
 * Based on: CSR participation rate, activity completion
 */
const calcSocialScore = async (departmentId, startDate, endDate) => {
  const deptUsers = await User.find({ department: departmentId });
  if (!deptUsers.length) return 50;

  const userIds = deptUsers.map(u => u._id);
  const totalPossible = deptUsers.length;

  const approved = await EmployeeParticipation.countDocuments({
    employee: { $in: userIds },
    approvalStatus: 'Approved',
    completionDate: { $gte: startDate, $lte: endDate }
  });

  const participationRate = Math.min(100, (approved / totalPossible) * 100);

  // Policy acknowledgements
  const policies = await ESGPolicy.find({ isActive: true, category: 'Social' });
  let ackScore = 100;
  if (policies.length > 0) {
    let totalAcks = 0;
    for (const policy of policies) {
      const acks = await PolicyAcknowledgement.countDocuments({
        policy: policy._id,
        employee: { $in: userIds }
      });
      totalAcks += (acks / totalPossible) * 100;
    }
    ackScore = totalAcks / policies.length;
  }

  return Math.min(100, (participationRate * 0.7 + ackScore * 0.3));
};

/**
 * Calculate Governance Score for a department
 * Based on: compliance issues (severity-weighted), audit scores, policy acknowledgements
 */
const calcGovernanceScore = async (departmentId, startDate, endDate) => {
  const openIssues = await ComplianceIssue.find({
    department: departmentId,
    status: { $in: ['Open', 'In Progress'] }
  });

  let issueDeduction = 0;
  openIssues.forEach(issue => {
    const weights = { Critical: 20, High: 10, Medium: 5, Low: 2 };
    issueDeduction += weights[issue.severity] || 5;
  });

  const audits = await Audit.find({
    department: departmentId,
    status: 'Completed',
    auditDate: { $gte: startDate, $lte: endDate }
  });

  const avgAuditScore = audits.length
    ? audits.reduce((sum, a) => sum + a.score, 0) / audits.length
    : 70;

  const deptUsers = await User.find({ department: departmentId });
  const userIds = deptUsers.map(u => u._id);
  const govPolicies = await ESGPolicy.find({ isActive: true, category: { $in: ['Governance', 'General'] } });

  let govAckRate = 100;
  if (govPolicies.length && deptUsers.length) {
    let acks = 0;
    for (const p of govPolicies) {
      acks += await PolicyAcknowledgement.countDocuments({ policy: p._id, employee: { $in: userIds } });
    }
    govAckRate = (acks / (govPolicies.length * deptUsers.length)) * 100;
  }

  const rawScore = (avgAuditScore * 0.5 + govAckRate * 0.5) - issueDeduction;
  return Math.min(100, Math.max(0, rawScore));
};

/**
 * Compute and save DepartmentScore
 */
const computeDepartmentScore = async (departmentId, period, startDate, endDate) => {
  const DepartmentScore = require('../models/DepartmentScore');
  const settings = await Settings.findOne() || {};

  const envW = settings.envWeight || 0.4;
  const socialW = settings.socialWeight || 0.3;
  const govW = settings.govWeight || 0.3;

  const [envScore, socialScore, govScore] = await Promise.all([
    calcEnvironmentalScore(departmentId, startDate, endDate),
    calcSocialScore(departmentId, startDate, endDate),
    calcGovernanceScore(departmentId, startDate, endDate)
  ]);

  const total = envScore * envW + socialScore * socialW + govScore * govW;

  await DepartmentScore.findOneAndUpdate(
    { department: departmentId, period },
    {
      environmentalScore: Math.round(envScore * 10) / 10,
      socialScore: Math.round(socialScore * 10) / 10,
      governanceScore: Math.round(govScore * 10) / 10,
      totalScore: Math.round(total * 10) / 10,
      envWeight: envW, socialWeight: socialW, govWeight: govW
    },
    { upsert: true, new: true }
  );

  return { envScore, socialScore, govScore, total };
};

module.exports = { calcEnvironmentalScore, calcSocialScore, calcGovernanceScore, computeDepartmentScore };
