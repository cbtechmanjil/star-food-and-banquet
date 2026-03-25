const express = require('express');
const router = express.Router();
const BanquetMenu = require('../models/BanquetMenu');
const { protectAdmin } = require('../middleware/auth');

console.log('Banquet routes module loaded');

// @route   GET /api/banquet
// @desc    Fetch Gold and Diamond banquet menus
router.get('/', async (req, res) => {
  console.log('GET /api/banquet hit');
  try {
    const menus = await BanquetMenu.find();
    console.log('Found menus:', menus.length);
    res.json({ success: true, data: menus });
  } catch (err) {
    console.error('Error fetching banquet menus:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route   PUT /api/banquet/:id
// @desc    Update a specific banquet menu tab
router.put('/:id', protectAdmin, async (req, res) => {
  try {
    const menu = await BanquetMenu.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, message: 'Banquet menu updated', data: menu });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
