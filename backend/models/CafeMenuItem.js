const mongoose = require('mongoose');

const cafeMenuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  price: { type: String, required: true },
  category: { type: String, required: true },
  veg: { type: Boolean, default: false },
  vegan: { type: Boolean, default: false },
  bestseller: { type: Boolean, default: false }
});

module.exports = mongoose.model('CafeMenuItem', cafeMenuItemSchema);
