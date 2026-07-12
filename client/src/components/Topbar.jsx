import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { io } from 'socket.io-client';

const Topbar = ({ collapsed, setCollapsed }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [showNotifs, setShowNotifs] = useState(false);

  useEffect(() => {
    if (user) {
      fetchNotifications();
      const socket = io('http://localhost:5000');
      socket.emit('join', user._id);
      socket.on('notification', (newNotif) => {
        setNotifications((prev) => [newNotif, ...prev]);
      });
      return () => socket.disconnect();
    }
  }, [user]);

  const fetchNotifications = async () => {
    try {
      const { data } = await api.get('/notifications');
      setNotifications(data);
    } catch (err) { console.error('Failed to load notifications'); }
  };

  const markAsRead = async (id) => {
    try {
      await api.put(`/notifications/${id}/read`);
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
    } catch (err) { }
  };

  const markAllRead = async () => {
    try {
      await api.put('/notifications/mark-all-read');
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    } catch (err) { }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <header className={`topbar ${collapsed ? 'collapsed' : ''}`}>
      <div className="topbar-left">
        <button className="btn-ghost" onClick={() => setCollapsed(!collapsed)} style={{ fontSize: '1.2rem' }}>
          ☰
        </button>
        <div>
          <div className="page-title">Welcome back, {user?.name.split(' ')[0]}</div>
        </div>
      </div>
      
      <div className="topbar-right">
        {/* Points Display */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-secondary)', padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-full)' }}>
          <span style={{ color: 'var(--accent-amber)', fontWeight: '800' }}>{user?.points || 0}</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>PTS</span>
        </div>

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button className="btn-ghost" onClick={() => setShowNotifs(!showNotifs)} style={{ position: 'relative', fontSize: '1.2rem' }}>
            🔔
            {unreadCount > 0 && <span className="notif-badge">{unreadCount}</span>}
          </button>
          
          {showNotifs && (
            <div className="notif-dropdown">
              <div className="notif-header">
                <strong>Notifications</strong>
                {unreadCount > 0 && (
                  <button onClick={markAllRead} style={{ background: 'none', border: 'none', color: 'var(--accent-green)', cursor: 'pointer', fontSize: '0.8rem' }}>Mark all read</button>
                )}
              </div>
              <div className="notif-list">
                {notifications.length === 0 ? (
                  <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)' }}>No notifications</div>
                ) : (
                  notifications.map(n => (
                    <div key={n._id} className={`notif-item ${!n.isRead ? 'unread' : ''}`} onClick={() => markAsRead(n._id)}>
                      <div className="notif-item-title">{n.title}</div>
                      <div className="notif-item-msg">{n.message}</div>
                      <div className="notif-item-time">{new Date(n.createdAt).toLocaleString()}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} onClick={() => { logout(); navigate('/login'); }}>
          <div className="avatar">
            {user?.name.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
