// Get the backend URL - use window.location for production fallback
const BACKEND_URL = (() => {
  const envUrl = import.meta.env.VITE_BACKEND_URL;
  if (envUrl) {
    return envUrl;
  }
  // Fallback for production: use the admin subdomain
  const hostname = window.location.hostname;
  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.includes(':')) {
    // Development
    return 'http://localhost:7001/api';
  }
  // Production: construct from hostname
  return `https://admin.${hostname}/api`;
})();

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

  // Log the request in development for debugging
  if (import.meta.env.DEV) {
    console.log('[API Request]', url);
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
