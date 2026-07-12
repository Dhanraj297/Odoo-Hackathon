import React from 'react';

const Settings = () => {
  return (
    <div className="fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-header-title">System Settings</h1>
          <p className="page-header-subtitle">Configure ESG weighting and platform behavior</p>
        </div>
        <button className="btn btn-primary">Save Changes</button>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <div className="card-title">Score Weighting</div>
          </div>
          <div className="form-group">
            <label className="form-label">Environmental Weight (%)</label>
            <input type="number" className="form-input" defaultValue={40} />
          </div>
          <div className="form-group">
            <label className="form-label">Social Weight (%)</label>
            <input type="number" className="form-input" defaultValue={30} />
          </div>
          <div className="form-group">
            <label className="form-label">Governance Weight (%)</label>
            <input type="number" className="form-input" defaultValue={30} />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">Feature Toggles</div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>Auto Emission Calculation</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Automatically compute CO2 from ERP transactions</div>
            </div>
            <input type="checkbox" defaultChecked style={{ transform: 'scale(1.5)' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>Strict Evidence Requirement</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Require files for CSR/Challenge approval</div>
            </div>
            <input type="checkbox" defaultChecked style={{ transform: 'scale(1.5)' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>Badge Auto-Award</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Automatically grant badges when rules are met</div>
            </div>
            <input type="checkbox" defaultChecked style={{ transform: 'scale(1.5)' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
