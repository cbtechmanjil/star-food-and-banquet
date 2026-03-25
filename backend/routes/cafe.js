const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { protectAdmin } = require('../middleware/auth');
const { uploadCafeMedia, deleteMedia } = require('../minioClient');

const CafeConfig = require('../models/CafeConfig');
const CafeMenuItem = require('../models/CafeMenuItem');
const CafeSignature = require('../models/CafeSignature');
const CafeVibeImage = require('../models/CafeVibeImage');
const CafeCategory = require('../models/CafeCategory');

// ================= PUBLIC =================
// @route   GET /api/cafe
// @desc    Fetch entire cafe configuration for the public page
router.get('/', async (req, res) => {
  try {
    let config = await CafeConfig.findOne();
    if (!config) config = await CafeConfig.create({}); // Generate defaults if none exist
    
    const menuItems = await CafeMenuItem.find();
    const signatures = await CafeSignature.find();
    const vibeImages = await CafeVibeImage.find().sort({ createdAt: -1 });
    const categories = await CafeCategory.find().sort({ createdAt: 1 });
    
    res.json({
      success: true,
      data: {
        banner: config,
        menuItems,
        signatures,
        vibeImages,
        categories
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error fetching cafe data' });
  }
});

// ================= BANNER =================
router.put('/admin/banner', protectAdmin, upload.single('media'), async (req, res) => {
  try {
    let config = await CafeConfig.findOne();
    if (!config) config = new CafeConfig();

    if (req.file) {
      if (config.bannerImage) {
        await deleteMedia(config.bannerImage).catch(() => {});
      }
      config.bannerImage = await uploadCafeMedia(req.file);
    }
    
    if (req.body.bannerContent !== undefined) {
      config.bannerContent = req.body.bannerContent;
    }
    
    await config.save();
    res.json({ success: true, message: 'Banner updated successfully', data: config });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ================= MENU ITEMS =================
router.post('/admin/menu', protectAdmin, async (req, res) => {
  try {
    const item = await CafeMenuItem.create(req.body);
    res.json({ success: true, message: 'Menu item created', data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put('/admin/menu/:id', protectAdmin, async (req, res) => {
  try {
    const item = await CafeMenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, message: 'Menu item updated', data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.delete('/admin/menu/:id', protectAdmin, async (req, res) => {
  try {
    await CafeMenuItem.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Menu item deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ================= SIGNATURES =================
router.post('/admin/signature', protectAdmin, upload.single('media'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'Image is required for Signature' });
    const image = await uploadCafeMedia(req.file);
    const item = await CafeSignature.create({ ...req.body, image });
    res.json({ success: true, message: 'Signature item created', data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.delete('/admin/signature/:id', protectAdmin, async (req, res) => {
  try {
    const item = await CafeSignature.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });
    await deleteMedia(item.image).catch(() => {});
    await CafeSignature.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Signature item deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ================= VIBE GALLERY =================
router.post('/admin/vibe/upload', protectAdmin, (req, res, next) => {
  upload.array('images', 20)(req, res, function (err) {
    if (err) return res.status(400).json({ success: false, message: err.message });
    next();
  });
}, async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'No files uploaded' });
    }
    const uploadedImages = [];
    for (const file of req.files) {
        if (!file.mimetype.startsWith('image/')) continue; 
        const url = await uploadCafeMedia(file);
        const img = await CafeVibeImage.create({ url });
        uploadedImages.push(img);
    }
    res.json({ success: true, message: `${uploadedImages.length} cafe vibe images uploaded`, data: uploadedImages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete('/admin/vibe/:id', protectAdmin, async (req, res) => {
  try {
    const item = await CafeVibeImage.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });
    await deleteMedia(item.url).catch(() => {});
    await CafeVibeImage.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Image deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ================= CATEGORIES =================
router.get('/admin/categories', protectAdmin, async (req, res) => {
  try {
    const categories = await CafeCategory.find().sort({ createdAt: 1 });
    res.json({ success: true, data: categories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/admin/categories', protectAdmin, async (req, res) => {
  try {
    const category = await CafeCategory.create(req.body);
    res.json({ success: true, message: 'Category created', data: category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.delete('/admin/categories/:id', protectAdmin, async (req, res) => {
  try {
    await CafeCategory.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
