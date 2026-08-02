const jwt = require('jsonwebtoken');
const Doctor = require('../models/Doctor');

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
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'shreyaan-doctor-portal-secret-jwt-key-2026'
    );

    const doctorDoc = await Doctor.findById(decoded.id).select('-password');
    if (!doctorDoc) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: Doctor user does not exist in database.',
      });
    }

    req.user = decoded;
    req.doctor = doctorDoc;

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
