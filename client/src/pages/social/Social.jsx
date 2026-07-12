import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { toast } from 'react-hot-toast';

const Social = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await api.get('/csr-activities');
      setActivities(data);
    } catch (err) { toast.error('Failed to fetch data'); } finally { setLoading(false); }
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-header-title">Social (CSR) Module</h1>
          <p className="page-header-subtitle">Manage CSR activities and employee participation</p>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-primary">+ Create Activity</button>
        </div>
      </div>

      <div className="grid-3">
        {loading ? (
          <div className="loading-center" style={{ gridColumn: 'span 3' }}><div className="spinner"></div></div>
        ) : activities.length === 0 ? (
          <div className="empty-state" style={{ gridColumn: 'span 3' }}>
            <div className="empty-state-icon">🤝</div>
            <div className="empty-state-title">No CSR Activities Yet</div>
            <div className="empty-state-text">Create your first social activity to engage employees.</div>
          </div>
        ) : (
          activities.map(act => (
            <div className="card" key={act._id}>
              <div className="card-header" style={{ marginBottom: '0.5rem' }}>
                <span className={`pill ${act.status === 'upcoming' ? 'pill-blue' : act.status === 'completed' ? 'pill-green' : 'pill-amber'}`}>
                  {act.status.toUpperCase()}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-amber)', fontWeight: 600 }}>{act.pointsReward} PTS</span>
              </div>
              <h3 style={{ marginBottom: '0.5rem' }}>{act.title}</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{act.description}</p>
              <div className="divider"></div>
              <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                View & Join
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Social;
