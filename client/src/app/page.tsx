'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Leaf, Wind, Users, Award, ChevronRight, ArrowRight, 
  Star, Globe, Shield, Zap, TrendingUp, BarChart3,
  Play, Check, Sparkles, TreePine, Droplets, Sun
} from 'lucide-react';
import CountUp from 'react-countup';
import EarthIllustration from '@/components/EarthIllustration';

// ─── Particle component ────────────────────────────────────────────────────────
function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 6 + 2,
            height: Math.random() * 6 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 3 === 0 ? '#10b981' : i % 3 === 1 ? '#3b82f6' : '#8b5cf6',
            opacity: 0.4,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// ─── Floating leaves ────────────────────────────────────────────────────────────
function FloatingLeaves() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            rotate: [-15, 15, -15],
            scale: [0.8, 1.1, 0.8],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.4,
            ease: 'easeInOut',
          }}
        >
          {['🌿', '🍃', '🌱', '🌾', '🍀', '🌺', '🌸', '✨'][i]}
        </motion.div>
      ))}
    </div>
  );
}

// EarthIllustration is imported from @/components/EarthIllustration

// ─── Stat counter card ─────────────────────────────────────────────────────────
function StatCard({ icon: Icon, value, suffix, label, color }: {
  icon: React.ElementType; value: number; suffix: string; label: string; color: string;
}) {
  return (
    <motion.div
      className="glass-card p-10 text-center hover-lift flex flex-col items-center w-full"
      className="glass-card p-12 text-center hover-lift flex flex-col items-center w-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-20 h-20 rounded-2xl mx-auto mb-8 flex items-center justify-center"
        style={{ background: `${color}22` }}>
        <Icon size={40} style={{ color }} />
      </div>
      <div className="text-5xl font-black text-white mb-3 tracking-tight">
        <CountUp end={value} duration={2.5} separator="," enableScrollSpy scrollSpyOnce />
        {suffix}
      </div>
      <div className="text-slate-400 text-sm font-medium tracking-wide">{label}</div>
    </motion.div>
  );
}

// ─── Feature card ──────────────────────────────────────────────────────────────
function FeatureCard({ icon: Icon, title, description, gradient, delay }: {
  icon: React.ElementType; title: string; description: string; gradient: string; delay: number;
}) {
  return (
    <motion.div
      className="glass-card p-10 hover-lift group cursor-pointer flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.02 }}
    >
      <div className={`w-16 h-16 rounded-2xl mb-7 flex items-center justify-center bg-gradient-to-br ${gradient} shadow-lg`}>
        <Icon size={30} className="text-white" />
      </div>
      <h3 className="text-xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors">{title}</h3>
      <p className="text-slate-400 leading-relaxed text-sm">{description}</p>
      <div className="mt-8 flex items-center justify-center text-emerald-400 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity gap-1">
        Learn more <ArrowRight size={15} />
      </div>
    </motion.div>
  );
}

// ─── Navbar ────────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-premium py-3' : 'py-5'
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-glow-emerald">
            <Leaf size={18} className="text-white" />
          </div>
          <span className="font-bold text-xl text-white">EcoSphere</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-slate-300 text-sm">
          {['Platform', 'Environmental', 'Social', 'Governance', 'Pricing'].map(item => (
            <a key={item} href="#" className="hover:text-emerald-400 transition-colors">{item}</a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link href="/auth/login">
            <button className="text-slate-300 hover:text-white text-sm transition-colors px-4 py-2">
              Sign In
            </button>
          </Link>
          <Link href="/dashboard">
            <button className="btn-primary text-sm px-5 py-2.5">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}

// ─── MAIN LANDING PAGE ─────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        {/* Glow Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/10 blur-[100px] rounded-full" />
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-blue-500/08 blur-[80px] rounded-full" />
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[300px] bg-purple-500/08 blur-[80px] rounded-full" />
        </div>
        
        <Particles />
        <FloatingLeaves />

        <div className="relative container grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 text-sm text-emerald-400 border border-emerald-500/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Sparkles size={14} />
              <span>AI-Powered ESG Intelligence Platform</span>
            </motion.div>
            
            <motion.h1
              className="text-5xl lg:text-7xl font-black leading-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Build a{' '}
              <span className="gradient-text">Sustainable</span>
              {' '}Future with EcoSphere
            </motion.h1>
            
            <motion.p
              className="text-lg text-slate-400 mb-10 max-w-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              The enterprise ESG platform that turns sustainability goals into measurable impact. 
              Track carbon, engage employees, ensure compliance — all in one beautiful dashboard.
            </motion.p>
            
            <motion.div
              className="flex flex-wrap gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <Link href="/dashboard">
                <motion.button
                  className="btn-primary flex items-center gap-2 px-8 py-4 text-base shadow-glow-emerald"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  View Dashboard <ArrowRight size={18} />
                </motion.button>
              </Link>
              <motion.button
                className="flex items-center gap-2 px-8 py-4 text-base rounded-xl border border-slate-700 text-slate-300 hover:border-emerald-500/50 hover:text-emerald-400 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Play size={16} /> Watch Demo
              </motion.button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              className="flex items-center gap-6 text-sm text-slate-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {['GRI Aligned', 'ISO 14001', 'TCFD Ready', 'SOC 2'].map(badge => (
                <div key={badge} className="flex items-center gap-1.5">
                  <Check size={14} className="text-emerald-500" />
                  {badge}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Earth Illustration */}
          <motion.div
            className="relative flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <EarthIllustration />
            </div>
            
            {/* Floating stat cards around earth */}
            <motion.div
              className="absolute top-4 -left-8 glass-card px-4 py-3 text-sm"
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="text-emerald-400 font-bold">↓ 24%</div>
              <div className="text-slate-400 text-xs">Carbon Reduced</div>
            </motion.div>
            <motion.div
              className="absolute bottom-8 -right-4 glass-card px-4 py-3 text-sm"
              animate={{ y: [5, -5, 5] }}
              transition={{ duration: 3.5, repeat: Infinity }}
            >
              <div className="text-blue-400 font-bold">ESG 82</div>
              <div className="text-slate-400 text-xs">Overall Score</div>
            </motion.div>
            <motion.div
              className="absolute top-1/2 -right-12 glass-card px-4 py-3 text-sm"
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="text-purple-400 font-bold">2,450</div>
              <div className="text-slate-400 text-xs">Employees</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 relative">
        <div className="container">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-5">
              Real Impact. <span className="gradient-text">Measurable Results.</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-base leading-relaxed">
              Trusted by forward-thinking enterprises worldwide to drive meaningful sustainability outcomes.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCard icon={Wind}     value={48200} suffix=" t"    label="Carbon Saved (tCO₂e)" color="#10b981" />
            <StatCard icon={Users}    value={2450}  suffix="+"     label="Active Employees"    color="#3b82f6" />
            <StatCard icon={TreePine} value={127}   suffix=""      label="CSR Events Run"       color="#f59e0b" />
            <StatCard icon={Award}    value={82}    suffix="/100"  label="Avg. ESG Score"       color="#8b5cf6" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 relative">
        <div className="container">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-emerald-400 text-sm font-semibold uppercase tracking-widest mb-4 block">Platform Modules</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-5">
              Everything You Need for <span className="gradient-text">ESG Excellence</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
              Four powerful modules that work together to create a complete sustainability ecosystem for your organization.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard icon={Wind}   title="Environmental" description="Track carbon emissions, manage environmental goals, and monitor your Scope 1, 2, and 3 footprint with precision." gradient="from-emerald-500 to-teal-600" delay={0} />
            <FeatureCard icon={Users}  title="Social"         description="Manage CSR activities, employee participation, diversity metrics, and community impact at scale."           gradient="from-blue-500 to-cyan-600"    delay={0.1} />
            <FeatureCard icon={Shield} title="Governance"     description="Policy management, compliance tracking, audit trails, and risk dashboards to stay always audit-ready."     gradient="from-violet-500 to-purple-600" delay={0.2} />
            <FeatureCard icon={Zap}    title="Gamification"   description="Boost engagement with XP, badges, leaderboards, and challenges that make sustainability fun and rewarding." gradient="from-amber-500 to-orange-600"   delay={0.3} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[300px] bg-emerald-500/10 blur-[100px] rounded-full" />
        </div>
        <div className="relative w-full max-w-4xl mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-black text-white mb-6">
              Ready to Lead with <span className="gradient-text">Purpose</span>?
            </h2>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
              Join hundreds of companies using EcoSphere to build a sustainable future. 
              Start your free trial today — no credit card required.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/dashboard">
                <motion.button
                  className="btn-primary px-10 py-4 text-lg shadow-glow-emerald flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  View Dashboard <ChevronRight size={20} />
                </motion.button>
              </Link>
              <Link href="/auth/login">
                <motion.button
                  className="px-10 py-4 text-lg rounded-xl border border-slate-700 text-slate-300 hover:border-emerald-500/50 hover:text-white transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Schedule Demo
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <Leaf size={16} className="text-white" />
            </div>
            <span className="font-bold text-white">EcoSphere</span>
          </div>
          <p className="text-slate-500 text-sm">
            © 2024 EcoSphere ESG Platform. Built for a sustainable tomorrow.
          </p>
          <div className="flex gap-6 text-slate-500 text-sm">
            {['Privacy', 'Terms', 'Contact'].map(link => (
              <a key={link} href="#" className="hover:text-emerald-400 transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
