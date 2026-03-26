require('dotenv').config();
const mongoose = require('mongoose');
const GalleryImage = require('../models/GalleryImage');
const CafeSignature = require('../models/CafeSignature');
const BannerConfig = require('../models/BannerConfig');
const CafeConfig = require('../models/CafeConfig');
const CafeVibeImage = require('../models/CafeVibeImage');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/star-banquet');
    console.log('MongoDB connected for migration');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

/**
 * Convert full URL to relative path
 * Input: http://88.222.242.12:9000/starbanquet/banner/abc123.jpg
 * Output: banner/abc123.jpg
 */
const extractRelativePath = (url) => {
  if (!url) return null;
  
  // Already a relative path
  if (!url.startsWith('http')) {
    return url;
  }
  
  try {
    const urlObj = new URL(url);
    let pathname = decodeURIComponent(urlObj.pathname);
    
    // Remove leading slash
    if (pathname.startsWith('/')) {
      pathname = pathname.substring(1);
    }
    
    // Remove bucket name prefix if it exists (e.g., "starbanquet/")
    // The path is usually: /starbanquet/gallery/abc123.jpg
    const parts = pathname.split('/');
    if (parts.length >= 2) {
      // Skip the bucket name and join the rest
      return parts.slice(1).join('/');
    }
    
    return pathname;
  } catch (error) {
    console.warn(`Could not parse URL: ${url}`, error.message);
    return url;
  }
};

const migrateGalleryImages = async () => {
  try {
    console.log('\n🖼️  Migrating GalleryImage URLs...');
    const galleryImages = await GalleryImage.find();
    let updated = 0;
    
    for (let image of galleryImages) {
      if (image.url && image.url.startsWith('http')) {
        const newUrl = extractRelativePath(image.url);
        image.url = newUrl;
        await image.save();
        console.log(`  ✓ Updated: ${image._id} → ${newUrl}`);
        updated++;
      }
    }
    
    console.log(`  Total updated: ${updated}/${galleryImages.length}`);
  } catch (error) {
    console.error('Error migrating GalleryImage:', error);
  }
};

const migrateCafeSignatures = async () => {
  try {
    console.log('\n☕ Migrating CafeSignature URLs...');
    const signatures = await CafeSignature.find();
    let updated = 0;
    
    for (let sig of signatures) {
      if (sig.image && sig.image.startsWith('http')) {
        const newUrl = extractRelativePath(sig.image);
        sig.image = newUrl;
        await sig.save();
        console.log(`  ✓ Updated: ${sig._id} → ${newUrl}`);
        updated++;
      }
    }
    
    console.log(`  Total updated: ${updated}/${signatures.length}`);
  } catch (error) {
    console.error('Error migrating CafeSignature:', error);
  }
};

const migrateBannerConfigs = async () => {
  try {
    console.log('\n🎬 Migrating BannerConfig URLs...');
    const banners = await BannerConfig.find();
    let updated = 0;
    
    for (let banner of banners) {
      if (banner.mediaUrl && banner.mediaUrl.startsWith('http')) {
        const newUrl = extractRelativePath(banner.mediaUrl);
        banner.mediaUrl = newUrl;
        await banner.save();
        console.log(`  ✓ Updated: ${banner._id} → ${newUrl}`);
        updated++;
      }
    }
    
    console.log(`  Total updated: ${updated}/${banners.length}`);
  } catch (error) {
    console.error('Error migrating BannerConfig:', error);
  }
};

const migrateCafeConfigs = async () => {
  try {
    console.log('\n☕ Migrating CafeConfig URLs...');
    const configs = await CafeConfig.find();
    let updated = 0;
    
    for (let config of configs) {
      if (config.bannerImage && config.bannerImage.startsWith('http')) {
        const newUrl = extractRelativePath(config.bannerImage);
        config.bannerImage = newUrl;
        await config.save();
        console.log(`  ✓ Updated: ${config._id} → ${newUrl}`);
        updated++;
      }
    }
    
    console.log(`  Total updated: ${updated}/${configs.length}`);
  } catch (error) {
    console.error('Error migrating CafeConfig:', error);
  }
};

const migrateCafeVibeImages = async () => {
  try {
    console.log('\n🌅 Migrating CafeVibeImage URLs...');
    const vibes = await CafeVibeImage.find();
    let updated = 0;
    
    for (let vibe of vibes) {
      if (vibe.url && vibe.url.startsWith('http')) {
        const newUrl = extractRelativePath(vibe.url);
        vibe.url = newUrl;
        await vibe.save();
        console.log(`  ✓ Updated: ${vibe._id} → ${newUrl}`);
        updated++;
      }
    }
    
    console.log(`  Total updated: ${updated}/${vibes.length}`);
  } catch (error) {
    console.error('Error migrating CafeVibeImage:', error);
  }
};

const runMigration = async () => {
  try {
    console.log('\n========================================');
    console.log('🚀 Starting Minio URL Migration');
    console.log('========================================');
    
    await connectDB();
    
    await migrateGalleryImages();
    await migrateCafeSignatures();
    await migrateBannerConfigs();
    await migrateCafeConfigs();
    await migrateCafeVibeImages();
    
    console.log('\n========================================');
    console.log('✅ Migration completed successfully!');
    console.log('========================================\n');
    
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

runMigration();
