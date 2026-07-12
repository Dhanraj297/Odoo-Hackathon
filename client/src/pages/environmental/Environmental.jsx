import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import { toast } from 'react-hot-toast';

const Environmental = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await api.get('/carbon-transactions');
      setTransactions(data);
    } catch (err) { toast.error('Failed to fetch data'); } finally { setLoading(false); }
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-header-title">Environmental Module</h1>
          <p className="page-header-subtitle">Track and manage carbon emissions and sustainability goals</p>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-primary">+ Log Carbon Transaction</button>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">Recent Carbon Transactions</div>
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Source</th>
                <th>Department</th>
                <th>Quantity</th>
                <th>Total CO2e</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="6" style={{ textAlign: 'center' }}>Loading...</td></tr>
              ) : transactions.length === 0 ? (
                <tr><td colSpan="6" style={{ textAlign: 'center' }}>No transactions found.</td></tr>
              ) : (
                transactions.map(t => (
                  <tr key={t._id}>
                    <td>{new Date(t.date).toLocaleDateString()}</td>
                    <td><span className="pill pill-teal">{t.source}</span></td>
                    <td>{t.department?.name || 'N/A'}</td>
                    <td>{t.quantity} {t.emissionFactor?.unit}</td>
                    <td style={{ fontWeight: 600, color: 'var(--accent-red)' }}>{t.calculatedCO2.toFixed(2)} kg</td>
                    <td>{t.isAutoCalculated ? <span className="pill pill-gray">Auto</span> : <span className="pill pill-blue">Manual</span>}</td>
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

export default Environmental;
