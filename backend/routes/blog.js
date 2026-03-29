const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');
const { protectAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { uploadGalleryMedia, deleteMedia } = require('../minioClient');

// @route   GET /api/blog
// @desc    Get all published blog posts
// @access  Public
router.get('/', async (req, res) => {
  try {
    const posts = await BlogPost.find({ status: 'Published' }).sort({ publishedAt: -1 });
    res.json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/blog/:slug
// @desc    Get single published blog post by slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug, status: 'Published' });
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    res.json({ success: true, data: post });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// --- ADMIN ROUTES ---

// @route   GET /api/blog/admin/list
// @desc    Get all blog posts for admin (including drafts)
router.get('/admin/list', protectAdmin, async (req, res) => {
  try {
    const posts = await BlogPost.find().sort({ createdAt: -1 });
    res.json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   POST /api/blog/admin/upload
// @desc    Upload blog featured image
router.post('/admin/upload', protectAdmin, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    const url = await uploadGalleryMedia(req.file); // Repurposing gallery upload for blog
    res.json({ success: true, url });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/blog/admin
// @desc    Create a blog post
router.post('/admin', protectAdmin, async (req, res) => {
  try {
    const post = await BlogPost.create(req.body);
    res.json({ success: true, data: post });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// @route   PUT /api/blog/admin/:id
// @desc    Update a blog post
router.put('/admin/:id', protectAdmin, async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
    res.json({ success: true, data: post });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// @route   DELETE /api/blog/admin/:id
// @desc    Delete a blog post
router.delete('/admin/:id', protectAdmin, async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
    
    // Optional: Delete image from MinIO if it exists
    if (post.image) {
      try { await deleteMedia(post.image); } catch (e) {}
    }

    await BlogPost.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
