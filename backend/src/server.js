require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

const server = app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 SHREYAAN PHYSIOTHERAPY BACKEND REST API ONLINE`);
  console.log(`📡 Listening on: http://localhost:${PORT}`);
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔑 Doctor Auth: http://localhost:${PORT}/api/auth/login`);
  console.log(`📝 Blog API:    http://localhost:${PORT}/api/blog`);
  console.log(`🖼️ Gallery API: http://localhost:${PORT}/api/gallery`);
  console.log(`====================================================`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('[Unhandled Rejection Error]:', err.message);
});
