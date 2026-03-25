const mongoose = require('mongoose');

const BanquetCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  subtitle: { type: String },
  icon: { type: String, default: 'ChefHat' },
  items: [{ type: String }]
});

const BanquetMenuSchema = new mongoose.Schema({
  tab: { type: String, required: true, unique: true }, // "Gold" or "Diamond"
  categories: [BanquetCategorySchema]
}, { timestamps: true });

module.exports = mongoose.model('BanquetMenu', BanquetMenuSchema);
