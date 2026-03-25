const mongoose = require('mongoose');

const cafeConfigSchema = new mongoose.Schema({
  bannerImage: { type: String },
  bannerContent: { type: String, default: "Handcrafted coffees, fresh smoothies, and artisan bites — experience the warmth of Star Café nestled inside Star Food & Banquet." }
});

module.exports = mongoose.model('CafeConfig', cafeConfigSchema);
