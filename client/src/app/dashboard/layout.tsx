'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Leaf, LayoutDashboard, Wind, Users, Shield, Zap, BarChart3,
  Settings, Bell, Search, Moon, Sun, ChevronLeft, LogOut,
  Command, X, User, Menu
} from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { notifications } from '@/lib/mockData';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Wind, label: 'Environmental', href: '/dashboard/environmental' },
  { icon: Users, label: 'Social', href: '/dashboard/social' },
  { icon: Shield, label: 'Governance', href: '/dashboard/governance' },
  { icon: Zap, label: 'Gamification', href: '/dashboard/gamification' },
  { icon: BarChart3, label: 'Reports', href: '/dashboard/reports' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const commands = [
    { label: 'Go to Dashboard', href: '/dashboard' },
    { label: 'View Environmental', href: '/dashboard/environmental' },
    { label: 'View Social', href: '/dashboard/social' },
    { label: 'View Governance', href: '/dashboard/governance' },
    { label: 'Gamification', href: '/dashboard/gamification' },
    { label: 'Reports', href: '/dashboard/reports' },
    { label: 'Settings', href: '/dashboard/settings' },
  ].filter(c => c.label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50 modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed top-1/4 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg glass-card p-2"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
              <Search size={16} className="text-slate-400" />
              <input
                autoFocus
                placeholder="Search commands..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder-slate-500 outline-none text-sm"
              />
              <kbd className="text-xs text-slate-500 border border-slate-700 px-2 py-0.5 rounded">ESC</kbd>
            </div>
            <div className="py-2 max-h-64 overflow-auto">
              {commands.map(cmd => (
                <button
                  key={cmd.href}
                  onClick={() => { router.push(cmd.href); onClose(); }}
                  className="w-full text-left px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-emerald-500/10 rounded-lg transition-colors"
                >
                  {cmd.label}
                </button>
              ))}
              {commands.length === 0 && (
                <p className="text-center text-slate-500 text-sm py-6">No results found</p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function NotificationPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const unread = notifications.filter(n => !n.read).length;
  const typeColors: Record<string, string> = {
    success: '#10b981', warning: '#f59e0b', info: '#3b82f6', error: '#ef4444',
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={onClose} />
          <motion.div
            className="absolute top-full right-0 mt-2 w-80 glass-card z-50 overflow-hidden"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <h3 className="font-semibold text-white">Notifications</h3>
              {unread > 0 && (
                <span className="text-xs bg-emerald-500 text-white px-2 py-0.5 rounded-full">{unread} new</span>
              )}
            </div>
            <div className="max-h-80 overflow-auto">
              {notifications.map(n => (
                <div key={n.id} className={`p-4 border-b border-white/05 hover:bg-white/03 transition-colors ${!n.read ? 'bg-emerald-500/03' : ''}`}>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: typeColors[n.type] }} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-white">{n.title}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{n.message}</div>
                    </div>
                    <span className="text-xs text-slate-500 whitespace-nowrap">{n.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandOpen(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const sidebarWidth = collapsed ? 72 : 240;

  return (
    <div className={`min-h-screen flex ${theme === 'dark' ? 'dark bg-[#0a0f1e]' : 'bg-slate-50'}`}>
      {/* Command Palette */}
      <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} />

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/60 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`fixed top-0 left-0 h-full z-40 flex flex-col border-r ${
          theme === 'dark' ? 'bg-[#080d1a] border-white/[0.05]' : 'bg-white border-slate-200'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} transition-transform lg:transition-none`}
        animate={{ width: sidebarWidth }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Logo */}
        <div className="p-4 flex items-center gap-3 border-b border-white/[0.05]">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0 shadow-glow-emerald">
            <Leaf size={16} className="text-white" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                className="font-bold text-lg text-white whitespace-nowrap"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                EcoSphere
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map(item => {
            const isActive = pathname === item.href || 
              (item.href !== '/dashboard' && pathname.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  className={`sidebar-item flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer ${
                    isActive
                      ? 'bg-emerald-500/15 text-emerald-400 border-l-2 border-emerald-500'
                      : theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                  whileTap={{ scale: 0.97 }}
                >
                  <item.icon size={18} className="flex-shrink-0" />
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        className="text-sm font-medium whitespace-nowrap"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="p-3 border-t border-white/[0.05]">
          {/* Collapse button */}
          <button
            onClick={() => setCollapsed(v => !v)}
            className={`hidden lg:flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/05 transition-all mb-2`}
          >
            <motion.div animate={{ rotate: collapsed ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronLeft size={18} />
            </motion.div>
            {!collapsed && <span className="text-sm">Collapse</span>}
          </button>

          {/* User */}
          <div className={`flex items-center gap-3 px-2 py-2 rounded-xl ${theme === 'dark' ? 'hover:bg-white/05' : 'hover:bg-slate-100'} transition-colors cursor-pointer`}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0 text-white font-semibold text-sm">
              E
            </div>
            <AnimatePresence>
              {!collapsed && (
                <motion.div
                  className="min-w-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="text-sm font-medium text-white truncate">Emma Williams</div>
                  <div className="text-xs text-slate-500 truncate">HR Director</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0" style={{ marginLeft: sidebarWidth }}>
        {/* Top Navbar */}
        <header className={`sticky top-0 z-30 h-16 border-b flex items-center px-6 gap-4 ${
          theme === 'dark' ? 'bg-[#0a0f1e]/80 border-white/[0.05]' : 'bg-white/80 border-slate-200'
        } backdrop-blur-xl`}>
          {/* Mobile menu */}
          <button className="lg:hidden" onClick={() => setMobileOpen(v => !v)}>
            <Menu size={20} className="text-slate-400" />
          </button>

          {/* Search */}
          <button
            className={`flex-1 max-w-sm flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-slate-400 hover:text-slate-300 border transition-colors ${
              theme === 'dark' ? 'bg-white/03 border-white/08 hover:bg-white/05' : 'bg-slate-100 border-slate-200'
            }`}
            onClick={() => setCommandOpen(true)}
          >
            <Search size={14} />
            <span>Search anything...</span>
            <kbd className="ml-auto text-xs border border-slate-700 text-slate-500 px-1.5 py-0.5 rounded">
              ⌘K
            </kbd>
          </button>

          <div className="flex items-center gap-2 ml-auto">
            {/* Theme toggle */}
            <motion.button
              onClick={toggleTheme}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                theme === 'dark' ? 'text-slate-400 hover:text-white hover:bg-white/05' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>

            {/* Notifications */}
            <div className="relative">
              <motion.button
                onClick={() => setNotifOpen(v => !v)}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors relative ${
                  theme === 'dark' ? 'text-slate-400 hover:text-white hover:bg-white/05' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <motion.span
                    className="absolute top-1 right-1 w-4 h-4 bg-emerald-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                  >
                    {unreadCount}
                  </motion.span>
                )}
              </motion.button>
              <NotificationPanel open={notifOpen} onClose={() => setNotifOpen(false)} />
            </div>

            {/* Profile */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center cursor-pointer text-white font-semibold text-sm">
              E
            </div>
          </div>
        </header>

        {/* Page Content */}
        <motion.main
          key={pathname}
          className="flex-1 overflow-auto"
          style={{ padding: '32px' }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            {children}
          </div>
        </motion.main>
      </div>
    </div>
  );
}
