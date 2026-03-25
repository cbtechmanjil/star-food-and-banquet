const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({
  value: { type: Number, required: true },
  label: { type: String, required: true },
  suffix: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model('Stat', statSchema);
