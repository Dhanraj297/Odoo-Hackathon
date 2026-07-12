'use client';

import { motion } from 'framer-motion';
import { getESGColor, getESGGrade } from '@/lib/utils';

interface ESGGaugeProps {
  score: number;
  size?: number;
  showLabel?: boolean;
  label?: string;
}

export default function ESGGauge({ score, size = 180, showLabel = true, label = 'ESG Score' }: ESGGaugeProps) {
  const radius = (size - 20) / 2;
  const circumference = Math.PI * radius; // half circle
  const strokeDash = (score / 100) * circumference;
  const color = getESGColor(score);
  const grade = getESGGrade(score);
  const cx = size / 2;
  const cy = size / 2;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size / 2 + 20 }}>
        <svg
          width={size}
          height={size / 2 + 20}
          viewBox={`0 0 ${size} ${size / 2 + 20}`}
          className="overflow-visible"
        >
          {/* Background track */}
          <path
            d={`M 10 ${cy} A ${radius} ${radius} 0 0 1 ${size - 10} ${cy}`}
            fill="none"
            stroke="rgba(148,163,184,0.15)"
            strokeWidth="12"
            strokeLinecap="round"
          />
          {/* Colored arc */}
          <motion.path
            d={`M 10 ${cy} A ${radius} ${radius} 0 0 1 ${size - 10} ${cy}`}
            fill="none"
            stroke={color}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={circumference}
            animate={{ strokeDashoffset: circumference - strokeDash }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
            style={{ filter: `drop-shadow(0 0 8px ${color})` }}
          />
          {/* Center needle */}
          <motion.line
            x1={cx}
            y1={cy}
            x2={cx + radius * 0.7 * Math.cos(Math.PI - (score / 100) * Math.PI)}
            y2={cy + radius * 0.7 * Math.sin(Math.PI - (score / 100) * Math.PI) * -1}
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          />
          <circle cx={cx} cy={cy} r="6" fill={color} />
        </svg>
        
        {/* Score text */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
          <motion.div
            className="text-4xl font-black"
            style={{ color }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, type: 'spring', stiffness: 300 }}
          >
            {score}
          </motion.div>
          <div className="text-xs font-bold px-2 py-0.5 rounded-full mt-1" style={{ background: `${color}20`, color }}>
            {grade}
          </div>
        </div>
      </div>
      {showLabel && (
        <div className="text-sm text-slate-400 mt-3">{label}</div>
      )}
    </div>
  );
}
