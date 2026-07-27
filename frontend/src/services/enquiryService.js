import axiosClient from '../api/axiosClient';

/**
 * Customer Enquiries API Service wrapper.
 */
export const enquiryService = {
  // Public customer enquiry submission
  submitEnquiry: async (data) => {
    const res = await axiosClient.post('/enquiries', data);
    return res.data; // EnquiryResponse
  },

  // Admin enquiries search, filter, sort & pagination
  getEnquiries: async (params) => {
    const res = await axiosClient.get('/enquiries', { params });
    return res.data; // PagedResponse<EnquiryResponse>
  },

  getById: async (id) => {
    const res = await axiosClient.get(`/enquiries/${id}`);
    return res.data;
  },

  updateStatus: async (id, data) => {
    const res = await axiosClient.patch(`/enquiries/${id}/status`, data);
    return res.data;
  },

  delete: async (id) => {
    const res = await axiosClient.delete(`/enquiries/${id}`);
    return res.data;
  },
};
