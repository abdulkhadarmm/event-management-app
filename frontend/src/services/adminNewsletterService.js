import axiosClient from '../api/axiosClient';

export const adminNewsletterService = {
  getSubscribers: async () => {
    return await axiosClient.get('/admin/newsletter/subscribers');
  },
};

export default adminNewsletterService;
