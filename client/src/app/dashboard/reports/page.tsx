'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { BarChart3, Download, FileText, Table2, Sparkles, Filter, Calendar, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { carbonTrendData, departmentESGData, esgBreakdownData } from '@/lib/mockData';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card p-3 text-sm">
      <p className="text-slate-300 mb-1 font-medium">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color }} className="font-semibold">{p.name}: {p.value?.toLocaleString()}</p>
      ))}
    </div>
  );
};

const insightCards = [
  { title: 'Carbon Reduction', value: '-24%', trend: 'down', desc: 'Year-over-year improvement', color: '#10b981', icon: '🌿' },
  { title: 'Employee Participation', value: '+18%', trend: 'up', desc: 'vs previous quarter', color: '#3b82f6', icon: '👥' },
  { title: 'Policy Compliance', value: '88%', trend: 'up', desc: 'acknowledgement rate', color: '#8b5cf6', icon: '🛡️' },
  { title: 'ESG Score Growth', value: '+4.2', trend: 'up', desc: 'points this quarter', color: '#f59e0b', icon: '📈' },
];

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState('2024-Q1');
  const [deptFilter, setDeptFilter] = useState('all');
  const [moduleFilter, setModuleFilter] = useState('all');

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <BarChart3 size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Reports & Analytics</h1>
              <p className="text-slate-400 text-sm">Comprehensive ESG insights and exports</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {[
            { label: 'PDF', icon: FileText },
            { label: 'Excel', icon: Table2 },
            { label: 'CSV', icon: Download },
          ].map(({ label, icon: Icon }) => (
            <motion.button
              key={label}
              className="flex items-center gap-2 px-4 py-2 text-sm rounded-xl border border-white/10 text-slate-400 hover:text-white hover:border-white/20 hover:bg-white/05 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon size={14} /> {label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        className="glass-card p-5 flex flex-wrap items-center gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <Filter size={14} /> Filters:
        </div>
        {[
          {
            label: 'Date Range', value: dateRange, setter: setDateRange,
            options: [
              { v: '2024-Q1', l: 'Q1 2024' }, { v: '2024-Q2', l: 'Q2 2024' },
              { v: '2023', l: 'FY 2023' }, { v: '2024', l: 'FY 2024' },
            ],
          },
          {
            label: 'Department', value: deptFilter, setter: setDeptFilter,
            options: [
              { v: 'all', l: 'All Departments' },
              ...['Engineering', 'HR', 'IT', 'Finance', 'Operations', 'Marketing'].map(d => ({ v: d.toLowerCase(), l: d })),
            ],
          },
          {
            label: 'Module', value: moduleFilter, setter: setModuleFilter,
            options: [
              { v: 'all', l: 'All Modules' },
              { v: 'env', l: 'Environmental' },
              { v: 'social', l: 'Social' },
              { v: 'gov', l: 'Governance' },
            ],
          },
        ].map(f => (
          <div key={f.label} className="flex items-center gap-2">
            <label className="text-xs text-slate-500">{f.label}:</label>
            <select
              value={f.value}
              onChange={e => f.setter(e.target.value)}
              className="px-3 py-1.5 text-sm rounded-lg bg-white/05 border border-white/08 text-white outline-none focus:border-blue-500/50 transition-colors"
            >
              {f.options.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
            </select>
          </div>
        ))}
      </motion.div>

      {/* Insight Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {insightCards.map((card, i) => (
          <motion.div
            key={card.title}
            className="glass-card p-5 hover-lift"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
          >
            <div className="text-2xl mb-3">{card.icon}</div>
            <div className="text-2xl font-black mb-1" style={{ color: card.color }}>{card.value}</div>
            <div className="font-medium text-white text-sm">{card.title}</div>
            <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
              {card.trend === 'up' ? <TrendingUp size={10} className="text-emerald-400" /> : <TrendingDown size={10} className="text-red-400" />}
              {card.desc}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Carbon trend */}
        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="font-semibold text-white mb-4">Monthly Carbon Trend</h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={carbonTrendData}>
              <defs>
                <linearGradient id="rptGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
              <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="emissions" name="Emissions" stroke="#3b82f6" strokeWidth={2.5} fill="url(#rptGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* ESG Breakdown */}
        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <h3 className="font-semibold text-white mb-4">ESG Score Breakdown</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={departmentESGData} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
              <XAxis dataKey="dept" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="total" name="ESG Score" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* AI Summary */}
      <motion.div
        className="relative overflow-hidden rounded-2xl p-6"
        style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.12), rgba(139,92,246,0.1))', border: '1px solid rgba(59,130,246,0.2)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="absolute top-4 right-4 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full" />
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
            <Sparkles size={22} className="text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <h3 className="font-semibold text-white">AI Report Summary</h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">Auto-generated</span>
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              {[
                { title: '🌿 Environmental', text: 'Carbon emissions are 8.5% below target. Renewable energy adoption at 62%, ahead of the 2025 goal.' },
                { title: '👥 Social', text: '87% employee participation in CSR. 48 activities conducted this quarter with 516 total participants.' },
                { title: '🛡️ Governance', text: '88% policy acknowledgement rate. 5 open compliance issues — 2 require urgent attention.' },
                { title: '⚡ Gamification', text: 'Engagement up 23%. Emma Williams leads with 5,120 XP. 15 new badges awarded this month.' },
              ].map(item => (
                <div key={item.title} className="p-3 rounded-xl bg-white/04 border border-white/08">
                  <div className="font-semibold text-white mb-1">{item.title}</div>
                  <div className="text-slate-400 text-xs leading-relaxed">{item.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
