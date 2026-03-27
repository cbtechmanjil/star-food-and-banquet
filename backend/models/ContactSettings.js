const mongoose = require('mongoose');

const contactSettingsSchema = new mongoose.Schema({
  address: { type: String, default: '12356 Glassford Street, New York, USA' },
  phone: { type: String, default: '1800 - 123 456 789' },
  email: { type: String, default: 'hello@starfoodandbanquet.com' },
  workingHours: { type: String, default: 'Mon - Fri: 9:00 AM - 5:00 PM' },
  mapQrCode: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('ContactSettings', contactSettingsSchema);
