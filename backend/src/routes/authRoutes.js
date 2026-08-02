const express = require('express');
const router = express.Router();
const { login, logout, getMe } = require('../controllers/authController');
const { validateLogin } = require('../validations/authValidation');
const { protectDoctor } = require('../middleware/auth');

router.post('/login', validateLogin, login);
router.post('/logout', logout);
router.get('/me', protectDoctor, getMe);

module.exports = router;
