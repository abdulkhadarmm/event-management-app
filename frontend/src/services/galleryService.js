import axiosClient from '../api/axiosClient';

/**
 * Service handling portfolio gallery celebration API requests.
 */
export const galleryService = {
  /**
   * Fetch active celebration gallery items for public display.
   * @returns {Promise<Array>} list of active gallery items
   */
  getPublicActiveGalleryItems: async () => {
    const response = await axiosClient.get('/gallery');
    return response.data;
  },

  /**
   * Fetch all celebration gallery items for admin management.
   * @returns {Promise<Array>} list of all gallery items
   */
  getAllGalleryItems: async () => {
    const response = await axiosClient.get('/gallery/admin/all');
    return response.data;
  },

  /**
   * Create a new gallery celebration item.
   * @param {Object} data gallery payload
   */
  create: async (data) => {
    const response = await axiosClient.post('/gallery', data);
    return response.data;
  },

  /**
   * Update an existing gallery celebration item.
   * @param {string} id gallery item UUID
   * @param {Object} data gallery payload
   */
  update: async (id, data) => {
    const response = await axiosClient.put(`/gallery/${id}`, data);
    return response.data;
  },

  /**
   * Delete (soft-delete) a gallery item by UUID.
   * @param {string} id gallery item UUID
   */
  delete: async (id) => {
    const response = await axiosClient.delete(`/gallery/${id}`);
    return response.data;
  },
};
