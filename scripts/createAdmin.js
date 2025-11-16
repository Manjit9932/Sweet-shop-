require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../src/models/User');
const connectDB = require('../src/config/database');

const createAdmin = async () => {
  try {
    await connectDB();
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@sweetshop.com' });
    if (existingAdmin) {
      console.log('Admin already exists!');
      process.exit(0);
    }

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@sweetshop.com',
      password: 'admin123',
      role: 'admin'
    });

    console.log('✅ Admin created successfully!');
    console.log('Email:', admin.email);
    console.log('Password: admin123');
    console.log('Role: admin');
    console.log('\n📍 Login at: http://localhost:3000/login');
    console.log('💡 Tip: You can add sweets with prices in ₹ (Indian Rupees)');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

createAdmin();
