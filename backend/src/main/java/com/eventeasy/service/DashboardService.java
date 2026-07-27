package com.eventeasy.service;

import com.eventeasy.dto.response.DashboardStatsResponse;

/**
 * <p>Service interface declaring executive dashboard analytics operations.</p>
 *
 * @author EventEasy Engineering
 * @version 1.0.0
 */
public interface DashboardService {

    /**
     * Generate complete Dashboard metrics, Recharts distribution charts, and recent enquiry feed.
     *
     * @return DashboardStatsResponse DTO
     */
    DashboardStatsResponse getDashboardStats();
}
