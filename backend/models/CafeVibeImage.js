const mongoose = require('mongoose');

const cafeVibeImageSchema = new mongoose.Schema({
  url: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('CafeVibeImage', cafeVibeImageSchema);
