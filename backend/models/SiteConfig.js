const mongoose = require('mongoose');

const siteConfigSchema = new mongoose.Schema({
  heroMode: {
    type: String,
    enum: ['image', 'video'],
    default: 'image'
  }
}, { timestamps: true });

module.exports = mongoose.model('SiteConfig', siteConfigSchema);
