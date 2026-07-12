'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

/* ─── Orbital Ring ─────────────────────────────────────────────── */
function OrbitRing({ rx, ry, tilt, dur, clr = 'rgba(16,185,129,0.35)', dot = '#10b981' }: {
  rx: number; ry: number; tilt: number; dur: number; clr?: string; dot?: string;
}) {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none flex items-center justify-center"
      animate={{ rotate: 360 }}
      transition={{ duration: dur, repeat: Infinity, ease: 'linear' }}
    >
      <svg style={{ position: 'absolute', width: '100%', height: '100%' }} viewBox="0 0 340 340">
        <ellipse cx="170" cy="170" rx={rx} ry={ry} fill="none" stroke={clr}
          strokeWidth="1.2" strokeDasharray="5 7" transform={`rotate(${tilt},170,170)`} />
        <circle
          cx={170 + rx * Math.cos((tilt * Math.PI) / 180)}
          cy={170 + ry * Math.sin((tilt * Math.PI) / 180)}
          r="4.5" fill={dot}
          style={{ filter: `drop-shadow(0 0 8px ${dot})` }}
          transform={`rotate(${tilt},170,170)`}
        />
      </svg>
    </motion.div>
  );
}

/* ─── ESG Node ─────────────────────────────────────────────────── */
function Node({ x, y, icon, lbl, delay }: { x: number; y: number; icon: string; lbl: string; delay: number }) {
  return (
    <motion.div
      className="absolute flex flex-col items-center gap-1 pointer-events-none"
      style={{ left: x, top: y, transform: 'translate(-50%,-50%)' }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
    >
      <motion.div
        className="w-9 h-9 rounded-xl flex items-center justify-center text-sm"
        style={{
          background: 'rgba(5,18,32,0.9)',
          border: '1px solid rgba(16,185,129,0.5)',
          boxShadow: '0 0 18px rgba(16,185,129,0.4)',
          backdropFilter: 'blur(8px)',
        }}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3 + delay, repeat: Infinity, ease: 'easeInOut' }}
      >
        {icon}
      </motion.div>
      <span className="text-[9px] font-bold text-emerald-400/80 whitespace-nowrap tracking-wide">{lbl}</span>
    </motion.div>
  );
}

/* ─── Floating Leaf ────────────────────────────────────────────── */
function Leaf({ x, y, s, delay }: { x: number; y: number; s: number; delay: number }) {
  return (
    <motion.div className="absolute pointer-events-none" style={{ left: x, top: y }}
      animate={{ y: [0, -22, 0], rotate: [0, 18, -12, 0], opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 4.5 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      <svg width={s} height={Math.round(s * 1.3)} viewBox="0 0 14 18">
        <path d="M7 1C7 1 1 5 1 11c0 4 3 6 6 6s6-2 6-6C13 5 7 1 7 1Z"
          fill="rgba(16,185,129,0.78)" stroke="rgba(52,211,153,0.6)" strokeWidth="0.5" />
        <line x1="7" y1="17" x2="7" y2="4" stroke="rgba(255,255,255,0.25)" strokeWidth="0.7" />
      </svg>
    </motion.div>
  );
}

/* ─── Star ─────────────────────────────────────────────────────── */
function Star({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <motion.div className="absolute rounded-full pointer-events-none"
      style={{ left: x, top: y, width: 2, height: 2, background: 'rgba(255,255,255,0.85)' }}
      animate={{ opacity: [0.1, 1, 0.1] }}
      transition={{ duration: 2.5 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  );
}

/* ─── Main Component ───────────────────────────────────────────── */
export default function EarthIllustration() {
  const nodes = [
    { x: 20,  y: 108, icon: '🌿', lbl: 'Carbon',  delay: 0.4 },
    { x: 368, y: 82,  icon: '☀️', lbl: 'Solar',   delay: 0.7 },
    { x: 375, y: 252, icon: '⚡', lbl: 'Energy',  delay: 1.0 },
    { x: 24,  y: 258, icon: '♻️', lbl: 'Recycle', delay: 1.3 },
  ];
  const leaves = [
    { x: 50,  y: 42,  s: 14, delay: 0   },
    { x: 322, y: 55,  s: 12, delay: 1   },
    { x: 338, y: 270, s: 15, delay: 0.5 },
    { x: 34,  y: 285, s: 13, delay: 1.5 },
    { x: 195, y: 8,   s: 11, delay: 0.8 },
    { x: 348, y: 175, s: 10, delay: 1.2 },
  ];
  const stars = [
    { x: 88,  y: 20,  delay: 0   },
    { x: 290, y: 28,  delay: 0.5 },
    { x: 30,  y: 138, delay: 1   },
    { x: 358, y: 118, delay: 0.3 },
    { x: 62,  y: 322, delay: 0.8 },
    { x: 315, y: 335, delay: 1.4 },
    { x: 170, y: 5,   delay: 0.6 },
    { x: 228, y: 368, delay: 1.1 },
  ];

  return (
    <div className="relative select-none" style={{ width: 400, height: 400 }}>

      {/* Background stars */}
      {stars.map((s, i) => <Star key={i} {...s} />)}

      {/* Floating leaves */}
      {leaves.map((l, i) => <Leaf key={i} {...l} />)}

      {/* ESG dashed connection lines */}
      <svg className="absolute inset-0 pointer-events-none" width="400" height="400" style={{ opacity: 0.45 }}>
        <line x1="20"  y1="108" x2="128" y2="175" stroke="#10b981" strokeWidth="1" strokeDasharray="3 6" />
        <line x1="368" y1="82"  x2="272" y2="150" stroke="#10b981" strokeWidth="1" strokeDasharray="3 6" />
        <line x1="375" y1="252" x2="278" y2="238" stroke="#10b981" strokeWidth="1" strokeDasharray="3 6" />
        <line x1="24"  y1="258" x2="132" y2="240" stroke="#10b981" strokeWidth="1" strokeDasharray="3 6" />
      </svg>

      {/* ESG Nodes */}
      {nodes.map((n, i) => <Node key={i} {...n} />)}

      {/* Orbital rings */}
      <OrbitRing rx={188} ry={40}  tilt={-10} dur={9} />
      <OrbitRing rx={180} ry={33}  tilt={20}  dur={14} clr="rgba(59,130,246,0.28)"  dot="#60a5fa" />
      <OrbitRing rx={166} ry={26}  tilt={-42} dur={11} clr="rgba(167,139,250,0.22)" dot="#a78bfa" />

      {/* Outer atmosphere glow (pulses) */}
      <motion.div className="absolute rounded-full pointer-events-none"
        style={{ inset: '-22px', background: 'radial-gradient(circle,rgba(16,185,129,0.18) 0%,transparent 68%)', filter: 'blur(18px)' }}
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.04, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── The Globe ── */}
      <motion.div className="absolute" style={{ left: 66, top: 66, width: 268, height: 268 }}
        animate={{ y: [0, -12, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}>

        {/* Circular clip container */}
        <div style={{
          width: 268, height: 268, borderRadius: '50%', overflow: 'hidden', position: 'relative',
          background: '#040e1c',
          boxShadow: '0 0 90px rgba(16,185,129,0.45), 0 0 160px rgba(59,130,246,0.2), inset 0 0 50px rgba(0,0,0,0.4)',
        }}>

          {/* ── Realistic Earth photo (slowly rotating) ── */}
          <motion.div
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          >
            <Image
              src="/earth.png"
              alt="Earth"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              priority
            />
          </motion.div>

          {/* Dark edge vignette — eliminates white border from photo background */}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: 'radial-gradient(circle at 50% 50%, transparent 62%, rgba(4,14,28,0.7) 78%, rgba(2,8,18,0.97) 90%, #020810 100%)',
            zIndex: 2,
          }} />

          {/* Specular highlight — top-left (creates strong 3D sphere illusion) */}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: 'radial-gradient(circle at 28% 24%, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.05) 28%, transparent 50%)',
            zIndex: 3,
          }} />

          {/* Blue ambient highlight top-right */}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: 'radial-gradient(circle at 72% 18%, rgba(96,165,250,0.14) 0%, transparent 48%)',
            zIndex: 3,
          }} />

          {/* Terminator shadow — bottom-right darkening */}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: 'radial-gradient(circle at 78% 78%, rgba(0,0,0,0.52) 0%, transparent 50%)',
            zIndex: 3,
          }} />

          {/* Emerald rim light */}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            boxShadow: 'inset 0 0 30px rgba(16,185,129,0.25), inset -4px -4px 20px rgba(16,185,129,0.12)',
            zIndex: 3,
          }} />

          {/* ESG glow hotspot overlays */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 4 }} viewBox="0 0 268 268">
            <circle cx="110" cy="92"  r="9"  fill="none" stroke="rgba(16,185,129,0.55)" strokeWidth="1.2" opacity="0.7" />
            <circle cx="110" cy="92"  r="16" fill="none" stroke="rgba(16,185,129,0.2)"  strokeWidth="0.8" opacity="0.5" />
            <circle cx="172" cy="115" r="7"  fill="none" stroke="rgba(16,185,129,0.5)"  strokeWidth="1"   opacity="0.6" />
            <circle cx="172" cy="115" r="13" fill="none" stroke="rgba(16,185,129,0.18)" strokeWidth="0.8" opacity="0.4" />
            <circle cx="92"  cy="140" r="6"  fill="none" stroke="rgba(16,185,129,0.45)" strokeWidth="1"   opacity="0.55" />
          </svg>
        </div>

        {/* Pulsing outer ring */}
        <motion.div className="absolute rounded-full pointer-events-none"
          style={{ inset: '-10px', borderRadius: '50%', border: '1.5px solid rgba(16,185,129,0.4)', boxShadow: '0 0 32px rgba(16,185,129,0.28)' }}
          animate={{ opacity: [0.3, 0.9, 0.3], scale: [1, 1.04, 1] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Outer thin blue ring */}
        <motion.div className="absolute rounded-full pointer-events-none"
          style={{ inset: '-24px', borderRadius: '50%', border: '1px solid rgba(59,130,246,0.2)' }}
          animate={{ opacity: [0.15, 0.55, 0.15] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </motion.div>
    </div>
  );
}
