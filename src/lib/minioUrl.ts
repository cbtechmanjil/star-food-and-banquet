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
 * Constructs an optimized image URL pointing to our backend resizer
 * @param relativePath - Path from database
 * @param options - Resize options { w, h, q, fmt }
 * @returns Optimized URL
 */
export function getOptimizedImageUrl(
  relativePath: string | null | undefined,
  options: { w?: number; h?: number; q?: number; fmt?: 'webp' | 'avif' | 'jpeg' } = {}
): string {
  if (!relativePath) return '';
  
  // If it's a full external URL, we can't easily resize it through our proxy
  if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
    return relativePath;
  }

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:7001';
  const apiBase = baseUrl.endsWith('/api') ? baseUrl : `${baseUrl}/api`;
  
  // Construct query params
  const params = new URLSearchParams();
  if (options.w) params.append('w', options.w.toString());
  if (options.h) params.append('h', options.h.toString());
  if (options.q) params.append('q', options.q.toString());
  if (options.fmt) params.append('fmt', options.fmt);

  const queryString = params.toString();
  const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
  
  return `${apiBase}/media/${cleanPath}${queryString ? `?${queryString}` : ''}`;
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
  getOptimizedImageUrl,
  transformImageUrls,
  MINIO_BASE_URL,
};
