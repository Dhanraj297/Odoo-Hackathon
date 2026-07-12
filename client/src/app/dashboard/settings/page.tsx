'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  Settings, User, Building2, Bell, Palette, Lock, Globe, ChevronRight,
  Moon, Sun, Check, Save, Camera, Shield, Key, Smartphone, Mail, Slack,
  AlertCircle
} from 'lucide-react';

const settingsSections = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'departments', label: 'Departments', icon: Building2 },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'security', label: 'Security & Privacy', icon: Lock },
];

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
  return (
    <motion.button
      onClick={onChange}
      className={`relative w-12 h-6 rounded-full transition-colors ${enabled ? 'bg-emerald-500' : 'bg-slate-700'}`}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm"
        animate={{ x: enabled ? 24 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </motion.button>
  );
}

function SettingRow({ label, description, enabled, onChange }: {
  label: string; description: string; enabled: boolean; onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-white/05 last:border-0">
      <div>
        <div className="text-sm font-medium text-white">{label}</div>
        <div className="text-xs text-slate-400 mt-0.5">{description}</div>
      </div>
      <Toggle enabled={enabled} onChange={onChange} />
    </div>
  );
}

const departments = [
  { name: 'Engineering', head: 'Sarah Chen', members: 45, esgScore: 78, color: '#10b981' },
  { name: 'Human Resources', head: 'Emma Williams', members: 18, esgScore: 94, color: '#3b82f6' },
  { name: 'Information Technology', head: 'Alex Kumar', members: 32, esgScore: 82, color: '#8b5cf6' },
  { name: 'Finance', head: 'Priya Sharma', members: 22, esgScore: 75, color: '#f59e0b' },
  { name: 'Operations', head: 'Jordan Lee', members: 60, esgScore: 72, color: '#ec4899' },
  { name: 'Marketing', head: 'Mike Johnson', members: 28, esgScore: 76, color: '#06b6d4' },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile');
  const [saved, setSaved] = useState(false);
  
  const [profile, setProfile] = useState({
    name: 'Emma Williams',
    email: 'emma.williams@ecosphere.com',
    role: 'HR Director',
    dept: 'Human Resources',
    bio: 'Passionate about sustainable business practices and employee well-being.',
    phone: '+1 (555) 234-5678',
  });

  const [notifs, setNotifs] = useState({
    emailAlerts: true,
    pushNotifs: true,
    complianceAlerts: true,
    goalUpdates: true,
    challengeReminders: false,
    weeklyDigest: true,
    slackIntegration: false,
    smsAlerts: false,
  });

  const [appearance, setAppearance] = useState({
    darkMode: true,
    compactMode: false,
    animations: true,
    language: 'en',
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center">
            <Settings size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Settings</h1>
            <p className="text-slate-400 text-sm">Manage your account and preferences</p>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar nav */}
        <motion.div
          className="glass-card p-3 h-fit"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          {settingsSections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeSection === section.id
                  ? 'bg-emerald-500/15 text-emerald-400 border-l-2 border-emerald-500'
                  : 'text-slate-400 hover:text-white hover:bg-white/05'
              }`}
            >
              <section.icon size={16} />
              {section.label}
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {/* Profile */}
            {activeSection === 'profile' && (
              <motion.div
                key="profile"
                className="glass-card p-8 space-y-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <h3 className="font-semibold text-white text-lg">Profile Information</h3>

                {/* Avatar */}
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-3xl font-black">
                      E
                    </div>
                    <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-slate-700 border border-white/10 flex items-center justify-center hover:bg-slate-600 transition-colors">
                      <Camera size={12} className="text-white" />
                    </button>
                  </div>
                  <div>
                    <div className="font-semibold text-white">{profile.name}</div>
                    <div className="text-sm text-slate-400">{profile.email}</div>
                    <button className="text-xs text-emerald-400 mt-1 hover:text-emerald-300 transition-colors">Change photo</button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { label: 'Full Name', key: 'name', type: 'text' },
                    { label: 'Email Address', key: 'email', type: 'email' },
                    { label: 'Job Title', key: 'role', type: 'text' },
                    { label: 'Department', key: 'dept', type: 'text' },
                    { label: 'Phone Number', key: 'phone', type: 'tel' },
                  ].map(field => (
                    <div key={field.key}>
                      <label className="text-xs font-medium text-slate-400 block mb-2">{field.label}</label>
                      <input
                        type={field.type}
                        value={(profile as any)[field.key]}
                        onChange={e => setProfile(prev => ({ ...prev, [field.key]: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl bg-white/04 border border-white/08 text-white placeholder-slate-500 text-sm outline-none focus:border-emerald-500/50 transition-colors"
                      />
                    </div>
                  ))}
                  <div className="md:col-span-2">
                    <label className="text-xs font-medium text-slate-400 block mb-2">Bio</label>
                    <textarea
                      value={profile.bio}
                      onChange={e => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl bg-white/04 border border-white/08 text-white placeholder-slate-500 text-sm outline-none focus:border-emerald-500/50 transition-colors resize-none"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Departments */}
            {activeSection === 'departments' && (
              <motion.div
                key="departments"
                className="glass-card p-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <h3 className="font-semibold text-white text-lg mb-6">Department Management</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {departments.map((dept, i) => (
                    <motion.div
                      key={dept.name}
                      className="p-4 rounded-xl border border-white/08 hover:border-emerald-500/30 transition-colors group"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }}
                      whileHover={{ y: -2 }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ background: dept.color }} />
                          <span className="font-semibold text-white text-sm">{dept.name}</span>
                        </div>
                        <span className="text-lg font-black" style={{ color: dept.color }}>{dept.esgScore}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>Head: {dept.head}</span>
                        <span>{dept.members} members</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Notifications */}
            {activeSection === 'notifications' && (
              <motion.div
                key="notifications"
                className="glass-card p-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <h3 className="font-semibold text-white text-lg mb-6">Notification Preferences</h3>
                
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">Channels</div>
                  <SettingRow label="Email Alerts" description="Receive notifications via email" enabled={notifs.emailAlerts} onChange={() => setNotifs(p => ({ ...p, emailAlerts: !p.emailAlerts }))} />
                  <SettingRow label="Push Notifications" description="Browser and mobile push notifications" enabled={notifs.pushNotifs} onChange={() => setNotifs(p => ({ ...p, pushNotifs: !p.pushNotifs }))} />
                  <SettingRow label="Slack Integration" description="Send notifications to your Slack workspace" enabled={notifs.slackIntegration} onChange={() => setNotifs(p => ({ ...p, slackIntegration: !p.slackIntegration }))} />
                  <SettingRow label="SMS Alerts" description="Critical alerts via text message" enabled={notifs.smsAlerts} onChange={() => setNotifs(p => ({ ...p, smsAlerts: !p.smsAlerts }))} />
                </div>

                <div className="mt-6 pt-6 border-t border-white/08 space-y-1">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">Alert Types</div>
                  <SettingRow label="Compliance Alerts" description="Get notified about compliance issues and deadlines" enabled={notifs.complianceAlerts} onChange={() => setNotifs(p => ({ ...p, complianceAlerts: !p.complianceAlerts }))} />
                  <SettingRow label="Goal Updates" description="Progress updates on environmental and social goals" enabled={notifs.goalUpdates} onChange={() => setNotifs(p => ({ ...p, goalUpdates: !p.goalUpdates }))} />
                  <SettingRow label="Challenge Reminders" description="Reminders for active sustainability challenges" enabled={notifs.challengeReminders} onChange={() => setNotifs(p => ({ ...p, challengeReminders: !p.challengeReminders }))} />
                  <SettingRow label="Weekly Digest" description="Weekly summary of ESG performance" enabled={notifs.weeklyDigest} onChange={() => setNotifs(p => ({ ...p, weeklyDigest: !p.weeklyDigest }))} />
                </div>
              </motion.div>
            )}

            {/* Appearance */}
            {activeSection === 'appearance' && (
              <motion.div
                key="appearance"
                className="glass-card p-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <h3 className="font-semibold text-white text-lg mb-6">Appearance</h3>

                {/* Theme selector */}
                <div className="mb-6">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest block mb-3">Theme</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'dark', label: 'Dark Mode', icon: Moon, preview: 'bg-slate-900' },
                      { id: 'light', label: 'Light Mode', icon: Sun, preview: 'bg-white' },
                    ].map(theme => (
                      <button
                        key={theme.id}
                        onClick={() => setAppearance(p => ({ ...p, darkMode: theme.id === 'dark' }))}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          (appearance.darkMode ? theme.id === 'dark' : theme.id === 'light')
                            ? 'border-emerald-500 bg-emerald-500/10'
                            : 'border-white/08 hover:border-white/20'
                        }`}
                      >
                        <div className={`w-full h-16 rounded-lg mb-3 ${theme.preview} border border-white/10`} />
                        <div className="flex items-center gap-2 text-white text-sm font-medium">
                          <theme.icon size={14} /> {theme.label}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <SettingRow label="Compact Mode" description="Reduce spacing for denser information display" enabled={appearance.compactMode} onChange={() => setAppearance(p => ({ ...p, compactMode: !p.compactMode }))} />
                  <SettingRow label="Animations" description="Enable smooth page transitions and micro-animations" enabled={appearance.animations} onChange={() => setAppearance(p => ({ ...p, animations: !p.animations }))} />
                </div>

                <div className="mt-6">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest block mb-3">Language</label>
                  <select
                    value={appearance.language}
                    onChange={e => setAppearance(p => ({ ...p, language: e.target.value }))}
                    className="px-4 py-3 rounded-xl bg-white/04 border border-white/08 text-white text-sm outline-none focus:border-emerald-500/50 transition-colors"
                  >
                    <option value="en">English (US)</option>
                    <option value="en-gb">English (UK)</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                  </select>
                </div>
              </motion.div>
            )}

            {/* Security */}
            {activeSection === 'security' && (
              <motion.div
                key="security"
                className="glass-card p-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <h3 className="font-semibold text-white text-lg mb-6">Security & Privacy</h3>
                
                <div className="space-y-4">
                  {[
                    { icon: Key, title: 'Change Password', desc: 'Last changed 3 months ago', action: 'Update' },
                    { icon: Smartphone, title: 'Two-Factor Authentication', desc: 'Add an extra layer of security', action: 'Enable' },
                    { icon: Shield, title: 'Active Sessions', desc: '2 active sessions across devices', action: 'Manage' },
                    { icon: AlertCircle, title: 'Data Export', desc: 'Request a copy of your data', action: 'Export' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.title}
                      className="flex items-center justify-between p-4 rounded-xl border border-white/08 hover:border-white/15 transition-colors"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/06 flex items-center justify-center">
                          <item.icon size={18} className="text-slate-400" />
                        </div>
                        <div>
                          <div className="font-medium text-white text-sm">{item.title}</div>
                          <div className="text-xs text-slate-400">{item.desc}</div>
                        </div>
                      </div>
                      <button className="px-4 py-2 text-xs rounded-lg border border-white/10 text-slate-300 hover:text-white hover:bg-white/05 transition-colors">
                        {item.action}
                      </button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Save Button */}
          <motion.div
            className="fixed bottom-8 right-8 z-50"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, delay: 0.5 }}
          >
            <motion.button
              onClick={handleSave}
              className={`btn-primary flex items-center gap-2 px-6 py-3 shadow-glow-emerald ${saved ? 'bg-gradient-to-r from-emerald-400 to-teal-500' : ''}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {saved ? (
                  <motion.span
                    key="saved"
                    className="flex items-center gap-2"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                  >
                    <Check size={16} /> Saved!
                  </motion.span>
                ) : (
                  <motion.span
                    key="save"
                    className="flex items-center gap-2"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                  >
                    <Save size={16} /> Save Changes
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
