import axiosClient from '../api/axiosClient';

export const newsletterService = {
  subscribe: async (email) => {
    return await axiosClient.post('/newsletter/subscribe', { email });
  },
};

export default newsletterService;
