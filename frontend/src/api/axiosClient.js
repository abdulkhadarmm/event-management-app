import axios from 'axios';
import { ENV_CONFIG } from '../config/envConfig';
import { storage } from '../utils/storage';
import { useAuthStore } from '../store/useAuthStore';

/**
 * Custom Axios Client instance configured with base API URL,
 * automatic Bearer token injection, and centralized error handling.
 */
const axiosClient = axios.create({
  baseURL: ENV_CONFIG.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 15000,
});

// Request Interceptor: Attach JWT Bearer Token
axiosClient.interceptors.request.use(
  (config) => {
    const token = storage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Responses and 401 Unauthorized Errors
axiosClient.interceptors.response.use(
  (response) => {
    // Return backend ApiResponse data wrapper
    return response.data;
  },
  (error) => {
    const status = error.response?.status;
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.errors?.[0] ||
      error.message ||
      'An unexpected network error occurred';

    if (status === 401) {
      // Token expired or invalid - perform client-side session cleanup
      useAuthStore.getState().logout();
    }

    return Promise.reject({
      status,
      message: errorMessage,
      rawError: error,
    });
  }
);

export default axiosClient;
