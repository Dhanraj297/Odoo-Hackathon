'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts';
import {
  Wind, Search, Filter, Download, ChevronDown, ArrowUpRight,
  ArrowDownRight, Leaf, Droplets, Zap, Recycle, Target, CheckCircle2, AlertCircle
} from 'lucide-react';
import { carbonTransactions, carbonTrendData, environmentalGoals, departmentESGData } from '@/lib/mockData';
import ProgressCard from '@/components/ui/ProgressCard';

const statusStyle: Record<string, string> = {
  verified: 'text-emerald-400 bg-emerald-400/10',
  pending: 'text-amber-400 bg-amber-400/10',
  flagged: 'text-red-400 bg-red-400/10',
};

const scopeColors: Record<string, string> = {
  'Scope 1': '#10b981',
  'Scope 2': '#3b82f6',
  'Scope 3': '#8b5cf6',
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card p-3 text-sm">
      <p className="text-slate-300 mb-1 font-medium">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color }} className="font-semibold">
          {p.name}: {p.value?.toLocaleString()} tCO₂e
        </p>
      ))}
    </div>
  );
};

export default function EnvironmentalPage() {
  const [search, setSearch] = useState('');
  const [scopeFilter, setScopeFilter] = useState('all');

  const filtered = carbonTransactions.filter(t => {
    const matchSearch = t.dept.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase());
    const matchScope = scopeFilter === 'all' || t.scope === scopeFilter;
    return matchSearch && matchScope;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
            <Wind size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Environmental</h1>
            <p className="text-slate-400 text-sm">Carbon tracking, goals & emission management</p>
          </div>
        </div>
      </motion.div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Emissions', value: '1,240 tCO₂e', change: '-8.5%', icon: Wind, color: '#10b981', positive: true },
          { label: 'Scope 1 (Direct)', value: '450 tCO₂e', change: '-5.2%', icon: Leaf, color: '#3b82f6', positive: true },
          { label: 'Scope 2 (Energy)', value: '380 tCO₂e', change: '-12.1%', icon: Zap, color: '#8b5cf6', positive: true },
          { label: 'Scope 3 (Indirect)', value: '410 tCO₂e', change: '+2.4%', icon: Recycle, color: '#f59e0b', positive: false },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            className="glass-card p-5 hover-lift"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex items-center justify-between mb-3">
              <stat.icon size={18} style={{ color: stat.color }} />
              <span className={`text-xs font-semibold flex items-center gap-1 ${stat.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                {stat.positive ? <ArrowDownRight size={12} /> : <ArrowUpRight size={12} />}
                {stat.change}
              </span>
            </div>
            <div className="text-xl font-bold text-white">{stat.value}</div>
            <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Trend line */}
        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="font-semibold text-white mb-4">Emission Trend (2024)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={carbonTrendData}>
              <defs>
                <linearGradient id="envGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
              <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="emissions" name="Emissions" stroke="#10b981" strokeWidth={2.5} fill="url(#envGrad)" />
              <Line type="monotone" dataKey="target" name="Target" stroke="#3b82f6" strokeWidth={1.5} strokeDasharray="5 5" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Department carbon */}
        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <h3 className="font-semibold text-white mb-4">Department Carbon Contribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={departmentESGData.map(d => ({ dept: d.dept, score: 100 - d.environmental }))} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
              <XAxis dataKey="dept" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="score" name="Carbon Index" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Goals */}
      <motion.div
        className="glass-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="font-semibold text-white mb-6">Environmental Goals</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {environmentalGoals.map((goal, i) => (
            <div key={goal.id} className="p-4 rounded-xl border border-white/08 hover:border-emerald-500/30 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium text-white text-sm">{goal.title}</h4>
                  <span className="text-xs text-slate-400">{goal.category}</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  goal.status === 'on-track' ? 'status-on-track' : 'status-at-risk'
                }`}>
                  {goal.status}
                </span>
              </div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-2xl font-bold" style={{ color: goal.status === 'on-track' ? '#10b981' : '#ef4444' }}>
                  {goal.progress}%
                </span>
                <span className="text-xs text-slate-500">Due {goal.deadline.slice(0, 7)}</span>
              </div>
              <div className="progress-bar">
                <motion.div
                  className="progress-bar-fill"
                  style={{ background: goal.status === 'on-track' ? 'linear-gradient(90deg,#10b981,#14b8a6)' : 'linear-gradient(90deg,#ef4444,#f97316)' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${goal.progress}%` }}
                  transition={{ duration: 1.2, delay: i * 0.1 }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Carbon Transactions Table */}
      <motion.div
        className="glass-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-white">Carbon Transactions</h3>
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search..."
                className="pl-9 pr-4 py-2 text-sm rounded-xl bg-white/05 border border-white/08 text-white placeholder-slate-500 outline-none focus:border-emerald-500/50 transition-colors"
              />
            </div>
            {/* Scope filter */}
            <select
              value={scopeFilter}
              onChange={e => setScopeFilter(e.target.value)}
              className="px-3 py-2 text-sm rounded-xl bg-white/05 border border-white/08 text-slate-300 outline-none focus:border-emerald-500/50 transition-colors"
            >
              <option value="all">All Scopes</option>
              <option value="Scope 1">Scope 1</option>
              <option value="Scope 2">Scope 2</option>
              <option value="Scope 3">Scope 3</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 text-sm rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors">
              <Download size={14} /> Export
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full data-table">
            <thead>
              <tr className="border-b border-white/08">
                <th className="text-left">Date</th>
                <th className="text-left">Department</th>
                <th className="text-left">Category</th>
                <th className="text-left">Scope</th>
                <th className="text-right">Amount</th>
                <th className="text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t, i) => (
                <motion.tr
                  key={t.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-white/04 hover:bg-white/02 transition-colors"
                >
                  <td className="text-slate-400 text-sm">{t.date}</td>
                  <td className="text-white font-medium text-sm">{t.dept}</td>
                  <td className="text-slate-300 text-sm">{t.category}</td>
                  <td>
                    <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{
                      background: `${scopeColors[t.scope]}20`,
                      color: scopeColors[t.scope],
                    }}>
                      {t.scope}
                    </span>
                  </td>
                  <td className="text-right font-semibold text-white text-sm">{t.amount} {t.unit}</td>
                  <td>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${statusStyle[t.status]}`}>
                      {t.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
