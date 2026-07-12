import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts';

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await api.get('/reports/summary');
      setSummary(data);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  if (loading) return <div className="loading-center"><div className="spinner"></div></div>;

  const envTrend = [
    { name: 'Jan', co2: 4000 }, { name: 'Feb', co2: 3000 }, { name: 'Mar', co2: 2000 },
    { name: 'Apr', co2: 2780 }, { name: 'May', co2: 1890 }, { name: 'Jun', co2: 2390 },
  ]; // Mock trend

  return (
    <div className="fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-header-title">ESG Overview</h1>
          <p className="page-header-subtitle">Real-time sustainability and performance metrics</p>
        </div>
        <div className="page-header-actions">
          <span className="pill pill-green">Period: {summary?.period}</span>
          <button className="btn btn-primary">Generate Report</button>
        </div>
      </div>

      <div className="metric-grid">
        <div className="metric-card green">
          <div className="metric-label">Overall ESG Score</div>
          <div className="metric-value green">{summary?.overallScore || 0}</div>
          <div className="metric-change up">↑ 4.2% from last month</div>
        </div>
        <div className="metric-card teal">
          <div className="metric-label">Environmental</div>
          <div className="metric-value teal">{(summary?.departmentScores[0]?.environmentalScore || 75).toFixed(1)}</div>
          <div className="metric-change up">↑ 2.1% from last month</div>
        </div>
        <div className="metric-card blue">
          <div className="metric-label">Social</div>
          <div className="metric-value blue">{(summary?.departmentScores[0]?.socialScore || 80).toFixed(1)}</div>
          <div className="metric-change up">↑ 5.5% from last month</div>
        </div>
        <div className="metric-card purple">
          <div className="metric-label">Governance</div>
          <div className="metric-value purple">{(summary?.departmentScores[0]?.governanceScore || 85).toFixed(1)}</div>
          <div className="metric-change down">↓ 1.2% from last month</div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Carbon Footprint Trend</div>
              <div className="card-subtitle">Monthly CO2e emissions (kg)</div>
            </div>
          </div>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={envTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-green)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--accent-green)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="co2" stroke="var(--accent-green)" strokeWidth={3} fillOpacity={1} fill="url(#colorCo2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Department Leaderboard</div>
              <div className="card-subtitle">Ranked by Total ESG Score</div>
            </div>
          </div>
          <div style={{ height: 300 }}>
             <ResponsiveContainer width="100%" height="100%">
              <BarChart data={summary?.departmentScores || []} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} stroke="var(--text-muted)" fontSize={12} />
                <YAxis dataKey="department.name" type="category" stroke="var(--text-muted)" fontSize={12} width={100} />
                <Tooltip cursor={{ fill: 'var(--bg-card-hover)' }} contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px' }} />
                <Bar dataKey="totalScore" fill="var(--accent-blue)" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
