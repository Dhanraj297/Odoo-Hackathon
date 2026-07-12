import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { toast } from 'react-hot-toast';

const Governance = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await api.get('/compliance-issues');
      setIssues(data);
    } catch (err) { toast.error('Failed to fetch data'); } finally { setLoading(false); }
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-header-title">Governance Module</h1>
          <p className="page-header-subtitle">Audits, policies, and compliance issue tracking</p>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-primary">+ Raise Issue</button>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">Compliance Issues</div>
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Severity</th>
                <th>Status</th>
                <th>Due Date</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="5" style={{ textAlign: 'center' }}>Loading...</td></tr>
              ) : issues.length === 0 ? (
                <tr><td colSpan="5" style={{ textAlign: 'center' }}>No issues found.</td></tr>
              ) : (
                issues.map(iss => (
                  <tr key={iss._id} style={iss.flagged ? { backgroundColor: 'rgba(239, 68, 68, 0.05)' } : {}}>
                    <td>
                      {iss.description}
                      {iss.flagged && <span className="pill pill-red" style={{ marginLeft: '0.5rem', fontSize: '0.6rem' }}>OVERDUE</span>}
                    </td>
                    <td>
                      <span className={`pill ${iss.severity === 'Critical' ? 'pill-red' : iss.severity === 'High' ? 'pill-orange' : iss.severity === 'Medium' ? 'pill-amber' : 'pill-green'}`}>
                        {iss.severity}
                      </span>
                    </td>
                    <td><span className="pill pill-gray">{iss.status}</span></td>
                    <td>{new Date(iss.dueDate).toLocaleDateString()}</td>
                    <td>{iss.owner?.name || 'Unassigned'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Governance;
