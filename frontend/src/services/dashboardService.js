import axiosClient from '../api/axiosClient';

/**
 * Dashboard Analytics API Service wrapper.
 */
export const dashboardService = {
  getStats: async () => {
    const res = await axiosClient.get('/dashboard/stats');
    return res.data; // DashboardStatsResponse
  },
};
