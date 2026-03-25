const mongoose = require('mongoose');

const cafeCategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }
}, { timestamps: true });

module.exports = mongoose.model('CafeCategory', cafeCategorySchema);
