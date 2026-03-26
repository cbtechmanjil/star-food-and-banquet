// Get the backend URL from environment variables
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://admin.starfoodbanquet.com/api';

/**
 * Constructs the full API URL
 * @param endpoint - The API endpoint (e.g., '/gallery', '/faqs')
 * @returns Full API URL
 */
export function getApiUrl(endpoint: string): string {
  const baseUrl = BACKEND_URL.endsWith('/api') ? BACKEND_URL : `${BACKEND_URL}/api`;
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${cleanEndpoint}`;
}

/**
 * Wrapper around fetch for API calls
 * @param endpoint - The API endpoint
 * @param options - Fetch options
 * @returns Response object
 */
export async function apiCall(
  endpoint: string,
  options?: RequestInit & { skipAuth?: boolean }
): Promise<Response> {
  const url = getApiUrl(endpoint);
  const { skipAuth, ...fetchOptions } = options || {};
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...fetchOptions?.headers,
  };

  // Add auth token if available and not skipped
  if (!skipAuth) {
    const token = localStorage.getItem('adminToken');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return fetch(url, {
    credentials: 'include',
    ...fetchOptions,
    headers,
  });
}

/**
 * GET request helper
 */
export async function apiGet(endpoint: string) {
  const response = await apiCall(endpoint, { method: 'GET' });
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json();
}

/**
 * POST request helper
 */
export async function apiPost(endpoint: string, data?: any) {
  const response = await apiCall(endpoint, {
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
  });
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json();
}

/**
 * PUT request helper
 */
export async function apiPut(endpoint: string, data?: any) {
  const response = await apiCall(endpoint, {
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
  });
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json();
}

/**
 * DELETE request helper
 */
export async function apiDelete(endpoint: string) {
  const response = await apiCall(endpoint, { method: 'DELETE' });
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json();
}
