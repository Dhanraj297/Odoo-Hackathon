'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Leaf, ArrowRight, Lock, Mail, Sparkles, Globe2 } from 'lucide-react';

function AnimatedBlob({ color, style }: { color: string; style: React.CSSProperties }) {
  return (
    <motion.div
      className="absolute rounded-full blur-[80px] opacity-20 pointer-events-none"
      style={{ background: color, ...style }}
      animate={{
        scale: [1, 1.3, 1],
        x: [0, 30, 0],
        y: [0, -20, 0],
      }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

function InputField({
  label, icon: Icon, type = 'text', placeholder, value, onChange
}: {
  label: string; icon: React.ElementType; type?: string;
  placeholder: string; value: string; onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-300">{label}</label>
      <motion.div
        className="relative"
        animate={{ scale: focused ? 1.01 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <Icon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type={isPassword && showPass ? 'text' : type}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full pl-11 pr-4 py-3.5 rounded-xl text-white placeholder-slate-500 text-sm transition-all duration-200 outline-none"
          style={{
            background: focused ? 'rgba(16,185,129,0.08)' : 'rgba(255,255,255,0.04)',
            border: `1px solid ${focused ? 'rgba(16,185,129,0.5)' : 'rgba(255,255,255,0.08)'}`,
            boxShadow: focused ? '0 0 0 3px rgba(16,185,129,0.1)' : 'none',
          }}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPass(v => !v)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
          >
            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#030712] flex overflow-hidden">
      {/* Left Panel - Illustration */}
      <motion.div
        className="hidden lg:flex flex-1 relative items-center justify-center p-12"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden">
          <AnimatedBlob color="#10b981" style={{ width: 400, height: 400, top: '10%', left: '10%' }} />
          <AnimatedBlob color="#3b82f6" style={{ width: 300, height: 300, bottom: '20%', right: '10%' }} />
          <AnimatedBlob color="#8b5cf6" style={{ width: 200, height: 200, top: '60%', left: '20%' }} />
        </div>
        
        <div className="relative z-10 text-center max-w-lg">
          {/* Logo */}
          <motion.div
            className="flex items-center justify-center gap-3 mb-12"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-glow-emerald">
              <Leaf size={24} className="text-white" />
            </div>
            <span className="text-3xl font-black text-white">EcoSphere</span>
          </motion.div>
          
          {/* Globe animation */}
          <motion.div
            className="w-56 h-56 mx-auto mb-10 rounded-full"
            style={{
              background: 'radial-gradient(circle at 35% 35%, #22d3ee, #1d4ed8 40%, #0f172a)',
              boxShadow: '0 0 60px rgba(16, 185, 129, 0.3), 0 0 120px rgba(59, 130, 246, 0.15)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <svg viewBox="0 0 200 200" className="w-full h-full opacity-50">
              <ellipse cx="60" cy="80" rx="25" ry="30" fill="#10b981"/>
              <ellipse cx="90" cy="70" rx="15" ry="20" fill="#10b981"/>
              <ellipse cx="130" cy="90" rx="20" ry="25" fill="#10b981"/>
              <ellipse cx="80" cy="130" rx="18" ry="15" fill="#10b981"/>
            </svg>
          </motion.div>
          
          <motion.h2
            className="text-4xl font-black text-white mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Manage Your <span className="gradient-text">Sustainability</span> Journey
          </motion.h2>
          <motion.p
            className="text-slate-400 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Track ESG metrics, engage your team, and drive real environmental impact.
          </motion.p>

          {/* Feature bullets */}
          <motion.div
            className="mt-8 space-y-3 text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {[
              'Real-time carbon emission tracking',
              'Employee gamification & rewards',
              'AI-powered ESG insights',
              'Compliance & audit management',
            ].map((feat, i) => (
              <div key={i} className="flex items-center gap-3 text-slate-300">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                {feat}
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Right Panel - Login Form */}
      <motion.div
        className="flex-1 lg:max-w-[520px] flex items-center justify-center p-8 relative"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <AnimatedBlob color="#10b981" style={{ width: 250, height: 250, top: '-10%', right: '-10%' }} />
          <AnimatedBlob color="#8b5cf6" style={{ width: 200, height: 200, bottom: '-5%', left: '-5%' }} />
        </div>

        <div className="relative w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <Leaf size={16} className="text-white" />
            </div>
            <span className="font-bold text-xl text-white">EcoSphere</span>
          </div>

          {/* Glass card */}
          <motion.div
            className="glass-card p-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 mb-4">
                <Sparkles size={12} /> Welcome back
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Sign in to EcoSphere</h1>
              <p className="text-slate-400 text-sm">
                Don't have an account?{' '}
                <a href="#" className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium">
                  Get started free
                </a>
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <InputField
                label="Email address"
                icon={Mail}
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={setEmail}
              />
              <InputField
                label="Password"
                icon={Lock}
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={setPassword}
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <div
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all cursor-pointer ${
                      remember ? 'bg-emerald-500 border-emerald-500' : 'border-slate-600'
                    }`}
                    onClick={() => setRemember(v => !v)}
                  >
                    {remember && <div className="w-2.5 h-2.5 bg-white rounded-sm" />}
                  </div>
                  <span className="text-sm text-slate-400">Remember me</span>
                </label>
                <a href="#" className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors">
                  Forgot password?
                </a>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-4 text-base font-semibold flex items-center justify-center gap-2 relative overflow-hidden"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Signing in...
                    </motion.div>
                  ) : (
                    <motion.div
                      key="default"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      Sign in <ArrowRight size={18} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              <div className="relative flex items-center my-2">
                <div className="flex-1 h-px bg-slate-700" />
                <span className="px-4 text-xs text-slate-500">or continue with</span>
                <div className="flex-1 h-px bg-slate-700" />
              </div>

              <motion.button
                type="button"
                className="w-full py-3.5 rounded-xl border border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white transition-all flex items-center justify-center gap-3 text-sm font-medium"
                whileHover={{ scale: 1.01, background: 'rgba(255,255,255,0.03)' }}
                whileTap={{ scale: 0.99 }}
                onClick={() => router.push('/dashboard')}
              >
                <Globe2 size={18} />
                Continue with Google
              </motion.button>
            </form>
          </motion.div>

          <p className="text-center text-xs text-slate-600 mt-6">
            By signing in, you agree to our{' '}
            <a href="#" className="text-slate-500 hover:text-slate-400">Terms</a>
            {' '}and{' '}
            <a href="#" className="text-slate-500 hover:text-slate-400">Privacy Policy</a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
