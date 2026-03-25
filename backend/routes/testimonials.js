const express = require('express');
const router = express.Router();
const { protectAdmin } = require('../middleware/auth');
const Testimonial = require('../models/Testimonial');

// @route   GET /api/testimonials
// @desc    Get all testimonials
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json({ success: true, data: testimonials });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   POST /api/testimonials/admin
// @desc    Create a testimonial
router.post('/admin', protectAdmin, async (req, res) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.json({ success: true, data: testimonial });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route   DELETE /api/testimonials/admin/:id
// @desc    Delete a testimonial
router.delete('/admin/:id', protectAdmin, async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Testimonial removed' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route   PUT /api/testimonials/admin/:id
// @desc    Update a testimonial
router.put('/admin/:id', protectAdmin, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: testimonial });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
