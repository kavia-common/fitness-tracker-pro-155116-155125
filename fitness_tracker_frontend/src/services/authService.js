import apiClient from './apiClient';

/**
 * PUBLIC_INTERFACE
 * AuthService provides methods to authenticate the user against the backend API.
 * NOTE: Endpoints are placeholders; update paths to match your backend.
 */
const AuthService = {
  /**
   * PUBLIC_INTERFACE
   * login - Sends credentials to login endpoint.
   * @param {{email: string, password: string}} payload
   * @returns {Promise<{token: string, user: object}>}
   */
  async login(payload) {
    const { data } = await apiClient.post('/auth/login', payload);
    return data;
  },

  /**
   * PUBLIC_INTERFACE
   * register - Sends registration details to sign up endpoint.
   * @param {{name?: string, email: string, password: string}} payload
   * @returns {Promise<{token: string, user: object}>}
   */
  async register(payload) {
    const { data } = await apiClient.post('/auth/register', payload);
    return data;
  },

  /**
   * PUBLIC_INTERFACE
   * getProfile - Fetches current user profile.
   * @returns {Promise<object>}
   */
  async getProfile() {
    const { data } = await apiClient.get('/auth/me');
    return data;
  },
};

export default AuthService;
