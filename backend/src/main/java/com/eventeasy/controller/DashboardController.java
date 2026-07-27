package com.eventeasy.controller;

import com.eventeasy.dto.response.ApiResponse;
import com.eventeasy.dto.response.DashboardStatsResponse;
import com.eventeasy.service.DashboardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * <p>REST Controller exposing executive dashboard analytics and Recharts visualization endpoints.</p>
 *
 * @author EventEasy Engineering
 * @version 1.0.0
 */
@RestController
@RequestMapping("/api/v1/dashboard")
@Tag(name = "Dashboard Module", description = "Endpoints for administrator analytics metrics, charts, and activity feeds")
@PreAuthorize("hasRole('ADMIN')")
public class DashboardController {

    private final DashboardService dashboardService;

    /**
     * Constructor injection for DashboardService dependency.
     *
     * @param dashboardService DashboardService instance
     */
    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    /**
     * Retrieve complete executive dashboard metrics, status distribution, event type counts, monthly trends, and recent enquiries.
     *
     * @return ResponseEntity with DashboardStatsResponse DTO
     */
    @GetMapping("/stats")
    @Operation(summary = "Get Dashboard Analytics & Charts", description = "Retrieve metrics, status distribution pie data, event type bar data, monthly line trend, and recent 5 enquiries", security = @SecurityRequirement(name = "BearerAuthentication"))
    public ResponseEntity<ApiResponse<DashboardStatsResponse>> getDashboardStats() {
        DashboardStatsResponse result = dashboardService.getDashboardStats();
        return ResponseEntity.ok(ApiResponse.success(result, "Dashboard statistics retrieved successfully"));
    }
}
