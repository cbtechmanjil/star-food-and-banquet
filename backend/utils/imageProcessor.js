const sharp = require('sharp');
const { getObjectStream } = require('../minioClient');

/**
 * Processes an image from MinIO stream based on parameters
 * @param {string} objectName - MinIO object name
 * @param {Object} options - { width, height, quality, format }
 * @returns {Promise<Buffer>} - Processed image buffer
 */
const processImage = async (objectName, options = {}) => {
  const { width, height, quality = 75, format = 'webp' } = options;
  
  try {
    const stream = await getObjectStream(objectName);
    
    let transform = sharp();

    // Resize if width or height provided
    if (width || height) {
      transform = transform.resize({
        width: width ? parseInt(width) : null,
        height: height ? parseInt(height) : null,
        fit: 'cover',
        withoutEnlargement: true
      });
    }

    // Set format and quality
    if (format === 'webp') {
      transform = transform.webp({ quality: parseInt(quality) });
    } else if (format === 'avif') {
      transform = transform.avif({ quality: parseInt(quality) });
    } else {
      transform = transform.jpeg({ quality: parseInt(quality), mozjpeg: true });
    }

    return await stream.pipe(transform).toBuffer();
  } catch (error) {
    console.error('Image Processing Error:', error.message);
    throw error;
  }
};

module.exports = {
  processImage
};
