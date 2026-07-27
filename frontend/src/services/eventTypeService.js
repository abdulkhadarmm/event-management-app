import axiosClient from '../api/axiosClient';

/**
 * Event Types API Service wrapper.
 */
export const eventTypeService = {
  // Public
  getActiveEventTypes: async () => {
    const res = await axiosClient.get('/event-types');
    return res.data;
  },

  // Admin
  getAllEventTypes: async () => {
    const res = await axiosClient.get('/event-types/all');
    return res.data;
  },

  getById: async (id) => {
    const res = await axiosClient.get(`/event-types/${id}`);
    return res.data;
  },

  create: async (data) => {
    const res = await axiosClient.post('/event-types', data);
    return res.data;
  },

  update: async (id, data) => {
    const res = await axiosClient.put(`/event-types/${id}`, data);
    return res.data;
  },

  delete: async (id) => {
    const res = await axiosClient.delete(`/event-types/${id}`);
    return res.data;
  },
};
