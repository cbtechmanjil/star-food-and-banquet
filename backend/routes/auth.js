const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_fallback_key';

// @route   POST /api/auth/login
// @desc    Authenticate admin & get token
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Please provide both username and password' });
    }

    // Check for admin
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Verify password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create JWT Payload
    const payload = {
      admin: {
        id: admin.id,
        username: admin.username
      }
    };

    // Sign Token
    jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: '1d' },
      (err, token) => {
        if (err) throw err;
        res.json({
          status: 'success',
          token,
          user: { id: admin.id, username: admin.username }
        });
      }
    );
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/auth/verify
// @desc    Verify admin token (Useful for frontend route guarding)
router.get('/verify', (req, res) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ isValid: true, admin: decoded.admin });
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
});

module.exports = router;
