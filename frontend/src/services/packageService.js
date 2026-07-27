import axiosClient from '../api/axiosClient';

/**
 * Event Packages API Service wrapper.
 */
export const packageService = {
  // Public
  getActivePackages: async () => {
    const res = await axiosClient.get('/packages');
    return res.data;
  },

  // Admin
  getAllPackages: async () => {
    const res = await axiosClient.get('/packages/all');
    return res.data;
  },

  getById: async (id) => {
    const res = await axiosClient.get(`/packages/${id}`);
    return res.data;
  },

  create: async (data) => {
    const res = await axiosClient.post('/packages', data);
    return res.data;
  },

  update: async (id, data) => {
    const res = await axiosClient.put(`/packages/${id}`, data);
    return res.data;
  },

  delete: async (id) => {
    const res = await axiosClient.delete(`/packages/${id}`);
    return res.data;
  },
};
