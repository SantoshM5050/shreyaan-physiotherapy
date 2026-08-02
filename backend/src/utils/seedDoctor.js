const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../../.env') });
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const mongoose = require('mongoose');
const Doctor = require('../models/Doctor');

const seedDoctor = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/shreyaan_physiotherapy';
    console.log('[Seed Script] Connecting to MongoDB...');
    await mongoose.connect(mongoUri);

    const email = (process.env.DEFAULT_DOCTOR_EMAIL || 'doctor@shreyaanphysiotherapycenter.in').toLowerCase();
    let existingDoctor = await Doctor.findOne({ email });

    if (existingDoctor) {
      console.log(`[Seed Script] Doctor user '${email}' already exists in MongoDB.`);
      // Update password to ensure it matches
      existingDoctor.password = process.env.DEFAULT_DOCTOR_PASSWORD || 'DrSonam@2026';
      await existingDoctor.save();
      console.log(`[Seed Script] Doctor password updated successfully.`);
      process.exit(0);
    }

    const doctor = new Doctor({
      name: process.env.DEFAULT_DOCTOR_NAME || 'Dr. Sonam Maurya',
      email: email,
      password: process.env.DEFAULT_DOCTOR_PASSWORD || 'DrSonam@2026',
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
