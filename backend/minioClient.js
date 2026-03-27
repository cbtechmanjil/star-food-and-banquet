const Minio = require('minio');

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT || 'localhost',
  port: parseInt(process.env.MINIO_PORT || '9000'),
  useSSL: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY || 'admin',
  secretKey: process.env.MINIO_SECRET_KEY || 'password123'
});

const initializeMinio = async () => {
  const bucketName = process.env.MINIO_BUCKET || 'star-food-assets';
  try {
    const exists = await minioClient.bucketExists(bucketName);
    if (!exists) {
      await minioClient.makeBucket(bucketName, 'us-east-1');
      console.log(`MinIO: Created bucket '${bucketName}'`);
      
      // Optional: Set bucket policy to public read so frontend can access images directly
      const policy = {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Principal: { AWS: ['*'] },
            Action: ['s3:GetObject'],
            Resource: [`arn:aws:s3:::${bucketName}/*`]
          }
        ]
      };
      await minioClient.setBucketPolicy(bucketName, JSON.stringify(policy));
      console.log(`MinIO: Set public read policy on '${bucketName}'`);
    } else {
      console.log(`MinIO: Bucket '${bucketName}' already exists.`);
    }
  } catch (error) {
    console.error('MinIO Initialization Error:', error.message);
  }
};

const crypto = require('crypto');
const path = require('path');

const uploadBannerMedia = async (file) => {
  const bucketName = process.env.MINIO_BUCKET || 'star-food-assets';
  const ext = path.extname(file.originalname);
  const uniqueName = crypto.randomBytes(16).toString('hex') + ext;
  const objectName = `banner/${uniqueName}`;

  try {
    await minioClient.putObject(
      bucketName, 
      objectName, 
      file.buffer, 
      file.size, 
      { 'Content-Type': file.mimetype }
    );

    const protocol = process.env.MINIO_USE_SSL === 'true' ? 'https' : 'http';
    const endpoint = process.env.MINIO_ENDPOINT || 'localhost';
    const port = process.env.MINIO_PORT || '9000';
    
    return `${protocol}://${endpoint}:${port}/${bucketName}/${objectName}`;
  } catch (error) {
    throw new Error(`MinIO Upload Failed: ${error.message}`);
  }
};

const uploadGalleryMedia = async (file) => {
  const bucketName = process.env.MINIO_BUCKET || 'star-food-assets';
  const ext = path.extname(file.originalname);
  const uniqueName = crypto.randomBytes(16).toString('hex') + ext;
  const objectName = `gallery/${uniqueName}`;

  try {
    await minioClient.putObject(
      bucketName, 
      objectName, 
      file.buffer, 
      file.size, 
      { 'Content-Type': file.mimetype }
    );

    const protocol = process.env.MINIO_USE_SSL === 'true' ? 'https' : 'http';
    const endpoint = process.env.MINIO_ENDPOINT || 'localhost';
    const port = process.env.MINIO_PORT || '9000';
    
    return `${protocol}://${endpoint}:${port}/${bucketName}/${objectName}`;
  } catch (error) {
    throw new Error(`MinIO Gallery Upload Failed: ${error.message}`);
  }
};

const deleteMedia = async (fileUrl) => {
  if (!fileUrl) return;
  try {
    const bucketName = process.env.MINIO_BUCKET || 'star-food-assets';
    const urlObj = new URL(fileUrl);
    // Decode the path and strip the bucket prefix to get the exact object name
    let objectName = decodeURIComponent(urlObj.pathname);
    if (objectName.startsWith(`/${bucketName}/`)) {
      objectName = objectName.replace(`/${bucketName}/`, '');
    } else if (objectName.startsWith('/')) {
      objectName = objectName.substring(1);
    }
    
    await minioClient.removeObject(bucketName, objectName);
    console.log(`MinIO: Successfully removed object '${objectName}' from bucket '${bucketName}'`);
  } catch (error) {
    console.error('MinIO Delete Error:', error.message);
  }
};

const uploadCafeMedia = async (file) => {
  const bucketName = process.env.MINIO_BUCKET || 'star-food-assets';
  const ext = path.extname(file.originalname);
  const uniqueName = crypto.randomBytes(16).toString('hex') + ext;
  const objectName = `cafe/${uniqueName}`;

  try {
    await minioClient.putObject(
      bucketName, 
      objectName, 
      file.buffer, 
      file.size, 
      { 'Content-Type': file.mimetype }
    );

    const protocol = process.env.MINIO_USE_SSL === 'true' ? 'https' : 'http';
    const endpoint = process.env.MINIO_ENDPOINT || 'localhost';
    const port = process.env.MINIO_PORT || '9000';
    
    return `${protocol}://${endpoint}:${port}/${bucketName}/${objectName}`;
  } catch (error) {
    throw new Error(`MinIO Cafe Upload Failed: ${error.message}`);
  }
};

const uploadSettingsMedia = async (file) => {
  const bucketName = process.env.MINIO_BUCKET || 'star-food-assets';
  const ext = path.extname(file.originalname);
  const uniqueName = crypto.randomBytes(16).toString('hex') + ext;
  const objectName = `settings/${uniqueName}`;

  try {
    await minioClient.putObject(
      bucketName, 
      objectName, 
      file.buffer, 
      file.size, 
      { 'Content-Type': file.mimetype }
    );

    const protocol = process.env.MINIO_USE_SSL === 'true' ? 'https' : 'http';
    const endpoint = process.env.MINIO_ENDPOINT || 'localhost';
    const port = process.env.MINIO_PORT || '9000';
    
    return `${protocol}://${endpoint}:${port}/${bucketName}/${objectName}`;
  } catch (error) {
    throw new Error(`MinIO Settings Upload Failed: ${error.message}`);
  }
};

module.exports = {
  minioClient,
  initializeMinio,
  uploadBannerMedia,
  uploadGalleryMedia,
  deleteMedia,
  uploadCafeMedia,
  uploadSettingsMedia
};
