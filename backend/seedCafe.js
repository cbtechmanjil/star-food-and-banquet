const fs = require('fs');
const path = require('path');
const { uploadCafeMedia } = require('./minioClient');

const CafeConfig = require('./models/CafeConfig');
const CafeMenuItem = require('./models/CafeMenuItem');
const CafeSignature = require('./models/CafeSignature');
const CafeVibeImage = require('./models/CafeVibeImage');
const CafeCategory = require('./models/CafeCategory');

const createMockFile = (filePath) => {
  const absolutePath = path.join(__dirname, filePath);
  if (!fs.existsSync(absolutePath)) return null;
  return {
    originalname: path.basename(absolutePath),
    mimetype: 'image/png',
    buffer: fs.readFileSync(absolutePath),
    size: fs.statSync(absolutePath).size
  };
};

const seedCafeDatabase = async () => {
  try {
    const categoryCount = await CafeCategory.countDocuments();
    if (categoryCount === 0) {
      console.log('🌱 Seeding Cafe Categories...');
      const categories = [
        { name: "Hot Beverages" },
        { name: "Cold Beverages" },
        { name: "Snacks & Bites" },
        { name: "Desserts & Pastries" }
      ];
      await CafeCategory.insertMany(categories);
      console.log('✅ Categories seeded');
    }

    const menuCount = await CafeMenuItem.countDocuments();
    if (menuCount === 0) {
      console.log('🌱 Seeding Cafe Menu Items...');
      const menuData = [
        { name: "Classic Espresso", desc: "Double-shot, rich & bold", price: "Rs. 180", veg: true, category: "Hot Beverages" },
        { name: "Cappuccino", desc: "Creamy foam with cocoa dust", price: "Rs. 220", veg: true, bestseller: true, category: "Hot Beverages" },
        { name: "Café Latte", desc: "Smooth steamed milk & espresso", price: "Rs. 240", veg: true, category: "Hot Beverages" },
        { name: "Mocha Delight", desc: "Chocolate, espresso & whipped cream", price: "Rs. 280", veg: true, category: "Hot Beverages" },
        { name: "Masala Chai", desc: "Traditional spiced milk tea", price: "Rs. 120", veg: true, vegan: true, category: "Hot Beverages" },
        { name: "Green Tea", desc: "Organic Japanese sencha", price: "Rs. 150", veg: true, vegan: true, category: "Hot Beverages" },
        { name: "Hot Chocolate", desc: "Belgian cocoa with marshmallows", price: "Rs. 260", veg: true, category: "Hot Beverages" },
        
        { name: "Iced Americano", desc: "Bold espresso over ice", price: "Rs. 200", veg: true, vegan: true, category: "Cold Beverages" },
        { name: "Cold Brew", desc: "16-hr slow steeped, smooth finish", price: "Rs. 250", veg: true, bestseller: true, category: "Cold Beverages" },
        { name: "Mango Smoothie", desc: "Fresh Alphonso mango blend", price: "Rs. 280", veg: true, vegan: true, category: "Cold Beverages" },
        { name: "Berry Blast", desc: "Mixed berries, yogurt & honey", price: "Rs. 300", veg: true, category: "Cold Beverages" },
        { name: "Iced Matcha Latte", desc: "Ceremonial grade matcha on ice", price: "Rs. 290", veg: true, category: "Cold Beverages" },
        { name: "Mint Mojito", desc: "Refreshing mint & lime cooler", price: "Rs. 220", veg: true, vegan: true, category: "Cold Beverages" },

        { name: "Grilled Panini", desc: "Pesto, mozzarella & sun-dried tomato", price: "Rs. 320", veg: true, bestseller: true, category: "Snacks & Bites" },
        { name: "Club Sandwich", desc: "Triple-decker with fries", price: "Rs. 350", veg: false, category: "Snacks & Bites" },
        { name: "Veg Spring Rolls", desc: "Crispy rolls with sweet chilli", price: "Rs. 220", veg: true, vegan: true, category: "Snacks & Bites" },
        { name: "Loaded Nachos", desc: "Cheese, jalapeños & salsa", price: "Rs. 280", veg: true, category: "Snacks & Bites" },
        { name: "Bruschetta", desc: "Toasted ciabatta, fresh tomato-basil", price: "Rs. 240", veg: true, vegan: true, category: "Snacks & Bites" },
        { name: "Chicken Wrap", desc: "Grilled chicken, lettuce & mayo", price: "Rs. 340", veg: false, category: "Snacks & Bites" },

        { name: "New York Cheesecake", desc: "Classic baked with berry compote", price: "Rs. 320", veg: true, bestseller: true, category: "Desserts & Pastries" },
        { name: "Chocolate Brownie", desc: "Warm, gooey with vanilla ice cream", price: "Rs. 280", veg: true, category: "Desserts & Pastries" },
        { name: "Tiramisu", desc: "Espresso-soaked mascarpone layers", price: "Rs. 340", veg: true, category: "Desserts & Pastries" },
        { name: "French Croissant", desc: "Buttery, flaky, fresh-baked", price: "Rs. 180", veg: true, category: "Desserts & Pastries" },
        { name: "Blueberry Muffin", desc: "Soft, fruity & glazed", price: "Rs. 160", veg: true, category: "Desserts & Pastries" },
        { name: "Vegan Banana Bread", desc: "Moist, nutty & wholesome", price: "Rs. 200", veg: true, vegan: true, category: "Desserts & Pastries" }
      ];
      await CafeMenuItem.insertMany(menuData);
      console.log('✅ Menu Items seeded');
    }

    const sigCount = await CafeSignature.countDocuments();
    if (sigCount === 0) {
      console.log('🌱 Seeding Cafe Signatures (uploading assets to MinIO)...');
      let cafeLatteUrl = "", cafeSmoothieUrl = "";
      
      const fileLatte = createMockFile('../src/assets/cafe-latte.png');
      const fileSmoothie = createMockFile('../src/assets/cafe-smoothie.png');
      
      if (fileLatte) cafeLatteUrl = await uploadCafeMedia(fileLatte);
      if (fileSmoothie) cafeSmoothieUrl = await uploadCafeMedia(fileSmoothie);

      const sigData = [
        { name: "Signature Cold Brew", desc: "16-hour steeped, silky smooth finish with hints of caramel", price: "Rs. 250", veg: true, image: cafeLatteUrl, showPrice: true },
        { name: "Açaí Smoothie Bowl", desc: "Vibrant açaí base topped with granola, berries & honey", price: "Rs. 380", veg: true, vegan: true, image: cafeSmoothieUrl, showPrice: true },
        { name: "Artisan Cappuccino", desc: "Hand-crafted latte art with premium single-origin beans", price: "Rs. 220", veg: true, image: cafeLatteUrl, showPrice: true },
        { name: "NY Cheesecake", desc: "Classic baked cheesecake with seasonal berry compote", price: "Rs. 320", veg: true, image: cafeSmoothieUrl, showPrice: true },
        { name: "Mango Smoothie", desc: "Fresh Alphonso mango blended to creamy perfection", price: "Rs. 280", veg: true, vegan: true, image: cafeSmoothieUrl, showPrice: true },
        { name: "Grilled Panini", desc: "Pesto, mozzarella & sun-dried tomato on ciabatta", price: "Rs. 320", veg: true, image: cafeLatteUrl, showPrice: true }
      ];
      
      await CafeSignature.insertMany(sigData);
      console.log('✅ Signatures seeded');
    }

    const vibeCount = await CafeVibeImage.countDocuments();
    if (vibeCount === 0) {
      console.log('🌱 Seeding Cafe Vibe Gallery (uploading assets to MinIO)...');
      const images = ['../src/assets/cafe-interior-1.png', '../src/assets/cafe-interior-2.png', '../src/assets/cafe-interior-3.png', '../src/assets/cafe-hero.png', '../src/assets/cafe-latte.png', '../src/assets/cafe-smoothie.png'];
      
      for (const imgPath of images) {
        const file = createMockFile(imgPath);
        if (file) {
          const url = await uploadCafeMedia(file);
          await CafeVibeImage.create({ url });
        }
      }
      console.log('✅ Vibe Gallery seeded');
    }

    const configDoc = await CafeConfig.findOne();
    if (!configDoc || !configDoc.bannerImage) {
      console.log('🌱 Seeding Cafe Hero Banner...');
      const fileHero = createMockFile('../src/assets/cafe-hero.png');
      let heroUrl = "";
      if (fileHero) heroUrl = await uploadCafeMedia(fileHero);

      if (!configDoc) {
        await CafeConfig.create({
          bannerImage: heroUrl,
          bannerContent: "Handcrafted coffees, fresh smoothies, and artisan bites — experience the warmth of Star Café nestled inside Star Food & Banquet."
        });
      } else {
        configDoc.bannerImage = heroUrl;
        configDoc.bannerContent = "Handcrafted coffees, fresh smoothies, and artisan bites — experience the warmth of Star Café nestled inside Star Food & Banquet.";
        await configDoc.save();
      }
      console.log('✅ Cafe Hero seeded');
    }

  } catch (err) {
    console.error('❌ Failed to seed Cafe data:', err);
  }
};

module.exports = seedCafeDatabase;
