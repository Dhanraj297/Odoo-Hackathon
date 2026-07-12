// ===================== MOCK DATA =====================

export const kpiData = [
  {
    id: "esg-score",
    title: "Overall ESG Score",
    value: 82,
    unit: "",
    change: +4.2,
    changeLabel: "vs last quarter",
    icon: "Award",
    color: "emerald",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: "carbon",
    title: "Carbon Emissions",
    value: 1240,
    unit: "tCO₂e",
    change: -8.5,
    changeLabel: "vs last month",
    icon: "Wind",
    color: "blue",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "csr",
    title: "CSR Activities",
    value: 48,
    unit: "",
    change: +12,
    changeLabel: "this quarter",
    icon: "Heart",
    color: "pink",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    id: "challenges",
    title: "Active Challenges",
    value: 17,
    unit: "",
    change: +3,
    changeLabel: "new this week",
    icon: "Zap",
    color: "amber",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    id: "compliance",
    title: "Compliance Issues",
    value: 5,
    unit: "",
    change: -2,
    changeLabel: "resolved",
    icon: "ShieldCheck",
    color: "violet",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    id: "participation",
    title: "Employee Participation",
    value: 87,
    unit: "%",
    change: +5.3,
    changeLabel: "vs last month",
    icon: "Users",
    color: "teal",
    gradient: "from-teal-500 to-emerald-500",
  },
];

export const carbonTrendData = [
  { month: "Jan", emissions: 1450, target: 1400 },
  { month: "Feb", emissions: 1380, target: 1380 },
  { month: "Mar", emissions: 1420, target: 1360 },
  { month: "Apr", emissions: 1310, target: 1340 },
  { month: "May", emissions: 1290, target: 1320 },
  { month: "Jun", emissions: 1240, target: 1300 },
  { month: "Jul", emissions: 1180, target: 1280 },
  { month: "Aug", emissions: 1200, target: 1260 },
  { month: "Sep", emissions: 1150, target: 1240 },
  { month: "Oct", emissions: 1090, target: 1220 },
  { month: "Nov", emissions: 1050, target: 1200 },
  { month: "Dec", emissions: 1020, target: 1180 },
];

export const departmentESGData = [
  { dept: "Engineering", environmental: 78, social: 85, governance: 72, total: 78 },
  { dept: "Operations", environmental: 65, social: 70, governance: 80, total: 72 },
  { dept: "HR", environmental: 72, social: 92, governance: 88, total: 84 },
  { dept: "Finance", environmental: 60, social: 75, governance: 90, total: 75 },
  { dept: "Marketing", environmental: 70, social: 82, governance: 76, total: 76 },
  { dept: "IT", environmental: 85, social: 78, governance: 82, total: 82 },
];

export const esgBreakdownData = [
  { name: "Environmental", value: 76, color: "#10b981" },
  { name: "Social", value: 84, color: "#3b82f6" },
  { name: "Governance", value: 87, color: "#8b5cf6" },
];

export const carbonTransactions = [
  { id: 1, date: "2024-01-15", dept: "Operations", category: "Energy", scope: "Scope 1", amount: 45.2, unit: "tCO₂e", status: "verified" },
  { id: 2, date: "2024-01-14", dept: "IT", category: "Cloud Computing", scope: "Scope 3", amount: 12.8, unit: "tCO₂e", status: "pending" },
  { id: 3, date: "2024-01-13", dept: "Engineering", category: "Transportation", scope: "Scope 2", amount: 28.5, unit: "tCO₂e", status: "verified" },
  { id: 4, date: "2024-01-12", dept: "Marketing", category: "Business Travel", scope: "Scope 3", amount: 18.3, unit: "tCO₂e", status: "flagged" },
  { id: 5, date: "2024-01-11", dept: "Finance", category: "Electricity", scope: "Scope 2", amount: 32.1, unit: "tCO₂e", status: "verified" },
  { id: 6, date: "2024-01-10", dept: "HR", category: "Events", scope: "Scope 3", amount: 8.7, unit: "tCO₂e", status: "pending" },
  { id: 7, date: "2024-01-09", dept: "Operations", category: "Waste", scope: "Scope 1", amount: 22.4, unit: "tCO₂e", status: "verified" },
  { id: 8, date: "2024-01-08", dept: "IT", category: "Data Centers", scope: "Scope 2", amount: 55.6, unit: "tCO₂e", status: "verified" },
];

export const environmentalGoals = [
  { id: 1, title: "Net Zero by 2030", category: "Carbon", progress: 45, target: 100, unit: "%", deadline: "2030-12-31", status: "on-track" },
  { id: 2, title: "Renewable Energy 80%", category: "Energy", progress: 62, target: 80, unit: "%", deadline: "2025-06-30", status: "on-track" },
  { id: 3, title: "Zero Waste to Landfill", category: "Waste", progress: 71, target: 100, unit: "%", deadline: "2026-12-31", status: "at-risk" },
  { id: 4, title: "50% Water Reduction", category: "Water", progress: 38, target: 50, unit: "%", deadline: "2025-12-31", status: "at-risk" },
  { id: 5, title: "100% EV Fleet", category: "Transport", progress: 25, target: 100, unit: "%", deadline: "2028-12-31", status: "on-track" },
];

export const csrActivities = [
  {
    id: 1,
    title: "City Park Cleanup Drive",
    category: "Environment",
    date: "2024-01-20",
    participants: 145,
    hoursLogged: 580,
    impact: "2.5 tons waste collected",
    status: "completed",
    organizer: "Sarah Chen",
    image: null,
  },
  {
    id: 2,
    title: "STEM Education Workshop",
    category: "Education",
    date: "2024-01-25",
    participants: 78,
    hoursLogged: 312,
    impact: "200 students engaged",
    status: "upcoming",
    organizer: "Mike Johnson",
    image: null,
  },
  {
    id: 3,
    title: "Food Bank Volunteering",
    category: "Community",
    date: "2024-02-02",
    participants: 92,
    hoursLogged: 368,
    impact: "3200 meals distributed",
    status: "ongoing",
    organizer: "Emma Williams",
    image: null,
  },
  {
    id: 4,
    title: "Mental Health Awareness Week",
    category: "Health",
    date: "2024-02-10",
    participants: 234,
    hoursLogged: 0,
    impact: "Awareness campaign",
    status: "upcoming",
    organizer: "Alex Kumar",
    image: null,
  },
  {
    id: 5,
    title: "Tree Planting Initiative",
    category: "Environment",
    date: "2024-02-15",
    participants: 167,
    hoursLogged: 0,
    impact: "500 trees to be planted",
    status: "upcoming",
    organizer: "Jordan Lee",
    image: null,
  },
];

export const employees = [
  { id: 1, name: "Sarah Chen", role: "Senior Engineer", dept: "Engineering", avatar: null, level: 8, xp: 4250, badges: 12, participationRate: 95, esgScore: 88 },
  { id: 2, name: "Mike Johnson", role: "Product Manager", dept: "Marketing", avatar: null, level: 7, xp: 3890, badges: 10, participationRate: 87, esgScore: 82 },
  { id: 3, name: "Emma Williams", role: "HR Director", dept: "HR", avatar: null, level: 9, xp: 5120, badges: 15, participationRate: 98, esgScore: 94 },
  { id: 4, name: "Alex Kumar", role: "Data Analyst", dept: "IT", avatar: null, level: 6, xp: 2950, badges: 8, participationRate: 79, esgScore: 76 },
  { id: 5, name: "Jordan Lee", role: "Operations Lead", dept: "Operations", avatar: null, level: 7, xp: 3450, badges: 9, participationRate: 83, esgScore: 80 },
  { id: 6, name: "Priya Sharma", role: "Finance Manager", dept: "Finance", avatar: null, level: 8, xp: 4100, badges: 11, participationRate: 91, esgScore: 86 },
  { id: 7, name: "Chris Taylor", role: "DevOps Engineer", dept: "IT", avatar: null, level: 5, xp: 2200, badges: 6, participationRate: 72, esgScore: 70 },
  { id: 8, name: "Lisa Wang", role: "Marketing Lead", dept: "Marketing", avatar: null, level: 6, xp: 2780, badges: 7, participationRate: 80, esgScore: 78 },
];

export const leaderboard = [
  { rank: 1, name: "Emma Williams", dept: "HR", xp: 5120, level: 9, badges: 15, change: 0 },
  { rank: 2, name: "Sarah Chen", dept: "Engineering", xp: 4250, level: 8, badges: 12, change: 1 },
  { rank: 3, name: "Priya Sharma", dept: "Finance", xp: 4100, level: 8, badges: 11, change: -1 },
  { rank: 4, name: "Mike Johnson", dept: "Marketing", xp: 3890, level: 7, badges: 10, change: 2 },
  { rank: 5, name: "Jordan Lee", dept: "Operations", xp: 3450, level: 7, badges: 9, change: 0 },
  { rank: 6, name: "Alex Kumar", dept: "IT", xp: 2950, level: 6, badges: 8, change: -2 },
  { rank: 7, name: "Lisa Wang", dept: "Marketing", xp: 2780, level: 6, badges: 7, change: 1 },
  { rank: 8, name: "Chris Taylor", dept: "IT", xp: 2200, level: 5, badges: 6, change: -1 },
];

export const badges = [
  { id: 1, name: "Green Pioneer", icon: "🌱", description: "First to complete carbon calculator", rarity: "legendary", unlocked: true, xp: 500 },
  { id: 2, name: "Carbon Cutter", icon: "✂️", description: "Reduced personal emissions by 20%", rarity: "epic", unlocked: true, xp: 300 },
  { id: 3, name: "Team Player", icon: "🤝", description: "Participated in 10 CSR activities", rarity: "rare", unlocked: true, xp: 200 },
  { id: 4, name: "Policy Guardian", icon: "🛡️", description: "Acknowledged all governance policies", rarity: "common", unlocked: true, xp: 100 },
  { id: 5, name: "Eco Warrior", icon: "⚡", description: "Complete 30 days of eco-challenges", rarity: "legendary", unlocked: false, xp: 1000 },
  { id: 6, name: "Innovation Star", icon: "⭐", description: "Submit 5 sustainability ideas", rarity: "epic", unlocked: false, xp: 400 },
  { id: 7, name: "Zero Waster", icon: "♻️", description: "Zero waste for 90 days", rarity: "rare", unlocked: false, xp: 250 },
  { id: 8, name: "Community Hero", icon: "🦸", description: "Lead a CSR activity", rarity: "epic", unlocked: false, xp: 350 },
];

export const challenges = [
  { id: 1, title: "7-Day No-Print Challenge", category: "Environmental", xp: 150, participants: 89, daysLeft: 3, progress: 71, difficulty: "Easy", description: "Go paperless for 7 days" },
  { id: 2, title: "Cycle to Work Week", category: "Environmental", xp: 300, participants: 45, daysLeft: 7, progress: 0, difficulty: "Medium", description: "Cycle to office for a full week" },
  { id: 3, title: "Plant-Based Month", category: "Health", xp: 500, participants: 32, daysLeft: 18, progress: 40, difficulty: "Hard", description: "Go plant-based for 30 days" },
  { id: 4, title: "Learn & Share ESG", category: "Governance", xp: 200, participants: 124, daysLeft: 14, progress: 0, difficulty: "Easy", description: "Complete ESG training and share insights" },
  { id: 5, title: "Digital Declutter", category: "Environmental", xp: 100, participants: 203, daysLeft: 1, progress: 90, difficulty: "Easy", description: "Delete unused files and reduce cloud storage" },
];

export const policies = [
  { id: 1, title: "Environmental Management Policy", category: "Environmental", version: "2.3", lastUpdated: "2024-01-01", acknowledgmentRate: 94, status: "active", riskLevel: "low" },
  { id: 2, title: "Data Privacy & Security Policy", category: "Governance", version: "3.1", lastUpdated: "2023-12-15", acknowledgmentRate: 98, status: "active", riskLevel: "high" },
  { id: 3, title: "Anti-Bribery & Corruption Policy", category: "Governance", version: "1.8", lastUpdated: "2023-11-20", acknowledgmentRate: 87, status: "active", riskLevel: "high" },
  { id: 4, title: "Diversity & Inclusion Policy", category: "Social", version: "2.0", lastUpdated: "2024-01-10", acknowledgmentRate: 91, status: "active", riskLevel: "medium" },
  { id: 5, title: "Supplier Code of Conduct", category: "Governance", version: "1.5", lastUpdated: "2023-10-05", acknowledgmentRate: 76, status: "review", riskLevel: "medium" },
  { id: 6, title: "Whistleblower Protection Policy", category: "Governance", version: "1.2", lastUpdated: "2023-09-01", acknowledgmentRate: 89, status: "active", riskLevel: "medium" },
];

export const complianceIssues = [
  { id: 1, title: "Carbon reporting deadline missed", category: "Environmental", severity: "high", status: "open", dueDate: "2024-02-01", assignee: "Jordan Lee", created: "2024-01-10" },
  { id: 2, title: "Policy acknowledgement overdue - 12 employees", category: "Governance", severity: "medium", status: "in-progress", dueDate: "2024-01-25", assignee: "Emma Williams", created: "2024-01-08" },
  { id: 3, title: "Safety training certification expiring", category: "Social", severity: "medium", status: "resolved", dueDate: "2024-01-20", assignee: "Alex Kumar", created: "2024-01-05" },
  { id: 4, title: "Supplier audit documentation incomplete", category: "Governance", severity: "low", status: "open", dueDate: "2024-02-15", assignee: "Priya Sharma", created: "2024-01-12" },
  { id: 5, title: "Water usage exceeds quarterly limit", category: "Environmental", severity: "high", status: "in-progress", dueDate: "2024-01-30", assignee: "Sarah Chen", created: "2024-01-15" },
];

export const auditHistory = [
  { id: 1, title: "Q4 2023 Environmental Audit", type: "Internal", date: "2024-01-05", auditor: "External Team", score: 87, status: "completed", findings: 3 },
  { id: 2, title: "ISO 14001 Certification Audit", type: "External", date: "2023-11-15", auditor: "Bureau Veritas", score: 92, status: "completed", findings: 1 },
  { id: 3, title: "Supply Chain Governance Audit", type: "Internal", date: "2023-09-20", auditor: "Internal Audit Team", score: 78, status: "completed", findings: 6 },
  { id: 4, title: "Q1 2024 Social Compliance Audit", type: "Internal", date: "2024-04-01", auditor: "Internal Audit Team", score: null, status: "scheduled", findings: 0 },
];

export const diverstiyMetrics = {
  genderRatio: [
    { name: "Male", value: 52, color: "#3b82f6" },
    { name: "Female", value: 45, color: "#ec4899" },
    { name: "Non-binary", value: 3, color: "#8b5cf6" },
  ],
  ageGroups: [
    { group: "18-25", count: 45 },
    { group: "26-35", count: 120 },
    { group: "36-45", count: 98 },
    { group: "46-55", count: 67 },
    { group: "55+", count: 30 },
  ],
  ethnicityBreakdown: [
    { name: "Asian", value: 38, color: "#10b981" },
    { name: "Caucasian", value: 42, color: "#3b82f6" },
    { name: "Hispanic", value: 12, color: "#f59e0b" },
    { name: "African American", value: 6, color: "#ec4899" },
    { name: "Other", value: 2, color: "#8b5cf6" },
  ],
};

export const radarData = [
  { subject: "Carbon", A: 76, fullMark: 100 },
  { subject: "Water", A: 65, fullMark: 100 },
  { subject: "Waste", A: 82, fullMark: 100 },
  { subject: "Energy", A: 78, fullMark: 100 },
  { subject: "Biodiversity", A: 60, fullMark: 100 },
  { subject: "Supply Chain", A: 72, fullMark: 100 },
];

export const notifications = [
  { id: 1, type: "success", title: "Goal Achieved!", message: "Renewable energy target reached 62%", time: "2m ago", read: false },
  { id: 2, type: "warning", title: "Compliance Alert", message: "5 employees haven't acknowledged the new policy", time: "1h ago", read: false },
  { id: 3, type: "info", title: "New Challenge Available", message: '"Cycle to Work Week" challenge is now live', time: "3h ago", read: true },
  { id: 4, type: "success", title: "Badge Unlocked! 🎉", message: 'You earned the "Carbon Cutter" badge', time: "1d ago", read: true },
  { id: 5, type: "info", title: "ESG Report Ready", message: "Q4 2023 sustainability report is available", time: "2d ago", read: true },
];

export const weeklyHeatmapData = [
  { day: "Mon", "Week 1": 42, "Week 2": 58, "Week 3": 35, "Week 4": 67 },
  { day: "Tue", "Week 1": 55, "Week 2": 43, "Week 3": 62, "Week 4": 48 },
  { day: "Wed", "Week 1": 38, "Week 2": 71, "Week 3": 54, "Week 4": 39 },
  { day: "Thu", "Week 1": 63, "Week 2": 47, "Week 3": 78, "Week 4": 55 },
  { day: "Fri", "Week 1": 49, "Week 2": 65, "Week 3": 41, "Week 4": 72 },
];
