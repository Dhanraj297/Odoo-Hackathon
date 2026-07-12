const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');
const cron = require('node-cron');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: process.env.CLIENT_URL, methods: ['GET', 'POST'] }
});

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Make io available in routes
app.set('io', io);

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/departments', require('./routes/departments'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/emission-factors', require('./routes/emissionFactors'));
app.use('/api/environmental-goals', require('./routes/environmentalGoals'));
app.use('/api/carbon-transactions', require('./routes/carbonTransactions'));
app.use('/api/csr-activities', require('./routes/csrActivities'));
app.use('/api/participations', require('./routes/participations'));
app.use('/api/challenges', require('./routes/challenges'));
app.use('/api/challenge-participations', require('./routes/challengeParticipations'));
app.use('/api/policies', require('./routes/policies'));
app.use('/api/policy-acknowledgements', require('./routes/policyAcknowledgements'));
app.use('/api/audits', require('./routes/audits'));
app.use('/api/compliance-issues', require('./routes/complianceIssues'));
app.use('/api/badges', require('./routes/badges'));
app.use('/api/rewards', require('./routes/rewards'));
app.use('/api/scores', require('./routes/scores'));
app.use('/api/reports', require('./routes/reports'));
app.use('/api/leaderboard', require('./routes/leaderboard'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/settings', require('./routes/settings'));
app.use('/api/users', require('./routes/users'));

// Socket.io
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  socket.on('join', (userId) => socket.join(userId));
  socket.on('disconnect', () => console.log('Client disconnected:', socket.id));
});

// Cron: Check overdue compliance issues every hour
cron.schedule('0 * * * *', async () => {
  const ComplianceIssue = require('./models/ComplianceIssue');
  const Notification = require('./models/Notification');
  const now = new Date();
  const overdueIssues = await ComplianceIssue.find({
    dueDate: { $lt: now }, status: { $in: ['Open', 'In Progress'] }, flagged: { $ne: true }
  }).populate('owner');
  for (const issue of overdueIssues) {
    issue.flagged = true;
    await issue.save();
    if (issue.owner) {
      const notif = await Notification.create({
        user: issue.owner._id,
        type: 'compliance_overdue',
        title: 'Compliance Issue Overdue',
        message: `Compliance issue "${issue.description}" is past its due date.`,
        data: { issueId: issue._id }
      });
      io.to(issue.owner._id.toString()).emit('notification', notif);
    }
  }
});

// Cron: Auto-award badges every 15 minutes
cron.schedule('*/15 * * * *', async () => {
  const { autoBadgeAward } = require('./utils/badgeEngine');
  const Settings = require('./models/Settings');
  const settings = await Settings.findOne();
  if (settings?.badgeAutoAward) await autoBadgeAward(io);
});

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 EcoSphere server running on port ${PORT}`));
