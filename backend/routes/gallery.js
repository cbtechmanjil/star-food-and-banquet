const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { protectAdmin } = require('../middleware/auth');
const GalleryImage = require('../models/GalleryImage');
const { uploadGalleryMedia, deleteMedia } = require('../minioClient');

// @route   POST /api/gallery/admin/upload
// @desc    Bulk upload images to gallery
router.post('/admin/upload', protectAdmin, (req, res, next) => {
  upload.array('images', 20)(req, res, function (err) {
    if (err) return res.status(400).json({ success: false, message: err.message });
    next();
  });
}, async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'No files uploaded' });
    }

    const { category, prefixTitle } = req.body;
    const cat = category || 'Uncategorized';
    const titleBase = prefixTitle || 'Gallery Image';

    const uploadedImages = [];

    // Process each file sequentially
    for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i];
        
        // Ensure its an image (just in case video gets through)
        if (!file.mimetype.startsWith('image/')) {
           continue; 
        }

        const url = await uploadGalleryMedia(file);
        
        const galleryRecord = await GalleryImage.create({
            url,
            category: cat,
            title: `${titleBase} ${i + 1}`
        });
        
        uploadedImages.push(galleryRecord);
    }

    res.json({ success: true, message: `${uploadedImages.length} images successfully uploaded`, data: uploadedImages });
  } catch (error) {
    console.error('Gallery Upload Error:', error.message);
    res.status(500).json({ success: false, message: error.message || 'Server error uploading images' });
  }
});

// @route   GET /api/gallery
// @desc    Get all gallery images
router.get('/', async (req, res) => {
    try {
        const images = await GalleryImage.find().sort({ createdAt: -1 });
        res.json({ success: true, data: images });
    } catch(err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   DELETE /api/gallery/admin/:id
// @desc    Delete gallery image from DB and MinIO
router.delete('/admin/:id', protectAdmin, async (req, res) => {
    try {
        const image = await GalleryImage.findById(req.params.id);
        if (!image) {
            return res.status(404).json({ success: false, message: 'Image not found' });
        }
        
        // Purge the file from MinIO
        await deleteMedia(image.url);

        // Delete from database
        await GalleryImage.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Image deleted from gallery and storage' });
    } catch(err) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
