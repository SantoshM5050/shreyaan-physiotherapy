const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../../.env') });
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const mongoose = require('mongoose');
const Doctor = require('../models/Doctor');

const seedDoctor = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      console.warn('[Seed Script Warning] MONGO_URI environment variable is missing.');
      process.exit(0);
    }

    console.log('[Seed Script] Connecting to MongoDB...');
    await mongoose.connect(mongoUri);

    const email = (process.env.DEFAULT_DOCTOR_EMAIL || 'doctor@example.com').toLowerCase();
    const password = process.env.DEFAULT_DOCTOR_PASSWORD;

    if (!password) {
      console.warn('[Seed Script Warning] DEFAULT_DOCTOR_PASSWORD environment variable is missing.');
      process.exit(0);
    }

    let existingDoctor = await Doctor.findOne({ email });

    if (existingDoctor) {
      console.log(`[Seed Script] Doctor user '${email}' already exists in MongoDB.`);
      existingDoctor.password = password;
      await existingDoctor.save();
      console.log(`[Seed Script] Doctor password updated successfully from environment variables.`);
      process.exit(0);
    }

    const doctor = new Doctor({
      name: process.env.DEFAULT_DOCTOR_NAME || 'Dr. Sonam Maurya',
      email: email,
      password: password,
      qualification: process.env.DEFAULT_DOCTOR_QUALIFICATION || 'BPTh (Mumbai University)',
      registrationNo: process.env.DEFAULT_DOCTOR_REGISTRATION || '10534',
      role: 'doctor',
    });

    await doctor.save();
    console.log(`[Seed Script Success] Default Doctor user created successfully in MongoDB.`);
    process.exit(0);
  } catch (error) {
    console.warn(`[Seed Script Warning] Unable to seed MongoDB: ${error.message}`);
    process.exit(0);
  }
};

seedDoctor();
