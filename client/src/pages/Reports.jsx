import React, { useState } from 'react';

const Reports = () => {
  return (
    <div className="fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-header-title">Analytics & Reports</h1>
          <p className="page-header-subtitle">Generate and export ESG compliance reports</p>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <div className="card-title">Environmental Report</div>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Comprehensive overview of carbon emissions, factor analysis, and progress against environmental goals.
          </p>
          <button className="btn btn-secondary">Generate PDF</button>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">Social Impact Report</div>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            CSR activities breakdown, employee participation rates, and diversity metrics.
          </p>
          <button className="btn btn-secondary">Generate PDF</button>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">Governance & Compliance</div>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Audit findings, compliance issue tracking, and policy acknowledgement statistics.
          </p>
          <button className="btn btn-secondary">Generate PDF</button>
        </div>

        <div className="card" style={{ background: 'var(--accent-green-glow)', borderColor: 'var(--accent-green)' }}>
          <div className="card-header">
            <div className="card-title" style={{ color: 'var(--accent-green)' }}>Full ESG Summary</div>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            The complete integrated report across all three dimensions for stakeholder distribution.
          </p>
          <button className="btn btn-primary">Export Full Report</button>
        </div>
      </div>
    </div>
  );
};

export default Reports;
