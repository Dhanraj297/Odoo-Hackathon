'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';
import CountUp from 'react-countup';

interface KPICardProps {
  title: string;
  value: number;
  unit?: string;
  change: number;
  changeLabel: string;
  icon: string;
  gradient: string;
  delay?: number;
}

const gradientMap: Record<string, string> = {
  'from-emerald-500 to-teal-500': 'linear-gradient(135deg, #10b981, #14b8a6)',
  'from-blue-500 to-cyan-500': 'linear-gradient(135deg, #3b82f6, #06b6d4)',
  'from-pink-500 to-rose-500': 'linear-gradient(135deg, #ec4899, #f43f5e)',
  'from-amber-500 to-orange-500': 'linear-gradient(135deg, #f59e0b, #f97316)',
  'from-violet-500 to-purple-500': 'linear-gradient(135deg, #8b5cf6, #a855f7)',
  'from-teal-500 to-emerald-500': 'linear-gradient(135deg, #14b8a6, #10b981)',
};

export default function KPICard({ title, value, unit, change, changeLabel, icon, gradient, delay = 0 }: KPICardProps) {
  // @ts-ignore
  const IconComponent = (LucideIcons as Record<string, React.ElementType>)[icon] || LucideIcons.Award;
  const isPositive = change >= 0;
  const isNeutral = change === 0;
  const bg = gradientMap[gradient] || 'linear-gradient(135deg, #10b981, #14b8a6)';

  return (
    <motion.div
      className="glass-card p-6 hover-lift cursor-default group"
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-start justify-between mb-4">
        <motion.div
          className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ background: bg }}
          whileHover={{ rotate: 10, scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <IconComponent size={22} className="text-white" />
        </motion.div>
        <div className={cn(
          'flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold',
          isNeutral ? 'text-slate-400 bg-slate-400/10' :
          isPositive ? 'text-emerald-400 bg-emerald-400/10' : 'text-red-400 bg-red-400/10'
        )}>
          {isNeutral ? <Minus size={12} /> : isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {Math.abs(change)}{unit === '%' ? 'pp' : '%'}
        </div>
      </div>

      <div className="mb-1">
        <div className="text-2xl font-black text-white flex items-baseline gap-1">
          <CountUp end={value} duration={1.8} separator="," enableScrollSpy scrollSpyOnce />
          {unit && <span className="text-base font-medium text-slate-400">{unit}</span>}
        </div>
      </div>
      <div className="text-sm text-slate-400">{title}</div>
      <div className="text-xs text-slate-500 mt-1">{changeLabel}</div>

      {/* Bottom gradient line */}
      <div className="mt-4 h-0.5 rounded-full opacity-30" style={{ background: bg }} />
    </motion.div>
  );
}
