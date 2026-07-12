const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  // ESG Weights
  envWeight: { type: Number, default: 0.4 },
  socialWeight: { type: Number, default: 0.3 },
  govWeight: { type: Number, default: 0.3 },
  // Feature toggles
  autoEmissionCalculation: { type: Boolean, default: false },
  evidenceRequired: { type: Boolean, default: true },
  badgeAutoAward: { type: Boolean, default: true },
  // Notification settings
  notifyComplianceOverdue: { type: Boolean, default: true },
  notifyCSRApproval: { type: Boolean, default: true },
  notifyChallengeApproval: { type: Boolean, default: true },
  notifyPolicyReminder: { type: Boolean, default: true },
  notifyBadgeUnlock: { type: Boolean, default: true },
  notifyEmail: { type: Boolean, default: false },
  notifyInApp: { type: Boolean, default: true },
  // Org info
  orgName: { type: String, default: 'EcoSphere Organization' },
  orgLogo: { type: String, default: '' },
  timezone: { type: String, default: 'UTC' }
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
