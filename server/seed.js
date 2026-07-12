const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const User = require('./models/User');
const Department = require('./models/Department');
const Category = require('./models/Category');
const EmissionFactor = require('./models/EmissionFactor');
const Settings = require('./models/Settings');
const Challenge = require('./models/Challenge');

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing
    await Promise.all([
      User.deleteMany(), Department.deleteMany(), Category.deleteMany(), 
      EmissionFactor.deleteMany(), Settings.deleteMany(), Challenge.deleteMany()
    ]);

    // Settings
    await Settings.create({});

    // Departments
    const opsDept = await Department.create({ name: 'Operations', code: 'OPS' });
    const hrDept = await Department.create({ name: 'Human Resources', code: 'HR' });

    // Users
    const hashedAdmin = await bcrypt.hash('password123', 12);
    const admin = await User.create({
      name: 'System Admin', email: 'admin@ecosphere.com', password: hashedAdmin, role: 'admin', department: opsDept._id, xp: 500, points: 250, level: 3
    });

    const hashedEmp = await bcrypt.hash('password123', 12);
    await User.create({
      name: 'John Doe', email: 'employee@ecosphere.com', password: hashedEmp, role: 'employee', department: opsDept._id, xp: 150, points: 50, level: 1
    });

    // Categories
    const csrCat = await Category.create({ name: 'Community Volunteering', type: 'CSR Activity' });
    const chCat = await Category.create({ name: 'Eco Challenge', type: 'Challenge' });

    // Emission Factors
    await EmissionFactor.create([
      { name: 'Grid Electricity', scope: 'Scope 2', source: 'Expense', factor: 0.45, unit: 'per kWh' },
      { name: 'Diesel Fleet', scope: 'Scope 1', source: 'Fleet', factor: 2.68, unit: 'per Liter' }
    ]);

    // Challenge
    await Challenge.create({
      title: 'Bike to Work Week', category: chCat._id, xp: 100, difficulty: 'Medium', status: 'Active',
      description: 'Commute to work using a bicycle for 5 days.', createdBy: admin._id
    });

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
