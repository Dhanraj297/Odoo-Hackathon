'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Zap, Trophy, Star, Gift, Target, Crown, ChevronUp, ChevronDown, Minus, Lock } from 'lucide-react';
import { leaderboard, badges, challenges } from '@/lib/mockData';

const rarityGradients: Record<string, string> = {
  legendary: 'from-yellow-400 to-orange-500',
  epic: 'from-purple-500 to-indigo-600',
  rare: 'from-blue-500 to-cyan-600',
  common: 'from-slate-500 to-slate-600',
};
const rarityColors: Record<string, string> = {
  legendary: '#fbbf24', epic: '#a855f7', rare: '#3b82f6', common: '#6b7280',
};

function Confetti() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-sm"
          style={{
            background: ['#10b981', '#3b82f6', '#f59e0b', '#ec4899', '#8b5cf6'][i % 5],
            left: `${10 + i * 7}%`,
            top: '-10%',
          }}
          animate={{
            y: ['0%', '110%'],
            rotate: [0, 720],
            opacity: [1, 0],
          }}
          transition={{
            duration: 1.5 + Math.random(),
            delay: i * 0.1,
            ease: 'easeIn',
          }}
        />
      ))}
    </div>
  );
}

function PodiumCard({ entry, position }: { entry: typeof leaderboard[0]; position: 1 | 2 | 3 }) {
  const heights: Record<number, string> = { 1: 'h-28', 2: 'h-20', 3: 'h-16' };
  const colors: Record<number, string> = { 1: '#ffd700', 2: '#c0c0c0', 3: '#cd7f32' };
  const icons = { 1: '🥇', 2: '🥈', 3: '🥉' };
  
  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: position * 0.15, type: 'spring', stiffness: 200 }}
    >
      <motion.div
        className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-xl font-black mb-2 shadow-glow-emerald"
        animate={{ y: position === 1 ? [-3, 3, -3] : [0, 0, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {entry.name[0]}
      </motion.div>
      <div className="text-sm font-semibold text-white text-center mb-1">{entry.name.split(' ')[0]}</div>
      <div className="text-xs text-slate-400 mb-2">{entry.dept}</div>
      <div className={`w-24 ${heights[position]} rounded-t-xl flex items-end justify-center pb-3`}
        style={{ background: `${colors[position]}20`, border: `1px solid ${colors[position]}40` }}>
        <span className="text-2xl">{icons[position]}</span>
      </div>
    </motion.div>
  );
}

export default function GamificationPage() {
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'badges' | 'challenges'>('leaderboard');
  const [showConfetti, setShowConfetti] = useState(false);
  const [unlockedBadge, setUnlockedBadge] = useState<number | null>(null);

  const handleBadgeClick = (id: number, unlocked: boolean) => {
    if (!unlocked) return;
    setUnlockedBadge(id);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
            <Zap size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Gamification</h1>
            <p className="text-slate-400 text-sm">Leaderboard, badges, rewards & challenges</p>
          </div>
        </div>
      </motion.div>

      {/* My Profile XP Card */}
      <motion.div
        className="relative overflow-hidden rounded-2xl p-6"
        style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(239,68,68,0.1))', border: '1px solid rgba(245,158,11,0.25)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-3xl rounded-full" />
        <div className="relative flex items-center gap-6">
          <motion.div
            className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-black text-3xl flex-shrink-0"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            E
          </motion.div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-xl font-bold text-white">Emma Williams</h2>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                Level 9 · Eco Champion
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
              <span>⚡ 5,120 XP</span>
              <span>🏅 15 Badges</span>
              <span>🏆 #1 Rank</span>
            </div>
            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                <span>Progress to Level 10</span>
                <span className="text-amber-400 font-semibold">5,120 / 6,000 XP</span>
              </div>
              <div className="h-3 rounded-full bg-white/08 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #f59e0b, #ef4444)' }}
                  initial={{ width: 0 }}
                  animate={{ width: '85%' }}
                  transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 rounded-xl bg-white/04 border border-white/08 w-fit">
        {(['leaderboard', 'badges', 'challenges'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
              activeTab === tab ? 'bg-amber-500 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            {tab === 'leaderboard' ? '🏆 ' : tab === 'badges' ? '🏅 ' : '⚡ '}
            {tab}
          </button>
        ))}
      </div>

      {/* Leaderboard */}
      {activeTab === 'leaderboard' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Podium */}
          <div className="glass-card p-8">
            <h3 className="font-semibold text-white text-center mb-8">🏆 Top Performers</h3>
            <div className="flex items-end justify-center gap-4">
              <PodiumCard entry={leaderboard[1]} position={2} />
              <PodiumCard entry={leaderboard[0]} position={1} />
              <PodiumCard entry={leaderboard[2]} position={3} />
            </div>
          </div>

          {/* Full list */}
          <div className="glass-card overflow-hidden">
            {leaderboard.map((entry, i) => (
              <motion.div
                key={entry.rank}
                className="flex items-center gap-4 p-4 border-b border-white/05 hover:bg-white/02 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <div className={`w-8 text-center font-black text-lg ${
                  entry.rank <= 3 ? 'text-amber-400' : 'text-slate-500'
                }`}>
                  {entry.rank <= 3 ? ['🥇', '🥈', '🥉'][entry.rank - 1] : entry.rank}
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                  {entry.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white text-sm">{entry.name}</div>
                  <div className="text-xs text-slate-400">{entry.dept}</div>
                </div>
                <div className="hidden md:flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-amber-400">{entry.xp.toLocaleString()}</div>
                    <div className="text-xs text-slate-500">XP</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-emerald-400">Lv.{entry.level}</div>
                    <div className="text-xs text-slate-500">Level</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-purple-400">{entry.badges}</div>
                    <div className="text-xs text-slate-500">Badges</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  {entry.change > 0 ? (
                    <span className="text-emerald-400 flex items-center gap-0.5"><ChevronUp size={14} />+{entry.change}</span>
                  ) : entry.change < 0 ? (
                    <span className="text-red-400 flex items-center gap-0.5"><ChevronDown size={14} />{entry.change}</span>
                  ) : (
                    <span className="text-slate-500 flex items-center gap-0.5"><Minus size={14} />—</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Badges */}
      {activeTab === 'badges' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          {showConfetti && (
            <div className="fixed inset-0 z-50 pointer-events-none">
              <Confetti />
              <motion.div
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass-card px-8 py-6 text-center z-50"
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <div className="text-4xl mb-2">🎉</div>
                <div className="text-white font-bold">Badge Viewed!</div>
              </motion.div>
            </div>
          )}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {badges.map((badge, i) => (
              <motion.div
                key={badge.id}
                className={`glass-card p-6 text-center cursor-pointer hover-lift ${!badge.unlocked ? 'opacity-50 grayscale' : 'group'}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: badge.unlocked ? 1 : 0.5, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: badge.unlocked ? 1.05 : 1 }}
                onClick={() => handleBadgeClick(badge.id, badge.unlocked)}
              >
                <motion.div
                  className="text-5xl mb-3"
                  animate={badge.unlocked ? { rotate: [0, 10, -10, 0] } : {}}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  {badge.unlocked ? badge.icon : '🔒'}
                </motion.div>
                <div className="font-semibold text-white text-sm mb-1">{badge.name}</div>
                <span className={`inline-block text-xs px-2 py-0.5 rounded-full font-bold mb-2 capitalize`}
                  style={{ color: rarityColors[badge.rarity], background: `${rarityColors[badge.rarity]}20` }}>
                  {badge.rarity}
                </span>
                <div className="text-xs text-slate-400 leading-relaxed">{badge.description}</div>
                <div className="mt-3 text-xs font-bold text-amber-400">+{badge.xp} XP</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Challenges */}
      {activeTab === 'challenges' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {challenges.map((ch, i) => {
            const diffColors: Record<string, string> = { Easy: '#10b981', Medium: '#f59e0b', Hard: '#ef4444' };
            return (
              <motion.div
                key={ch.id}
                className="glass-card p-6 hover-lift group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/08 text-slate-400">{ch.category}</span>
                  <span className="text-xs font-bold" style={{ color: diffColors[ch.difficulty] }}>{ch.difficulty}</span>
                </div>
                <h4 className="font-semibold text-white mb-1 group-hover:text-amber-400 transition-colors">{ch.title}</h4>
                <p className="text-sm text-slate-400 mb-4">{ch.description}</p>
                
                {ch.progress > 0 && (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                      <span>Progress</span>
                      <span>{ch.progress}%</span>
                    </div>
                    <div className="progress-bar">
                      <motion.div
                        className="progress-bar-fill"
                        style={{ background: 'linear-gradient(90deg, #f59e0b, #ef4444)' }}
                        initial={{ width: 0 }}
                        animate={{ width: `${ch.progress}%` }}
                        transition={{ delay: i * 0.1 + 0.3, duration: 1 }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between mt-2 text-sm">
                  <div className="flex items-center gap-3 text-slate-400 text-xs">
                    <span>👥 {ch.participants}</span>
                    <span>⏰ {ch.daysLeft}d left</span>
                  </div>
                  <div className="flex items-center gap-1 font-bold text-amber-400">
                    ⚡ {ch.xp} XP
                  </div>
                </div>

                <motion.button
                  className={`w-full mt-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    ch.progress > 0
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-amber-500/30'
                      : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {ch.progress > 0 ? 'Continue Challenge' : 'Join Challenge'}
                </motion.button>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
