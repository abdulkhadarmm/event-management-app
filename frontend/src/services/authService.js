import axiosClient from '../api/axiosClient';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

/**
 * Authentication & Admin Settings API Service wrapping backend HTTP calls.
 */
export const authService = {
  /**
   * Authenticate admin credentials and return token and profile.
   * @param {Object} credentials { email, password }
   * @returns {Promise<Object>} AuthResponse data payload ({ accessToken, user })
   */
  login: async (credentials) => {
    const response = await axiosClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
    return response?.data ? response.data : response;
  },

  /**
   * Fetch current authenticated admin user profile.
   * @returns {Promise<Object>} UserResponse profile payload
   */
  getCurrentUser: async () => {
    const response = await axiosClient.get(API_ENDPOINTS.AUTH.ME);
    return response?.data ? response.data : response;
  },

  /**
   * Update administrator profile details (email, first name, last name).
   * @param {Object} profileData { email, firstName, lastName }
   * @returns {Promise<Object>} Updated UserResponse profile
   */
  updateProfile: async (profileData) => {
    const response = await axiosClient.put('/auth/profile', profileData);
    return response?.data ? response.data : response;
  },

  /**
   * Change administrator account password.
   * @param {Object} passwordData { currentPassword, newPassword }
   * @returns {Promise<Object>} API response
   */
  changePassword: async (passwordData) => {
    const response = await axiosClient.put('/auth/password', passwordData);
    return response?.data ? response.data : response;
  },
};
