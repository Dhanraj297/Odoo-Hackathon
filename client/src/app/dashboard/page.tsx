'use client';

import { motion } from 'framer-motion';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, XAxis, YAxis, Legend
} from 'recharts';
import KPICard from '@/components/ui/KPICard';
import ESGGauge from '@/components/ui/ESGGauge';
import ProgressCard from '@/components/ui/ProgressCard';
import {
  kpiData, carbonTrendData, departmentESGData, esgBreakdownData,
  radarData, environmentalGoals
} from '@/lib/mockData';
import { TrendingUp, Sparkles, ArrowRight, RefreshCw } from 'lucide-react';

const CHART_COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ec4899', '#06b6d4'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card p-3 text-sm border border-white/10">
      <p className="text-slate-300 mb-1 font-medium">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color }} className="font-semibold">
          {p.name}: {p.value?.toLocaleString()}
        </p>
      ))}
    </div>
  );
};

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="text-2xl font-bold text-white">ESG Dashboard</h1>
          <p className="text-slate-400 text-sm mt-1">Q1 2024 · Real-time sustainability overview</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Live Data
          </div>
          <motion.button
            className="p-2 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/05 transition-colors"
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.4 }}
          >
            <RefreshCw size={16} />
          </motion.button>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 justify-items-stretch">
        {kpiData.map((kpi, i) => (
          <KPICard key={kpi.id} {...kpi} delay={i * 0.08} />
        ))}
      </div>

      {/* ESG Score + Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* ESG Gauge */}
        <motion.div
          className="glass-card p-6 flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="font-semibold text-white mb-6 self-start">Overall ESG Score</h3>
          <ESGGauge score={82} size={220} />
          <div className="grid grid-cols-3 gap-4 w-full mt-6">
            {esgBreakdownData.map((d, i) => (
              <div key={d.name} className="text-center">
                <div className="text-lg font-bold" style={{ color: d.color }}>{d.value}</div>
                <div className="text-xs text-slate-400">{d.name}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ESG Breakdown Pie */}
        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          <h3 className="font-semibold text-white mb-4">ESG Breakdown</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={esgBreakdownData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
                animationBegin={300}
                animationDuration={1200}
              >
                {esgBreakdownData.map((entry, index) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {esgBreakdownData.map(d => (
              <div key={d.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm" style={{ background: d.color }} />
                  <span className="text-sm text-slate-400">{d.name}</span>
                </div>
                <span className="text-sm font-semibold text-white">{d.value}/100</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Radar Chart */}
        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="font-semibold text-white mb-4">Environmental Radar</h3>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(148,163,184,0.2)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <Radar
                name="Score"
                dataKey="A"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.2}
                animationBegin={400}
                animationDuration={1000}
              />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Carbon Trend Chart */}
      <motion.div
        className="glass-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-semibold text-white">Carbon Emission Trend</h3>
            <p className="text-sm text-slate-400 mt-0.5">Monthly tCO₂e vs target</p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-slate-400">Actual</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-slate-400">Target</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={carbonTrendData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="colorEmissions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
            <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="emissions" name="Actual" stroke="#10b981" strokeWidth={2.5} fill="url(#colorEmissions)" animationBegin={200} animationDuration={1500} />
            <Area type="monotone" dataKey="target" name="Target" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" fill="url(#colorTarget)" animationBegin={400} animationDuration={1500} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Department Comparison + Goals */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Bar Chart */}
        <motion.div
          className="glass-card p-6 lg:col-span-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="font-semibold text-white mb-6">Department ESG Comparison</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={departmentESGData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
              <XAxis dataKey="dept" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="environmental" name="Environmental" fill="#10b981" radius={[4, 4, 0, 0]} animationBegin={200} />
              <Bar dataKey="social" name="Social" fill="#3b82f6" radius={[4, 4, 0, 0]} animationBegin={300} />
              <Bar dataKey="governance" name="Governance" fill="#8b5cf6" radius={[4, 4, 0, 0]} animationBegin={400} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Goals Progress */}
        <motion.div
          className="glass-card p-6 lg:col-span-2 flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
        >
          <h3 className="font-semibold text-white mb-4">Sustainability Goals</h3>
          <div className="space-y-4 flex-1">
            {environmentalGoals.slice(0, 4).map((goal, i) => (
              <ProgressCard
                key={goal.id}
                title={goal.title}
                subtitle={goal.category}
                progress={goal.progress}
                target={goal.target}
                unit={goal.unit}
                color={goal.status === 'on-track' ? '#10b981' : '#ef4444'}
                delay={i * 0.1}
                badge={goal.status === 'on-track' ? 'On Track' : 'At Risk'}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* AI Insights card */}
      <motion.div
        className="relative overflow-hidden rounded-2xl p-6"
        style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(59,130,246,0.1) 50%, rgba(139,92,246,0.1) 100%)', border: '1px solid rgba(16,185,129,0.2)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="absolute top-4 right-4 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0">
            <Sparkles size={22} className="text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-white">AI ESG Summary</h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Powered by EcoAI
              </span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Your ESG performance improved by <strong className="text-emerald-400">4.2 points</strong> this quarter, 
              driven by strong governance scores (87/100) and increased employee participation (87%). 
              Carbon emissions are trending <strong className="text-emerald-400">8.5% below</strong> last month. 
              <strong className="text-amber-400"> Recommendation:</strong> Focus on water reduction — currently at 38% of target with deadline in Q4 2025.
            </p>
            <button className="mt-4 flex items-center gap-2 text-emerald-400 text-sm font-medium hover:text-emerald-300 transition-colors">
              View full analysis <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
