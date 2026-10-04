export const AUTH_TOKEN_KEY = 'zerodha.authToken';

const apiBaseUrl = (
  process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === 'development' ? 'http://localhost:3002' : '')
).replace(/\/+$/, '');

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export async function apiRequest(path, options = {}) {
  if (!apiBaseUrl) {
    throw new Error('Backend API URL is not configured. Set REACT_APP_API_URL and rebuild the app.');
  }

  const headers = new Headers(options.headers || {});
  const token = options.token || sessionStorage.getItem(AUTH_TOKEN_KEY);
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  let body = options.body;
  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;
  if (body !== undefined && !isFormData) {
    headers.set('Content-Type', 'application/json');
    body = JSON.stringify(body);
  }

  let response;
  try {
    response = await fetch(`${apiBaseUrl}${path}`, {
      ...options,
      headers,
      body,
    });
  } catch {
    throw new Error('Cannot reach the backend. Check the API service URL and try again.');
  }

  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get('content-type') || '';
  const payload = contentType.includes('application/json') ? await response.json() : null;
  if (!response.ok) {
    throw new ApiError(
      payload?.error || `The backend returned an HTTP ${response.status} response.`,
      response.status
    );
  }
  if (payload === null) {
    throw new Error('The backend returned a response the app could not read.');
  }

  return payload;
}
