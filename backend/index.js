require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const seedCafeDatabase = require('./seedCafe');
const seedTestimonials = require('./seedTestimonials');
const seedStats = require('./seedStats');
const seedFaqs = require('./seedFaqs');
const seedBanquet = require('./seedBanquet');
const BanquetMenu = require('./models/BanquetMenu');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/banner', require('./routes/banner'));
app.use('/api/settings', require('./routes/settings'));
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/cafe', require('./routes/cafe'));
app.use('/api/testimonials', require('./routes/testimonials'));
app.use('/api/stats', require('./routes/stats'));
app.use('/api/messages', require('./routes/contactMessages'));
app.use('/api/messages', require('./routes/contactMessages'));
app.use('/api/faqs', require('./routes/faqs'));

app.use('/api/banquet', require('./routes/banquet'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// Initialize Backend
const startServer = async () => {
  try {
    // Connect to database
    await connectDB();
    
    // Run seeders
    await seedCafeDatabase();
    await seedTestimonials();
    await seedStats();
    await seedFaqs();
    await seedBanquet();

    // Initialize MinIO Bucket
    const { initializeMinio } = require('./minioClient');
    await initializeMinio();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
