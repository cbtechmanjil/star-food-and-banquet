const mongoose = require('mongoose');

const cafeSignatureSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  price: { type: String },
  image: { type: String, required: true },
  showPrice: { type: Boolean, default: true }
});

module.exports = mongoose.model('CafeSignature', cafeSignatureSchema);
