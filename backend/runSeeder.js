require('dotenv').config();
const mongoose = require('mongoose');

const initMinio = require('./minioClient');
initMinio.initializeMinio().catch(console.error);

const seedCafeDatabase = require('./seedCafe');

console.log("MONGODB_URI is:", process.env.MONGODB_URI ? "FOUND" : "MISSING");

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  console.log('Connected to Mongo, running seedCafeDatabase()...');
  try {
    await seedCafeDatabase();
  } catch(e) { console.error("SEEDER CRASH:", e) }
  console.log('Done!');
  process.exit(0);
}).catch(console.error);
