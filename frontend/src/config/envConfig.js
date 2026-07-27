/**
 * Centralized frontend environment configuration parameters.
 */
export const ENV_CONFIG = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1',
  APP_TITLE: import.meta.env.VITE_APP_TITLE || 'EventEasy',
  APP_ENV: import.meta.env.VITE_APP_ENV || 'development',
  IS_DEV: import.meta.env.DEV,
};
