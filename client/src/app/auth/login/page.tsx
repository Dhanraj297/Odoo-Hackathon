'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Leaf, ArrowRight, Lock, Mail, Sparkles, Globe2 } from 'lucide-react';
import EarthIllustration from '@/components/EarthIllustration';

/* ─── Animated Background Blob ─────────────────────────────────── */
function AnimatedBlob({ color, style }: { color: string; style: React.CSSProperties }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ background: color, filter: 'blur(90px)', opacity: 0.22, ...style }}
      animate={{ scale: [1, 1.25, 1], x: [0, 25, 0], y: [0, -18, 0] }}
      transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

/* ─── Input Field ───────────────────────────────────────────────── */
function InputField({
  label, icon: Icon, type = 'text', placeholder, value, onChange,
}: {
  label: string;
  icon: React.ElementType;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className="flex flex-col gap-2.5">
      <label className="text-sm font-semibold text-slate-300 tracking-wide">{label}</label>
      <motion.div
        className="relative"
        animate={{ scale: focused ? 1.005 : 1 }}
        transition={{ duration: 0.15 }}
      >
        <Icon
          size={18}
          className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        />
        <input
          type={isPassword && showPass ? 'text' : type}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            height: '56px',
            paddingLeft: '52px',
            paddingRight: isPassword ? '52px' : '20px',
            borderRadius: '16px',
            background: focused ? 'rgba(16,185,129,0.07)' : 'rgba(255,255,255,0.04)',
            border: `1.5px solid ${focused ? 'rgba(16,185,129,0.6)' : 'rgba(255,255,255,0.1)'}`,
            boxShadow: focused ? '0 0 0 4px rgba(16,185,129,0.1), 0 2px 12px rgba(16,185,129,0.08)' : 'none',
            transition: 'all 0.2s ease',
            outline: 'none',
            width: '100%',
            color: 'white',
            fontSize: '15px',
          }}
          className="placeholder-slate-500"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPass(v => !v)}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
          >
            {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </motion.div>
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────────────── */
export default function LoginPage() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading]   = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    router.push('/dashboard');
  };

  return (
    <div
      className="min-h-screen flex overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 20% 50%, #051a0f 0%, #030712 50%, #06091a 100%)' }}
    >
      {/* ═══════════════ LEFT — Illustration Panel ═══════════════ */}
      <motion.div
        className="hidden lg:flex flex-1 relative items-center justify-center"
        style={{ padding: '48px 40px' }}
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        {/* Deep background blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <AnimatedBlob color="#10b981" style={{ width: 500, height: 500, top: '-5%',  left: '-5%'  }} />
          <AnimatedBlob color="#3b82f6" style={{ width: 350, height: 350, bottom: '0%', right: '-5%' }} />
          <AnimatedBlob color="#8b5cf6" style={{ width: 240, height: 240, top: '60%',  left: '15%'  }} />
        </div>

        {/* Very subtle grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(16,185,129,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.04) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative z-10 text-center max-w-lg flex flex-col items-center">

          {/* Logo */}
          <motion.div
            className="flex items-center justify-center gap-3 mb-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#10b981,#0d9488)', boxShadow: '0 0 24px rgba(16,185,129,0.45)' }}
            >
              <Leaf size={24} className="text-white" />
            </div>
            <span className="text-3xl font-black text-white tracking-tight">EcoSphere</span>
          </motion.div>

          {/* Premium Earth Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="mb-10"
          >
            <EarthIllustration />
          </motion.div>

          {/* Heading */}
          <motion.h2
            className="text-4xl font-black text-white mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Manage Your{' '}
            <span className="gradient-text">Sustainability</span>{' '}Journey
          </motion.h2>

          {/* Subtext */}
          <motion.p
            className="text-slate-400 text-base leading-relaxed mb-8"
            style={{ maxWidth: 380 }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Track ESG metrics, engage your team, and drive real environmental impact.
          </motion.p>

          {/* Feature bullets */}
          <motion.div
            className="grid grid-cols-2 gap-x-8 gap-y-3 text-left"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            {[
              'Carbon tracking',
              'AI ESG insights',
              'Gamification',
              'Audit compliance',
            ].map((feat, i) => (
              <div key={i} className="flex items-center gap-2.5 text-slate-300 text-sm">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                {feat}
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* ═══════════════ RIGHT — Login Card Panel ═══════════════ */}
      <motion.div
        className="w-full lg:w-[660px] flex items-center justify-center px-6 py-12 relative"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.1, ease: 'easeOut' }}
      >
        {/* Subtle right-panel blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <AnimatedBlob color="#10b981" style={{ width: 300, height: 300, top: '-12%',   right: '-12%' }} />
          <AnimatedBlob color="#8b5cf6" style={{ width: 240, height: 240, bottom: '-8%', left: '-8%'  }} />
        </div>

        <div className="relative w-full" style={{ maxWidth: '560px' }}>

          {/* Mobile-only logo */}
          <div className="flex lg:hidden items-center justify-center gap-2 mb-10">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#10b981,#0d9488)' }}
            >
              <Leaf size={20} className="text-white" />
            </div>
            <span className="font-black text-2xl text-white">EcoSphere</span>
          </div>

          {/* ── Glass Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              background: 'rgba(10,20,35,0.72)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(16,185,129,0.14)',
              borderRadius: '28px',
              padding: '52px 52px',
              boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset, 0 0 60px rgba(16,185,129,0.06)',
            }}
          >
            {/* ── Card Header (centered) ── */}
            <div className="flex flex-col items-center text-center mb-10">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-emerald-400 mb-6"
                style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)' }}
              >
                <Sparkles size={13} />
                Welcome back
              </div>

              <h1
                className="font-black text-white mb-3 leading-tight"
                style={{ fontSize: '32px' }}
              >
                Sign in to EcoSphere
              </h1>

              <p className="text-slate-400 text-base">
                Don't have an account?{' '}
                <a
                  href="#"
                  className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
                >
                  Get started free
                </a>
              </p>
            </div>

            {/* ── Form ── */}
            <form onSubmit={handleLogin} className="flex flex-col" style={{ gap: '24px' }}>

              {/* Email */}
              <InputField
                label="Email Address"
                icon={Mail}
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={setEmail}
              />

              {/* Password */}
              <InputField
                label="Password"
                icon={Lock}
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={setPassword}
              />

              {/* Remember / Forgot — spaced 32px below password */}
              <div className="flex items-center justify-between" style={{ marginTop: '8px' }}>
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <div
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all cursor-pointer ${
                      remember
                        ? 'bg-emerald-500 border-emerald-500'
                        : 'border-slate-600 hover:border-emerald-500/50'
                    }`}
                    onClick={() => setRemember(v => !v)}
                  >
                    {remember && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2.5 h-2.5 bg-white rounded-sm"
                      />
                    )}
                  </div>
                  <span className="text-sm text-slate-400">Remember me</span>
                </label>

                <a
                  href="#"
                  className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
                >
                  Forgot password?
                </a>
              </div>

              {/* Sign In Button — 56px, gradient, glow */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full font-semibold text-white relative overflow-hidden flex items-center justify-center gap-2"
                style={{
                  height: '56px',
                  borderRadius: '16px',
                  fontSize: '16px',
                  background: loading
                    ? 'rgba(16,185,129,0.5)'
                    : 'linear-gradient(135deg, #10b981 0%, #059669 50%, #0d9488 100%)',
                  boxShadow: loading
                    ? 'none'
                    : '0 8px 32px rgba(16,185,129,0.38), 0 2px 8px rgba(0,0,0,0.3)',
                  transition: 'all 0.3s ease',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  border: 'none',
                }}
              >
                {/* Shimmer on hover */}
                <span
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)',
                    transform: 'skewX(-20deg)',
                  }}
                />
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2.5"
                    >
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Signing in…
                    </motion.div>
                  ) : (
                    <motion.div
                      key="default"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2.5"
                    >
                      Sign In <ArrowRight size={18} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Divider */}
              <div className="flex items-center gap-3" style={{ marginBlock: '4px' }}>
                <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
                <span
                  className="text-xs font-semibold tracking-widest"
                  style={{ color: 'rgba(148,163,184,0.6)', whiteSpace: 'nowrap' }}
                >
                  OR CONTINUE WITH
                </span>
                <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
              </div>

              {/* Google Button */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.02, background: 'rgba(255,255,255,0.06)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push('/dashboard')}
                className="w-full flex items-center justify-center gap-3 font-semibold text-slate-300 hover:text-white transition-colors"
                style={{
                  height: '56px',
                  borderRadius: '16px',
                  fontSize: '15px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1.5px solid rgba(255,255,255,0.12)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {/* Google 'G' SVG */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </motion.button>
            </form>
          </motion.div>

          {/* Footer */}
          <motion.p
            className="text-center text-xs mt-7 leading-relaxed"
            style={{ color: 'rgba(148,163,184,0.45)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            By signing in, you agree to our{' '}
            <a href="#" className="hover:text-slate-300 transition-colors" style={{ color: 'rgba(148,163,184,0.65)' }}>
              Terms of Service
            </a>
            {' '}and{' '}
            <a href="#" className="hover:text-slate-300 transition-colors" style={{ color: 'rgba(148,163,184,0.65)' }}>
              Privacy Policy
            </a>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
