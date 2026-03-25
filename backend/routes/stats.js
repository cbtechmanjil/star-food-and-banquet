const express = require('express');
const router = express.Router();
const { protectAdmin } = require('../middleware/auth');
const Stat = require('../models/Stat');

// @route   GET /api/stats
// @desc    Get all stats
router.get('/', async (req, res) => {
  try {
    const stats = await Stat.find().sort({ createdAt: 1 });
    res.json({ success: true, data: stats });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   POST /api/stats/admin
// @desc    Create/Update a stat
router.post('/admin', protectAdmin, async (req, res) => {
  try {
    const stat = await Stat.create(req.body);
    res.json({ success: true, data: stat });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route   PUT /api/stats/admin/:id
// @desc    Update a stat
router.put('/admin/:id', protectAdmin, async (req, res) => {
  try {
    const stat = await Stat.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: stat });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route   DELETE /api/stats/admin/:id
// @desc    Delete a stat
router.delete('/admin/:id', protectAdmin, async (req, res) => {
  try {
    await Stat.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Stat removed' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
