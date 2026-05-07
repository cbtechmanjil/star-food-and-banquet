require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const compression = require('compression');
// const helmet = require('helmet');
// const morgan = require('morgan');
const connectDB = require('./db');
const seedCafeDatabase = require('./seedCafe');
const seedTestimonials = require('./seedTestimonials');
const seedStats = require('./seedStats');
const seedFaqs = require('./seedFaqs');
const seedBanquet = require('./seedBanquet');
const seedBlog = require('./seedBlog');
const seedAdmin = require('./seedAdmin');

const app = express();

// Middleware
const corsOptions = {
  origin: [
    'https://starfoodbanquet.com',
    'https://www.starfoodbanquet.com',
    'https://admin.starfoodbanquet.com',
    'https://www.admin.starfoodbanquet.com',
    'http://localhost:7000',
    'http://localhost:7002',
    'http://localhost:7003',
    'http://localhost:3000',
    'http://localhost:5173',
  ],
  credentials: true,
};

// app.use(helmet({
//   crossOriginResourcePolicy: { policy: "cross-origin" },
//   contentSecurityPolicy: false, // Disable for now if it interferes with development
// }));
// app.use(compression());
// app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.json());

// Optimized Media Route
// const { processImage } = require('./utils/imageProcessor');
// app.get('/api/media/:category/:filename', async (req, res) => {
//   try {
//     const { category, filename } = req.params;
//     const { w, h, q, fmt } = req.query;
//     const objectName = `${category}/${filename}`;

//     const processedImage = await processImage(objectName, {
//       width: w,
//       height: h,
//       quality: q,
//       format: fmt || (req.headers.accept?.includes('image/webp') ? 'webp' : 'jpeg')
//     });

//     // Set caching headers
//     res.set('Cache-Control', 'public, max-age=31536000, immutable');
//     res.set('Content-Type', `image/${fmt || 'webp'}`);
//     res.send(processedImage);
//   } catch (error) {
//     res.status(404).send('Image not found');
//   }
// });

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/banner', require('./routes/banner'));
app.use('/api/settings', require('./routes/settings'));
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/cafe', require('./routes/cafe'));
app.use('/api/testimonials', require('./routes/testimonials'));
app.use('/api/stats', require('./routes/stats'));
app.use('/api/messages', require('./routes/contactMessages'));
app.use('/api/faqs', require('./routes/faqs'));
app.use('/api/blog', require('./routes/blog'));
app.use('/api/banquet', require('./routes/banquet'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

app.get('/', (req, res) => {
  res.send('Star Banquet API Server is running.');
});

const startServer = async () => {
  const PORT = process.env.PORT || 7001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  try {
    // Connect to database
    await connectDB();
    
    // Run seeders
    await seedCafeDatabase();
    await seedTestimonials();
    await seedStats();
    await seedFaqs();
    await seedBanquet();
    await seedBlog();
    await seedAdmin();

    // Initialize MinIO Bucket
    const { initializeMinio } = require('./minioClient');
    await initializeMinio();
  } catch (error) {
    console.error('Database connection or seeding failed:', error.message);
    console.log('Server will continue running without DB connection for now.');
  }
};

startServer();
