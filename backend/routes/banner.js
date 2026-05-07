const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { protectAdmin } = require('../middleware/auth');
const { uploadBannerMedia, deleteMedia } = require('../minioClient');
const BannerConfig = require('../models/BannerConfig');
const SiteConfig = require('../models/SiteConfig');

// @route   POST /api/banner/admin/upload
// @desc    Upload new banner media (Admin only)
// Note: We expect form-data with the key "media"
router.post('/admin/upload', protectAdmin, (req, res, next) => {
  upload.single('media')(req, res, function (err) {
    if (err) {
      // Handle Multer limits/filter errors
      return res.status(400).json({ success: false, message: err.message });
    }
    next();
  });
}, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    // Determine type
    const isVideo = req.file.mimetype.startsWith('video/');
    const mediaType = isVideo ? 'video' : 'image';
    const order = parseInt(req.body.order) || 1;

    // Upload to MinIO
    const fileUrl = await uploadBannerMedia(req.file);

    // Upsert the BannerConfig for the specific order
    let config = await BannerConfig.findOne({ order });
    const bannerData = {
      mediaUrl: fileUrl,
      mediaType,
      useVideoBackground: isVideo,
      order,
      slogan: req.body.slogan,
      title: req.body.title,
      subtitle: req.body.subtitle
    };

    // Remove undefined fields
    Object.keys(bannerData).forEach(key => 
      bannerData[key] === undefined && delete bannerData[key]
    );

    if (config) {
      if (config.mediaUrl && config.mediaUrl !== "pending") {
         try { await deleteMedia(config.mediaUrl); } catch(e) {}
      }
      Object.assign(config, bannerData);
      await config.save();
    } else {
      config = await BannerConfig.create(bannerData);
    }

    res.json({
      success: true,
      message: `Banner slide ${order} uploaded successfully`,
      data: config
    });
  } catch (error) {
    console.error('Upload Error:', error.message);
    res.status(500).json({ success: false, message: error.message || 'Server error uploading media' });
  }
});

// @route   GET /api/banner/current
// @desc    Get the current banner configuration (Public)
router.get('/current', async (req, res) => {
  try {
    const slides = await BannerConfig.find().sort({ order: 1 });
    let settings = await SiteConfig.findOne();
    if (!settings) {
      settings = await SiteConfig.create({ heroMode: 'image' });
    }
    res.json({ success: true, data: slides, settings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// @route   GET /api/banner/settings
// @desc    Get banner settings
router.get('/settings', async (req, res) => {
  try {
    let settings = await SiteConfig.findOne();
    if (!settings) {
      settings = await SiteConfig.create({ heroMode: 'image' });
    }
    res.json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// @route   PUT /api/banner/admin/settings
// @desc    Update banner settings
router.put('/admin/settings', protectAdmin, async (req, res) => {
  try {
    const { heroMode } = req.body;
    let settings = await SiteConfig.findOne();
    if (!settings) {
      settings = new SiteConfig();
    }
    settings.heroMode = heroMode;
    await settings.save();
    res.json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// @route   PUT /api/banner/admin/toggle
// @desc    Toggle whether to use the video or image background
router.put('/admin/toggle/:id', protectAdmin, async (req, res) => {
  try {
    const { useVideoBackground } = req.body;
    let config = await BannerConfig.findById(req.params.id);
    if (!config) {
      return res.status(404).json({ success: false, message: 'Slide not found' });
    }
    config.useVideoBackground = useVideoBackground;
    await config.save();
    res.json({ success: true, data: config });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// @route   PUT /api/banner/admin/content
// @desc    Update only the text content of the banner
router.put('/admin/content-all', protectAdmin, async (req, res) => {
  try {
    const { slogan, title, subtitle } = req.body;
    
    const updateData = {};
    if (slogan !== undefined) updateData.slogan = slogan;
    if (title !== undefined) updateData.title = title;
    if (subtitle !== undefined) updateData.subtitle = subtitle;

    await BannerConfig.updateMany({}, { $set: updateData });
    
    res.json({ success: true, message: 'All banner slides updated with new content' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// @route   DELETE /api/banner/admin
// @desc    Delete the current banner configuration and media
router.delete('/admin/:id', protectAdmin, async (req, res) => {
  try {
    const config = await BannerConfig.findById(req.params.id);
    if (!config) {
      return res.status(404).json({ success: false, message: 'Slide not found' });
    }
    if (config.mediaUrl && config.mediaUrl !== "pending") {
      try { await deleteMedia(config.mediaUrl); } catch(e) {}
    }
    await BannerConfig.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Banner slide deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;
