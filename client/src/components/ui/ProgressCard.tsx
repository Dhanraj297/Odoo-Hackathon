'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressCardProps {
  title: string;
  subtitle?: string;
  progress: number;
  target?: number;
  unit?: string;
  color?: string;
  delay?: number;
  badge?: string;
}

export default function ProgressCard({
  title, subtitle, progress, target, unit, color = '#10b981', delay = 0, badge
}: ProgressCardProps) {
  const pct = target ? (progress / target) * 100 : progress;
  const displayPct = Math.min(pct, 100);

  return (
    <motion.div
      className="glass-card p-5 hover-lift"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-semibold text-white text-sm">{title}</h4>
          {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
        </div>
        {badge && (
          <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: `${color}20`, color }}>
            {badge}
          </span>
        )}
      </div>

      <div className="flex items-end gap-2 mb-3">
        <motion.span
          className="text-2xl font-bold"
          style={{ color }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.3 }}
        >
          {progress}
        </motion.span>
        {target && (
          <span className="text-slate-500 text-sm mb-0.5">/ {target} {unit}</span>
        )}
        {!target && unit && (
          <span className="text-slate-400 text-base mb-0.5">{unit}</span>
        )}
      </div>

      <div className="progress-bar">
        <motion.div
          className="progress-bar-fill"
          style={{ background: `linear-gradient(90deg, ${color}aa, ${color})` }}
          initial={{ width: 0 }}
          animate={{ width: `${displayPct}%` }}
          transition={{ duration: 1.2, delay: delay + 0.2, ease: 'easeOut' }}
        />
      </div>
      <div className="flex justify-between mt-2">
        <span className="text-xs text-slate-500">Progress</span>
        <span className="text-xs font-medium" style={{ color }}>{displayPct.toFixed(0)}%</span>
      </div>
    </motion.div>
  );
}
