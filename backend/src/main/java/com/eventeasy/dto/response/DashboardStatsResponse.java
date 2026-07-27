package com.eventeasy.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

/**
 * <p>Data Transfer Object payload containing executive statistics, metrics, and chart data for Admin Dashboard.</p>
 *
 * @author EventEasy Engineering
 * @version 1.0.0
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsResponse {

    private long totalEnquiries;
    private long todaysEnquiries;
    private long confirmedEvents;
    private long pendingEnquiries;
    private long cancelledEvents;
    private long upcomingEvents;

    /**
     * Map of EnquiryStatus name to count for Recharts Pie Chart.
     */
    private Map<String, Long> statusDistribution;

    /**
     * Map of EventType name to count for Recharts Bar Chart.
     */
    private Map<String, Long> eventTypeDistribution;

    /**
     * Monthly trend list containing [{ month: 'Jan', count: 12 }, ...] for Recharts Line Chart.
     */
    private List<MonthlyTrendPoint> monthlyTrend;

    /**
     * Top 5 recent enquiries ordered by creation date descending.
     */
    private List<EnquiryResponse> recentEnquiries;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MonthlyTrendPoint {
        private String month;
        private long count;
    }
}
