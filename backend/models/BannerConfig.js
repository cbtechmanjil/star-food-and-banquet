const mongoose = require('mongoose');

const bannerConfigSchema = new mongoose.Schema({
  mediaUrl: {
    type: String,
    required: true,
  },
  mediaType: {
    type: String,
    enum: ['image', 'video'],
    required: true,
  },
  useVideoBackground: {
    type: Boolean,
    default: true,
  },
  slogan: {
    type: String,
    default: "Premium Event Management & Banquet Services"
  },
  title: {
    type: String,
    default: "Crafting Unforgettable - Celebrations"
  },
  subtitle: {
    type: String,
    default: "Let us plan your next event together — from intimate gatherings to grand celebrations, we bring your vision to life with Star Food & Banquet."
  }
}, { timestamps: true });

module.exports = mongoose.model('BannerConfig', bannerConfigSchema);
