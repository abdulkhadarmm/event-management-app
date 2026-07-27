import { create } from 'zustand';
import { storage } from '../utils/storage';
import { authService } from '../services/authService';

/**
 * Global Zustand Auth Store - single source of truth for user authentication state.
 */
export const useAuthStore = create((set, get) => ({
  user: storage.getUser(),
  token: storage.getToken(),
  isAuthenticated: !!storage.getToken(),
  isLoading: false,
  error: null,

  /**
   * Perform login operation, updating store state and local storage.
   * @param {Object} credentials { email, password }
   */
  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const authData = await authService.login(credentials);
      const { accessToken, user } = authData;

      storage.setToken(accessToken);
      storage.setUser(user);

      set({
        token: accessToken,
        user: user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      return user;
    } catch (err) {
      const errorMessage = err.message || 'Login failed. Please check credentials.';
      set({ isLoading: false, error: errorMessage });
      throw err;
    }
  },

  /**
   * Perform client-side logout operation, clearing tokens and Zustand state.
   */
  logout: () => {
    storage.clearAuth();
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  },

  /**
   * Verify and refresh active user profile state from backend.
   */
  checkAuth: async () => {
    const token = storage.getToken();
    if (!token) {
      get().logout();
      return;
    }

    set({ isLoading: true });
    try {
      const user = await authService.getCurrentUser();
      storage.setUser(user);
      set({ user, isAuthenticated: true, isLoading: false });
    } catch {
      get().logout();
    }
  },
}));
