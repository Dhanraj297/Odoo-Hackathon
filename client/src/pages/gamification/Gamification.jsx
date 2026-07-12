import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

const Gamification = () => {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState([]);
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [lbData, chData] = await Promise.all([
        api.get('/leaderboard'),
        api.get('/challenges')
      ]);
      setLeaderboard(lbData.data);
      setChallenges(chData.data);
    } catch (err) { }
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-header-title">Gamification Hub</h1>
          <p className="page-header-subtitle">Earn XP, complete challenges, and top the leaderboard</p>
        </div>
      </div>

      {/* User XP Bar */}
      <div className="card-glass" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ fontWeight: 600 }}>Level {user?.level || 1}</span>
          <span style={{ color: 'var(--accent-purple)', fontWeight: 800 }}>{user?.xp || 0} XP</span>
        </div>
        <div className="xp-bar-container">
          <div className="xp-bar-fill" style={{ width: `${Math.min(100, ((user?.xp || 0) % 1000) / 10)}%` }}></div>
        </div>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem', textAlign: 'right' }}>
          {1000 - ((user?.xp || 0) % 1000)} XP to next level
        </p>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <div className="card-title">Active Challenges</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {challenges.filter(c => c.status === 'Active').map(c => (
              <div key={c._id} className="challenge-card">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className={`challenge-difficulty difficulty-${c.difficulty.toLowerCase()}`}>{c.difficulty}</span>
                  <span style={{ color: 'var(--accent-purple)', fontWeight: 800, fontSize: '0.9rem' }}>+{c.xp} XP</span>
                </div>
                <h4 style={{ margin: '0.5rem 0' }}>{c.title}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{c.description}</p>
                <button className="btn btn-secondary btn-sm" style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }}>Join Challenge</button>
              </div>
            ))}
            {challenges.filter(c => c.status === 'Active').length === 0 && (
              <div className="empty-state" style={{ padding: '2rem 1rem' }}>
                <div className="empty-state-text">No active challenges right now.</div>
              </div>
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">Leaderboard</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {leaderboard.map((lbUser, idx) => (
              <div key={lbUser._id} className="leaderboard-item">
                <div className={`leaderboard-rank rank-${idx + 1 > 3 ? 'other' : idx + 1}`}>
                  {idx + 1}
                </div>
                <div className="avatar avatar-sm">{lbUser.name.charAt(0).toUpperCase()}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{lbUser.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{lbUser.department?.name || 'N/A'}</div>
                </div>
                <div style={{ fontWeight: 800, color: 'var(--accent-purple)' }}>{lbUser.xp} XP</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gamification;
