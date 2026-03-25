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
  }
}, { timestamps: true });

module.exports = mongoose.model('BannerConfig', bannerConfigSchema);
