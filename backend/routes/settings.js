const express = require('express');
const router = express.Router();
const { protectAdmin } = require('../middleware/auth');
const ContactSettings = require('../models/ContactSettings');

// @route   GET /api/settings/contact
// @desc    Get contact details (public)
router.get('/contact', async (req, res) => {
  try {
    let settings = await ContactSettings.findOne();
    if (!settings) {
      // Return defaults if none exists
      settings = await ContactSettings.create({});
    }
    res.json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// @route   PUT /api/settings/admin/contact
// @desc    Update contact details (Admin only)
router.put('/admin/contact', protectAdmin, async (req, res) => {
  try {
    const { address, phone, email, workingHours } = req.body;
    
    let settings = await ContactSettings.findOne();
    if (!settings) {
      settings = new ContactSettings();
    }
    
    if (address !== undefined) settings.address = address;
    if (phone !== undefined) settings.phone = phone;
    if (email !== undefined) settings.email = email;
    if (workingHours !== undefined) settings.workingHours = workingHours;
    
    await settings.save();
    
    res.json({ success: true, message: 'Contact settings updated successfully', data: settings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;
