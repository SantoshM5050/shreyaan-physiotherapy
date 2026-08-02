const jwt = require('jsonwebtoken');
const Doctor = require('../models/Doctor');

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error(
      "FATAL SECURITY ERROR: JWT_SECRET environment variable is missing."
    );
  }

  return secret;
};

const protectDoctor = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Access token missing or invalid.',
    });
  }

  try {
    const decoded = jwt.verify(token, getJwtSecret());

    let doctorDoc = null;
    try {
      if (decoded.id && decoded.id !== 'doc-default-001') {
        doctorDoc = await Doctor.findById(decoded.id).select('-password');
      }
    } catch {
      // DB disconnect fallback
    }

    req.user = decoded;
    req.doctor = doctorDoc || {
      _id: decoded.id,
      name: process.env.DEFAULT_DOCTOR_NAME || 'Dr. Sonam Maurya',
      email: process.env.DEFAULT_DOCTOR_EMAIL || 'doctor@example.com',
      role: 'doctor',
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Invalid or expired token.',
      error: error.message,
    });
  }
};

module.exports = { protectDoctor };
