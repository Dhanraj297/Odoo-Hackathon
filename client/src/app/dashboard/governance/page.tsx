'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Shield, CheckCircle2, AlertCircle, Clock, AlertTriangle, FileText, Search, Plus, ExternalLink } from 'lucide-react';
import { policies, complianceIssues, auditHistory } from '@/lib/mockData';

const severityStyle: Record<string, string> = {
  high: 'text-red-400 bg-red-400/10 border-red-400/20',
  medium: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  low: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
};
const statusStyle: Record<string, string> = {
  open: 'text-red-400 bg-red-400/10',
  'in-progress': 'text-amber-400 bg-amber-400/10',
  resolved: 'text-emerald-400 bg-emerald-400/10',
  active: 'text-emerald-400 bg-emerald-400/10',
  review: 'text-amber-400 bg-amber-400/10',
};
const riskColors: Record<string, string> = {
  high: '#ef4444', medium: '#f59e0b', low: '#10b981',
};

export default function GovernancePage() {
  const [activeTab, setActiveTab] = useState<'policies' | 'compliance' | 'audits'>('policies');

  const tabs = ['policies', 'compliance', 'audits'] as const;

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
            <Shield size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Governance</h1>
            <p className="text-slate-400 text-sm">Policies, compliance & audit management</p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Policies', value: '5', icon: FileText, color: '#8b5cf6', sub: '1 under review' },
          { label: 'Compliance Issues', value: '5', icon: AlertCircle, color: '#ef4444', sub: '2 high severity' },
          { label: 'Audits This Year', value: '3', icon: CheckCircle2, color: '#10b981', sub: '1 scheduled' },
          { label: 'Avg Compliance', value: '88%', icon: Shield, color: '#3b82f6', sub: 'acknowledgement rate' },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            className="glass-card p-5 hover-lift"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <s.icon size={20} style={{ color: s.color }} className="mb-3" />
            <div className="text-2xl font-bold text-white">{s.value}</div>
            <div className="text-xs text-slate-400 mt-1">{s.label}</div>
            <div className="text-xs text-slate-500 mt-0.5">{s.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 rounded-xl bg-white/04 border border-white/08 w-fit">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
              activeTab === tab ? 'bg-violet-500 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Policies */}
      {activeTab === 'policies' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-white">Policy Management</h3>
            <button className="flex items-center gap-2 px-4 py-2 text-sm rounded-xl bg-violet-500/20 text-violet-400 border border-violet-500/30 hover:bg-violet-500/30 transition-colors">
              <Plus size={14} /> Add Policy
            </button>
          </div>
          <div className="grid lg:grid-cols-2 gap-4">
            {policies.map((policy, i) => (
              <motion.div
                key={policy.id}
                className="glass-card p-5 hover-lift group"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 mr-3">
                    <h4 className="font-semibold text-white text-sm group-hover:text-violet-400 transition-colors">{policy.title}</h4>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-xs text-slate-500">v{policy.version}</span>
                      <span className="text-slate-600">·</span>
                      <span className="text-xs text-slate-500">Updated {policy.lastUpdated}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full capitalize font-medium ${statusStyle[policy.status]}`}>
                      {policy.status}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium border"
                      style={{ borderColor: `${riskColors[policy.riskLevel]}40`, color: riskColors[policy.riskLevel], background: `${riskColors[policy.riskLevel]}10` }}>
                      {policy.riskLevel} risk
                    </span>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                    <span>Acknowledgement Rate</span>
                    <span className="font-semibold text-white">{policy.acknowledgmentRate}%</span>
                  </div>
                  <div className="progress-bar">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, #8b5cf6, #6366f1)` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${policy.acknowledgmentRate}%` }}
                      transition={{ delay: i * 0.08 + 0.3, duration: 1 }}
                    />
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/08 text-slate-400">{policy.category}</span>
                  <button className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition-colors">
                    View <ExternalLink size={10} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Compliance */}
      {activeTab === 'compliance' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <h3 className="font-semibold text-white">Compliance Issues</h3>
          <div className="space-y-3">
            {complianceIssues.map((issue, i) => (
              <motion.div
                key={issue.id}
                className="glass-card p-5 hover-lift"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="flex items-start gap-4">
                  <div className={`mt-0.5 px-2.5 py-1 rounded-full text-xs font-bold border capitalize ${severityStyle[issue.severity]}`}>
                    {issue.severity}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-white">{issue.title}</h4>
                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                      <span>{issue.category}</span>
                      <span>·</span>
                      <span>Assigned: {issue.assignee}</span>
                      <span>·</span>
                      <span>Due: {issue.dueDate}</span>
                    </div>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize whitespace-nowrap ${statusStyle[issue.status]}`}>
                    {issue.status.replace('-', ' ')}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Audits */}
      {activeTab === 'audits' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <h3 className="font-semibold text-white">Audit History</h3>
          <div className="space-y-4">
            {auditHistory.map((audit, i) => (
              <motion.div
                key={audit.id}
                className="glass-card p-6 hover-lift"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-white">{audit.title}</h4>
                    <div className="flex items-center gap-3 mt-1 text-sm text-slate-400">
                      <span>{audit.type} Audit</span>
                      <span>·</span>
                      <span>{audit.auditor}</span>
                      <span>·</span>
                      <span>{audit.date}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`text-xs px-2.5 py-1 rounded-full capitalize font-medium ${
                      audit.status === 'completed' ? 'text-emerald-400 bg-emerald-400/10' : 'text-blue-400 bg-blue-400/10'
                    }`}>
                      {audit.status}
                    </span>
                    {audit.score && (
                      <div className="text-2xl font-black" style={{ color: audit.score >= 85 ? '#10b981' : '#f59e0b' }}>
                        {audit.score}<span className="text-sm text-slate-400">/100</span>
                      </div>
                    )}
                  </div>
                </div>
                {audit.findings > 0 && (
                  <div className="mt-3 text-sm text-amber-400 flex items-center gap-2">
                    <AlertTriangle size={14} />
                    {audit.findings} finding{audit.findings > 1 ? 's' : ''} identified
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
