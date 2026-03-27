/**
 * Frontend Minio URL utility
 * Constructs full Minio URLs from relative paths stored in the database
 */

// This should match your Minio public endpoint
// Update this based on your deployment environment
const MINIO_BASE_URL = import.meta.env.VITE_MINIO_URL || 'https://starfoodbanquet.com/minio/starbanquet/';

/**
 * Convert relative Minio path to full URL
 * @param relativePath - Path from database (e.g., "banner/abc123.jpg")
 * @returns Full URL (e.g., "https://starfoodbanquet.com/minio/starbanquet/banner/abc123.jpg")
 */
export function getMinioUrl(relativePath: string | null | undefined): string {
  if (!relativePath) {
    return ''; // Return empty string for missing paths
  }

  // If it's already a full URL, return it as-is (backward compatibility)
  if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
    return relativePath;
  }

  // Remove leading slash if present
  const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;

  // Ensure baseUrl ends with /
  const baseUrl = MINIO_BASE_URL.endsWith('/') ? MINIO_BASE_URL : MINIO_BASE_URL + '/';

  return `${baseUrl}${cleanPath}`;
}

/**
 * Get multiple Minio URLs
 * @param paths - Array of relative paths
 * @returns Array of full URLs
 */
export function getMinioUrls(paths: (string | null | undefined)[]): string[] {
  return paths.map(path => getMinioUrl(path));
}

/**
 * Transform API response to include full Minio URLs
 * Recursively processes nested objects looking for image fields
 * @param data - API response data
 * @param imageFields - Array of field names to transform (default: ['url', 'image', 'mediaUrl', 'bannerImage'])
 * @returns Transformed data with full Minio URLs
 */
export function transformImageUrls<T>(
  data: T,
  imageFields: string[] = ['url', 'image', 'mediaUrl', 'bannerImage']
): T {
  if (!data) return data;

  if (Array.isArray(data)) {
    return (data as any[]).map(item => transformImageUrls(item, imageFields)) as any;
  }

  if (typeof data === 'object') {
    const transformed = { ...data } as any;

    for (const key in transformed) {
      if (imageFields.includes(key) && typeof transformed[key] === 'string') {
        // Transform image fields
        transformed[key] = getMinioUrl(transformed[key]);
      } else if (typeof transformed[key] === 'object') {
        // Recursively transform nested objects
        transformed[key] = transformImageUrls(transformed[key], imageFields);
      }
    }

    return transformed;
  }

  return data;
}

export default {
  getMinioUrl,
  getMinioUrls,
  transformImageUrls,
  MINIO_BASE_URL,
};
