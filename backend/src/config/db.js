const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/shreyaan_physiotherapy',
      {
        serverSelectionTimeoutMS: 5000,
      }
    );
    console.log(`[MongoDB Connected] Host: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[MongoDB Connection Warning] ${error.message}`);
    console.warn(`[DB Mode] Running with graceful memory/fallback support if database connection is pending.`);
  }
};

module.exports = connectDB;
