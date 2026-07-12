import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Environmental from './pages/environmental/Environmental';
import Social from './pages/social/Social';
import Governance from './pages/governance/Governance';
import Gamification from './pages/gamification/Gamification';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading-center"><div className="spinner"></div></div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="environmental" element={<Environmental />} />
        <Route path="social" element={<Social />} />
        <Route path="governance" element={<Governance />} />
        <Route path="gamification" element={<Gamification />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" toastOptions={{
          style: { background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border)' },
          success: { iconTheme: { primary: 'var(--accent-green)', secondary: '#000' } }
        }} />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
