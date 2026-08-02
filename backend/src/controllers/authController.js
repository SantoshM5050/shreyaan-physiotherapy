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

const generateToken = (id) => {
  return jwt.sign({ id }, getJwtSecret(), {
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  });
};

// @desc    Doctor Login API (Database Authenticated via MongoDB with Environment Fallback)
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Invalid input: Email and password are required and must be strings.',
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const defaultEmail = (process.env.DEFAULT_DOCTOR_EMAIL || '').trim().toLowerCase();
    const defaultPassword = process.env.DEFAULT_DOCTOR_PASSWORD || '';

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
    if (defaultEmail && defaultPassword && normalizedEmail === defaultEmail && password === defaultPassword) {
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
        // DB disconnect fallback
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
      if (req.user && req.user.id && req.user.id !== 'doc-default-001') {
        doctor = await Doctor.findById(req.user.id).select('-password');
      }
    } catch {
      // Fallback
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
        id: req.user?.id || 'doc-default-001',
        name: process.env.DEFAULT_DOCTOR_NAME || 'Dr. Sonam Maurya',
        email: process.env.DEFAULT_DOCTOR_EMAIL || 'doctor@example.com',
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
