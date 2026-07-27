import axiosClient from '../api/axiosClient';

/**
 * AI Event Planner API Service calling Spring Boot AI endpoints.
 */
export const aiService = {
  /**
   * Request AI-generated event plan proposal.
   * @param {Object} plannerData Request payload
   * @returns {Promise<Object>} AIEventPlannerResponse payload
   */
  generatePlan: async (plannerData) => {
    const response = await axiosClient.post('/ai/event-plan', plannerData);
    return response?.data ? response.data : response;
  },

  /**
   * Admin endpoint: Regenerate AI Plan for an existing enquiry.
   * @param {string} enquiryId UUID identifier
   * @returns {Promise<Object>} Updated AIEventPlannerResponse payload
   */
  regenerateEnquiryPlan: async (enquiryId) => {
    const response = await axiosClient.post(`/ai/regenerate-enquiry-plan/${enquiryId}`);
    return response?.data ? response.data : response;
  },
};
