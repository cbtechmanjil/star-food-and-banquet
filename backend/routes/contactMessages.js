const express = require('express');
const router = express.Router();
const { protectAdmin } = require('../middleware/auth');
const ContactMessage = require('../models/ContactMessage');

// @route   POST /api/messages
// @desc    Submit a contact message (Public)
router.post('/', async (req, res) => {
  try {
    const message = await ContactMessage.create(req.body);
    res.json({ success: true, data: message });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route   GET /api/messages/admin
// @desc    Get all contact messages (Admin)
router.get('/admin', protectAdmin, async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json({ success: true, data: messages });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   PUT /api/messages/admin/:id
// @desc    Update message status (Admin)
router.put('/admin/:id', protectAdmin, async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: message });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route   DELETE /api/messages/admin/:id
// @desc    Delete a message (Admin)
router.delete('/admin/:id', protectAdmin, async (req, res) => {
  try {
    await ContactMessage.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Message removed' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
