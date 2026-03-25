const fs = require('fs');
const path = require('path');
const { uploadGalleryMedia, uploadBannerMedia } = require('./minioClient');
const GalleryImage = require('./models/GalleryImage');
const BannerConfig = require('./models/BannerConfig');
const connectDB = require('./db');

const createMockFile = (filePath) => {
  const absolutePath = path.resolve(__dirname, filePath);
  if (!fs.existsSync(absolutePath)) {
      console.warn(`File not found: ${absolutePath}`);
      return null;
  }
  return {
    originalname: path.basename(absolutePath),
    mimetype: 'image/jpeg',
    buffer: fs.readFileSync(absolutePath),
    size: fs.statSync(absolutePath).size
  };
};

const seed = async () => {
    try {
        await connectDB();
        
        // 1. Seed Gallery if empty
        const count = await GalleryImage.countDocuments();
        if (count === 0) {
            console.log('🌱 Seeding Gallery...');
            const mappings = [
                { path: '../src/assets/service-wedding.jpg', cat: 'Weddings', title: 'Luxury Wedding Ceremony' },
                { path: '../src/assets/service-corporate.jpg', cat: 'Corporate', title: 'Annual Corporate Gala' },
                { path: '../src/assets/service-party.jpg', cat: 'Parties', title: 'Grand Birthday Celebration' },
                { path: '../src/assets/service-event.jpg', cat: 'Parties', title: 'Outdoor Garden Party' },
                { path: '../src/assets/about-venue.jpg', cat: 'Venues', title: 'Main Banquet Hall' },
                { path: '../src/assets/hero-banquet.jpg', cat: 'Venues', title: 'Grand Lobby Entrance' },
                { path: '../src/assets/cafe-interior-1.png', cat: 'Venues', title: 'Star Cafe Interior' },
                { path: '../src/assets/cafe-hero.png', cat: 'Venues', title: 'Cafe Entrance' }
            ];

            for (const item of mappings) {
                const file = createMockFile(item.path);
                if (file) {
                    const url = await uploadGalleryMedia(file);
                    await GalleryImage.create({
                        url,
                        category: item.cat,
                        title: item.title
                    });
                    console.log(`✅ Seeded ${item.title}`);
                }
            }
        }

        // 2. Seed Hero Banner if empty
        const bannerCount = await BannerConfig.countDocuments();
        if (bannerCount === 0) {
            console.log('🌱 Seeding Hero Banner...');
            const heroFile = createMockFile('../src/assets/hero-banquet.jpg');
            if (heroFile) {
                const url = await uploadBannerMedia(heroFile);
                await BannerConfig.create({
                    mediaUrl: url,
                    mediaType: 'image',
                    useVideoBackground: false
                });
                console.log('✅ Seeded Hero Banner');
            }
        }

        console.log('🏁 Seeding finished!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Seeding failed:', err);
        process.exit(1);
    }
};

seed();
