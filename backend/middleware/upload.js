const multer = require('multer');

// Configure multer storage in memory (buffer) so we can pipe directly to MinIO
const storage = multer.memoryStorage();

// Validate file types and size
const fileFilter = (req, file, cb) => {
  // Allowed mimetypes
  const allowedMimetypes = [
    'image/jpeg', 
    'image/png', 
    'image/webp',
    'video/mp4',
    'video/quicktime' // .mov
  ];

  if (allowedMimetypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error('Invalid file type. Only JPEG, PNG, WEBP images and MP4, MOV videos are allowed.'),
      false
    );
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50 MB Max Size
  },
  fileFilter
});

module.exports = upload;
