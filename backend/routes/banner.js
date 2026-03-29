const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { protectAdmin } = require('../middleware/auth');
const { uploadBannerMedia, deleteMedia } = require('../minioClient');
const BannerConfig = require('../models/BannerConfig');

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

    // Upload to MinIO
    const fileUrl = await uploadBannerMedia(req.file);

    // Upsert the BannerConfig
    let config = await BannerConfig.findOne();
    const bannerData = {
      mediaUrl: fileUrl,
      mediaType,
      useVideoBackground: isVideo,
      // Optional: Update text if provided during upload
      slogan: req.body.slogan,
      title: req.body.title,
      subtitle: req.body.subtitle
    };

    // Remove undefined fields to avoid overwriting with null
    Object.keys(bannerData).forEach(key => 
      bannerData[key] === undefined && delete bannerData[key]
    );

    if (config) {
      if (config.mediaUrl) {
         try { await deleteMedia(config.mediaUrl); } catch(e) {}
      }
      Object.assign(config, bannerData);
      await config.save();
    } else {
      config = await BannerConfig.create(bannerData);
    }

    res.json({
      success: true,
      message: 'Banner media uploaded successfully',
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
    const config = await BannerConfig.findOne();
    if (!config) {
      return res.json({ success: true, data: null });
    }
    res.json({ success: true, data: config });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// @route   PUT /api/banner/admin/toggle
// @desc    Toggle whether to use the video or image background
router.put('/admin/toggle', protectAdmin, async (req, res) => {
  try {
    const { useVideoBackground } = req.body;
    let config = await BannerConfig.findOne();
    if (!config) {
      return res.status(404).json({ success: false, message: 'No banner configured yet' });
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
router.put('/admin/content', protectAdmin, async (req, res) => {
  try {
    const { slogan, title, subtitle } = req.body;
    let config = await BannerConfig.findOne();
    
    if (!config) {
      // If no config exists, we create one but it will have no mediaUrl yet
      // This is unlikely but handled
      config = new BannerConfig({
        mediaUrl: "pending", // placeholder or empty
        mediaType: "image"
      });
    }

    if (slogan !== undefined) config.slogan = slogan;
    if (title !== undefined) config.title = title;
    if (subtitle !== undefined) config.subtitle = subtitle;

    await config.save();
    res.json({ success: true, message: 'Banner content updated', data: config });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// @route   DELETE /api/banner/admin
// @desc    Delete the current banner configuration and media
router.delete('/admin', protectAdmin, async (req, res) => {
  try {
    const config = await BannerConfig.findOne();
    if (!config) {
      return res.status(404).json({ success: false, message: 'No banner to delete' });
    }
    if (config.mediaUrl && config.mediaUrl !== "pending") {
      await deleteMedia(config.mediaUrl);
    }
    await BannerConfig.deleteMany();
    res.json({ success: true, message: 'Banner media deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;
