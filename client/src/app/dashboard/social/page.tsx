'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Heart, Calendar, Clock, TrendingUp, MapPin, Star, Plus } from 'lucide-react';
import { csrActivities, employees, diverstiyMetrics } from '@/lib/mockData';

const statusColors: Record<string, string> = {
  completed: '#10b981', upcoming: '#3b82f6', ongoing: '#f59e0b',
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-card p-3 text-sm">
      <p className="text-slate-300 mb-1">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color }} className="font-semibold">{p.name}: {p.value}</p>
      ))}
    </div>
  );
};

const categoryIcons: Record<string, string> = {
  Environment: '🌿', Education: '📚', Community: '🤝', Health: '💚',
};

export default function SocialPage() {
  const [activeTab, setActiveTab] = useState<'activities' | 'employees' | 'diversity'>('activities');

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
            <Users size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Social</h1>
            <p className="text-slate-400 text-sm">CSR activities, employee participation & diversity</p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'CSR Activities', value: '48', icon: Heart, color: '#ec4899' },
          { label: 'Participants', value: '516', icon: Users, color: '#3b82f6' },
          { label: 'Hours Logged', value: '2,060', icon: Clock, color: '#f59e0b' },
          { label: 'Participation Rate', value: '87%', icon: TrendingUp, color: '#10b981' },
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
          </motion.div>
        ))}
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-2 p-1 rounded-xl bg-white/04 border border-white/08 w-fit">
        {(['activities', 'employees', 'diversity'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
              activeTab === tab
                ? 'bg-emerald-500 text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'activities' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-white">CSR Activities</h3>
            <button className="flex items-center gap-2 btn-primary px-4 py-2 text-sm">
              <Plus size={14} /> New Activity
            </button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {csrActivities.map((act, i) => (
              <motion.div
                key={act.id}
                className="glass-card p-5 hover-lift group"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl">{categoryIcons[act.category] || '🌟'}</span>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize`}
                    style={{ color: statusColors[act.status], background: `${statusColors[act.status]}15` }}>
                    {act.status}
                  </span>
                </div>
                <h4 className="font-semibold text-white mb-1 group-hover:text-emerald-400 transition-colors">{act.title}</h4>
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/08 text-slate-400">{act.category}</span>
                
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-slate-400 text-xs flex items-center gap-1 mb-1"><Users size={10} /> Participants</div>
                    <div className="font-semibold text-white">{act.participants}</div>
                  </div>
                  {act.hoursLogged > 0 && (
                    <div>
                      <div className="text-slate-400 text-xs flex items-center gap-1 mb-1"><Clock size={10} /> Hours</div>
                      <div className="font-semibold text-white">{act.hoursLogged}</div>
                    </div>
                  )}
                </div>
                <div className="mt-3 flex items-center gap-1 text-xs text-slate-500">
                  <Calendar size={10} /> {act.date}
                </div>
                {act.impact && (
                  <div className="mt-2 text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg">
                    🎯 {act.impact}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'employees' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {employees.map((emp, i) => (
            <motion.div
              key={emp.id}
              className="glass-card p-5 hover-lift group"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -4 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {emp.name[0]}
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-white text-sm truncate">{emp.name}</div>
                  <div className="text-xs text-slate-400 truncate">{emp.role}</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Department</span>
                  <span className="text-white font-medium">{emp.dept}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Level</span>
                  <span className="text-emerald-400 font-bold">Lv. {emp.level}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Badges</span>
                  <span className="text-amber-400 font-semibold">🏅 {emp.badges}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">ESG Score</span>
                  <span style={{ color: emp.esgScore >= 80 ? '#10b981' : '#f59e0b' }} className="font-bold">{emp.esgScore}</span>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Participation</span>
                  <span>{emp.participationRate}%</span>
                </div>
                <div className="progress-bar">
                  <motion.div
                    className="progress-bar-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${emp.participationRate}%` }}
                    transition={{ delay: i * 0.07 + 0.3, duration: 1 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {activeTab === 'diversity' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid lg:grid-cols-3 gap-6"
        >
          {/* Gender */}
          <div className="glass-card p-6">
            <h3 className="font-semibold text-white mb-4">Gender Ratio</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={diverstiyMetrics.genderRatio} innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value" animationDuration={1000}>
                  {diverstiyMetrics.genderRatio.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {diverstiyMetrics.genderRatio.map(d => (
                <div key={d.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm" style={{ background: d.color }} />
                    <span className="text-slate-400">{d.name}</span>
                  </div>
                  <span className="text-white font-semibold">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Age groups */}
          <div className="glass-card p-6">
            <h3 className="font-semibold text-white mb-4">Age Distribution</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={diverstiyMetrics.ageGroups} margin={{ left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                <XAxis dataKey="group" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" name="Employees" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Ethnicity */}
          <div className="glass-card p-6">
            <h3 className="font-semibold text-white mb-4">Ethnicity Breakdown</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={diverstiyMetrics.ethnicityBreakdown} innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value" animationDuration={1000}>
                  {diverstiyMetrics.ethnicityBreakdown.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 mt-2">
              {diverstiyMetrics.ethnicityBreakdown.map(d => (
                <div key={d.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm" style={{ background: d.color }} />
                    <span className="text-slate-400 text-xs">{d.name}</span>
                  </div>
                  <span className="text-white font-semibold text-xs">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
