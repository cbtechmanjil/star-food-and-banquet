require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const connectDB = require('../db');

const seedData = async () => {
  await connectDB();

  try {
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    
    if (existingAdmin) {
      console.log('Admin user already exists!');
      process.exit(0);
    }

    const admin = new Admin({
      username: 'admin',
      password: 'password123' // Will be hashed automatically by the pre-save hook
    });

    await admin.save();
    console.log('Admin user successfully seeded. (Username: admin, Password: password123)');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin data:', error);
    process.exit(1);
  }
};

seedData();
