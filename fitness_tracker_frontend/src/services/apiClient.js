import axios from 'axios';
import { getStorage } from '../utils/storage';

/**
 * PUBLIC_INTERFACE
 * apiClient - Preconfigured axios instance for API requests.
 * - baseURL is read from environment variable: REACT_APP_API_BASE_URL
 * - Authorization: Bearer <token> automatically added if available in storage under 'auth_token'
 */
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token to each request if present
apiClient.interceptors.request.use((config) => {
  const token = getStorage('auth_token');
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

export default apiClient;
