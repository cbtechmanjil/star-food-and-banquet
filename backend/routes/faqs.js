const express = require('express');
const router = express.Router();
const { protectAdmin } = require('../middleware/auth');
const FAQ = require('../models/FAQ');

// @route   GET /api/faqs
// @desc    Get all FAQs (Public)
router.get('/', async (req, res) => {
  try {
    const faqs = await FAQ.find().sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: faqs });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   POST /api/faqs/admin
// @desc    Create an FAQ (Admin)
router.post('/admin', protectAdmin, async (req, res) => {
  try {
    const faq = await FAQ.create(req.body);
    res.json({ success: true, data: faq });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route   PUT /api/faqs/admin/:id
// @desc    Update an FAQ (Admin)
router.put('/admin/:id', protectAdmin, async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: faq });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route   DELETE /api/faqs/admin/:id
// @desc    Delete an FAQ (Admin)
router.delete('/admin/:id', protectAdmin, async (req, res) => {
  try {
    await FAQ.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'FAQ removed' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
