import axiosClient from '../api/axiosClient';

/**
 * Event Themes API Service wrapper.
 */
export const themeService = {
  // Public
  getActiveThemes: async () => {
    const res = await axiosClient.get('/themes');
    return res.data;
  },

  // Admin
  getAllThemes: async () => {
    const res = await axiosClient.get('/themes/all');
    return res.data;
  },

  getById: async (id) => {
    const res = await axiosClient.get(`/themes/${id}`);
    return res.data;
  },

  create: async (data) => {
    const res = await axiosClient.post('/themes', data);
    return res.data;
  },

  update: async (id, data) => {
    const res = await axiosClient.put(`/themes/${id}`, data);
    return res.data;
  },

  delete: async (id) => {
    const res = await axiosClient.delete(`/themes/${id}`);
    return res.data;
  },
};
