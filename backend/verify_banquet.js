require('dotenv').config();
const connectDB = require('./db');
const seedBanquet = require('./seedBanquet');
const BanquetMenu = require('./models/BanquetMenu');

const verify = async () => {
  try {
    await connectDB();
    await seedBanquet();
    const data = await BanquetMenu.find();
    console.log('Verification Success! Data count:', data.length);
    if (data.length > 0) {
      console.log('First tab:', data[0].tab);
      console.log('Categories count:', data[0].categories.length);
    }
    process.exit(0);
  } catch (err) {
    console.error('Verification failed:', err);
    process.exit(1);
  }
};

verify();
