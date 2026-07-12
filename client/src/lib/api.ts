/**
 * API client for EcoSphere backend (Express server on port 5000)
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// ─── Generic fetch wrapper ──────────────────────────────────────────────────

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message || 'API request failed');
  }

  return res.json();
}

// ─── Auth ───────────────────────────────────────────────────────────────────

export const authApi = {
  login: (email: string, password: string) =>
    request<{ token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (data: { name: string; email: string; password: string; role?: string }) =>
    request<{ token: string; user: any }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  me: () => request<{ user: any }>('/auth/me'),
};

// ─── Environmental ──────────────────────────────────────────────────────────

export const environmentalApi = {
  getGoals: () => request<any[]>('/environmental-goals'),
  getTransactions: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return request<any[]>(`/carbon-transactions${q}`);
  },
  createTransaction: (data: any) =>
    request<any>('/carbon-transactions', { method: 'POST', body: JSON.stringify(data) }),
};

// ─── Social ─────────────────────────────────────────────────────────────────

export const socialApi = {
  getActivities: () => request<any[]>('/csr-activities'),
  createActivity: (data: any) =>
    request<any>('/csr-activities', { method: 'POST', body: JSON.stringify(data) }),
  getParticipations: () => request<any[]>('/participations'),
};

// ─── Governance ─────────────────────────────────────────────────────────────

export const governanceApi = {
  getPolicies: () => request<any[]>('/policies'),
  getComplianceIssues: () => request<any[]>('/compliance-issues'),
  getAudits: () => request<any[]>('/audits'),
};

// ─── Gamification ───────────────────────────────────────────────────────────

export const gamificationApi = {
  getLeaderboard: () => request<any[]>('/leaderboard'),
  getChallenges: () => request<any[]>('/challenges'),
  getBadges: () => request<any[]>('/badges'),
  getRewards: () => request<any[]>('/rewards'),
};

// ─── Reports ────────────────────────────────────────────────────────────────

export const reportsApi = {
  getReports: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return request<any>(`/reports${q}`);
  },
};

// ─── Notifications ──────────────────────────────────────────────────────────

export const notificationsApi = {
  getAll: () => request<any[]>('/notifications'),
  markRead: (id: string) =>
    request<any>(`/notifications/${id}/read`, { method: 'PATCH' }),
};

// ─── Departments ────────────────────────────────────────────────────────────

export const departmentsApi = {
  getAll: () => request<any[]>('/departments'),
};

// ─── Settings ───────────────────────────────────────────────────────────────

export const settingsApi = {
  get: () => request<any>('/settings'),
  update: (data: any) =>
    request<any>('/settings', { method: 'PUT', body: JSON.stringify(data) }),
};

// ─── Scores ─────────────────────────────────────────────────────────────────

export const scoresApi = {
  getAll: () => request<any[]>('/scores'),
  getMyScore: () => request<any>('/scores/me'),
};
