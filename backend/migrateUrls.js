const mongoose = require('mongoose');
const connectDB = require('./db');
const BannerConfig = require('./models/BannerConfig');
const CafeConfig = require('./models/CafeConfig');
const CafeSignature = require('./models/CafeSignature');
const CafeVibeImage = require('./models/CafeVibeImage');
const GalleryImage = require('./models/GalleryImage');

const OLD_URL = 'http://localhost:9000/star-food-assets';
const NEW_URL = 'http://88.222.242.12:9000/starbanquet';

const migrate = async () => {
  try {
    await connectDB();
    console.log('Connected to DB for migration...');

    const models = [
      { model: GalleryImage, field: 'url' },
      { model: CafeVibeImage, field: 'url' },
      { model: CafeSignature, field: 'image' },
      { model: CafeConfig, field: 'bannerImage' },
      { model: BannerConfig, field: 'mediaUrl' }
    ];

    for (const { model, field } of models) {
      const docs = await model.find({ [field]: { $regex: OLD_URL } });
      console.log(`Migrating ${docs.length} documents for ${model.modelName}...`);
      
      for (const doc of docs) {
        doc[field] = doc[field].replace(OLD_URL, NEW_URL);
        await doc.save();
      }
      console.log(`Successfully updated ${docs.length} for ${model.modelName}`);
    }

    console.log('Migration complete!');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
};

migrate();
