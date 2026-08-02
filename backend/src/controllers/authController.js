const jwt = require('jsonwebtoken');
const Doctor = require('../models/Doctor');

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'shreyaan-doctor-portal-secret-jwt-key-2026',
    { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
  );
};

// @desc    Doctor Login API (Database Authenticated via MongoDB with Graceful Fallback)
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password.',
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const defaultEmail = (process.env.DEFAULT_DOCTOR_EMAIL || 'doctor@shreyaanphysiotherapycenter.in').toLowerCase();
    const defaultPassword = process.env.DEFAULT_DOCTOR_PASSWORD || 'DrSonam@2026';

    let doctor = null;

    try {
      doctor = await Doctor.findOne({ email: normalizedEmail }).select('+password');
    } catch (dbErr) {
      console.warn(`[DB Login Query Warning] ${dbErr.message}`);
    }

    if (doctor) {
      const isMatch = await doctor.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password.',
        });
      }

      const token = generateToken(doctor._id.toString());
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        success: true,
        message: 'Doctor login successful.',
        token,
        user: {
          id: doctor._id,
          name: doctor.name,
          email: doctor.email,
          qualification: doctor.qualification,
          registrationNo: doctor.registrationNo,
          role: doctor.role,
        },
      });
    }

    // Default Doctor Fallback if MongoDB record not yet created
    if (normalizedEmail === defaultEmail && password === defaultPassword) {
      // Create record in DB if connected
      try {
        doctor = new Doctor({
          name: process.env.DEFAULT_DOCTOR_NAME || 'Dr. Sonam Maurya',
          email: defaultEmail,
          password: defaultPassword,
          qualification: process.env.DEFAULT_DOCTOR_QUALIFICATION || 'BPTh (Mumbai University)',
          registrationNo: process.env.DEFAULT_DOCTOR_REGISTRATION || '10534',
          role: 'doctor',
        });
        await doctor.save();
      } catch {
        // Fall back to synthetic object ID
      }

      const id = doctor ? doctor._id.toString() : 'doc-default-001';
      const token = generateToken(id);

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        success: true,
        message: 'Doctor login successful.',
        token,
        user: {
          id: id,
          name: process.env.DEFAULT_DOCTOR_NAME || 'Dr. Sonam Maurya',
          email: defaultEmail,
          qualification: process.env.DEFAULT_DOCTOR_QUALIFICATION || 'BPTh (Mumbai University)',
          registrationNo: process.env.DEFAULT_DOCTOR_REGISTRATION || '10534',
          role: 'doctor',
        },
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid email or password.',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Doctor Logout API
// @route   POST /api/auth/logout
// @access  Public
const logout = (req, res) => {
  res.clearCookie('token');
  return res.status(200).json({
    success: true,
    message: 'Logged out successfully.',
  });
};

// @desc    Get Current Authenticated Doctor Profile from MongoDB
// @route   GET /api/auth/me
// @access  Protected
const getMe = async (req, res, next) => {
  try {
    let doctor = null;

    try {
      doctor = await Doctor.findById(req.user.id).select('-password');
    } catch {
      // Fallback if synth ID used
    }

    if (doctor) {
      return res.status(200).json({
        success: true,
        user: {
          id: doctor._id,
          name: doctor.name,
          email: doctor.email,
          qualification: doctor.qualification,
          registrationNo: doctor.registrationNo,
          role: doctor.role,
        },
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: req.user.id,
        name: process.env.DEFAULT_DOCTOR_NAME || 'Dr. Sonam Maurya',
        email: process.env.DEFAULT_DOCTOR_EMAIL || 'doctor@shreyaanphysiotherapycenter.in',
        qualification: process.env.DEFAULT_DOCTOR_QUALIFICATION || 'BPTh (Mumbai University)',
        registrationNo: process.env.DEFAULT_DOCTOR_REGISTRATION || '10534',
        role: 'doctor',
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { login, logout, getMe };
