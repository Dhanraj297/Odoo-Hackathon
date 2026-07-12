import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ collapsed }) => {
  const { user } = useAuth();
  
  const navItems = [
    { section: 'Overview', items: [{ label: 'Dashboard', path: '/', icon: '📊' }] },
    { 
      section: 'Modules', 
      items: [
        { label: 'Environmental', path: '/environmental', icon: '🌱' },
        { label: 'Social (CSR)', path: '/social', icon: '🤝' },
        { label: 'Governance', path: '/governance', icon: '⚖️' },
        { label: 'Gamification', path: '/gamification', icon: '🎮' }
      ]
    },
    { section: 'Analytics', items: [{ label: 'Reports', path: '/reports', icon: '📈' }] }
  ];

  if (user?.role === 'admin' || user?.role === 'hr_manager') {
    navItems.push({ section: 'Administration', items: [{ label: 'Settings', path: '/settings', icon: '⚙️' }] });
  }

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">🌍</div>
        {!collapsed && <div className="sidebar-logo-text">EcoSphere</div>}
      </div>

      <nav className="sidebar-nav">
        {navItems.map((group, idx) => (
          <div key={idx}>
            {!collapsed && <div className="nav-section-title">{group.section}</div>}
            {group.items.map(item => (
              <NavLink 
                key={item.path} 
                to={item.path} 
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                title={collapsed ? item.label : ''}
              >
                <span className="nav-item-icon">{item.icon}</span>
                {!collapsed && <span className="nav-item-label">{item.label}</span>}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        {/* Could put quick stats or user level here */}
        {!collapsed && (
          <div style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Level {user?.level || 1} • {user?.xp || 0} XP
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
