const express = require('express');
const router = express.Router();
const { protectAdmin } = require('../middleware/auth');
const ContactSettings = require('../models/ContactSettings');
const { uploadSettingsMedia, deleteMedia } = require('../minioClient');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

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

// @route   POST /api/settings/admin/contact/qr
// @desc    Upload Map QR Code (Admin only)
router.post('/admin/contact/qr', protectAdmin, upload.single('media'), async (req, res) => {
    try {
        console.log('QR Upload Request Received');
        if (!req.file) {
            console.log('No file provided in request');
            return res.status(400).json({ success: false, message: 'Please upload a QR code image' });
        }

        console.log('Uploading to MinIO:', req.file.originalname);
        const settings = await ContactSettings.findOne() || new ContactSettings();
        
        // Delete old QR if exists
        if (settings.mapQrCode) {
            console.log('Deleting old QR:', settings.mapQrCode);
            await deleteMedia(settings.mapQrCode);
        }

        const url = await uploadSettingsMedia(req.file);
        console.log('Uploaded to MinIO, dynamic URL:', url);
        
        settings.mapQrCode = url;
        await settings.save();
        console.log('Settings saved to MongoDB');

        res.json({ success: true, url, data: settings });
    } catch (error) {
        console.error('QR Upload Error:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   PUT /api/settings/admin/contact
// @desc    Update contact details (Admin only)
router.put('/admin/contact', protectAdmin, async (req, res) => {
  try {
    const { address, phone, email, workingHours, mapQrCode } = req.body;
    
    let settings = await ContactSettings.findOne();
    if (!settings) {
      settings = new ContactSettings();
    }
    
    if (address !== undefined) settings.address = address;
    if (phone !== undefined) settings.phone = phone;
    if (email !== undefined) settings.email = email;
    if (workingHours !== undefined) settings.workingHours = workingHours;
    if (mapQrCode !== undefined) settings.mapQrCode = mapQrCode;
    
    await settings.save();
    
    res.json({ success: true, message: 'Contact settings updated successfully', data: settings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;
