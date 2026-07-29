package com.eventeasy.service.impl;

import com.eventeasy.dto.response.DashboardStatsResponse;
import com.eventeasy.dto.response.EnquiryResponse;
import com.eventeasy.entity.Enquiry;
import com.eventeasy.enums.EnquiryStatus;
import com.eventeasy.repository.EnquiryRepository;
import com.eventeasy.service.DashboardService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * <p>Implementation of {@link DashboardService} computing executive analytics for admin portal.</p>
 *
 * @author EventEasy Engineering
 * @version 1.0.0
 */
@Slf4j
@Service
public class DashboardServiceImpl implements DashboardService {

    private final EnquiryRepository enquiryRepository;

    private volatile DashboardStatsResponse cachedResponse;
    private volatile long lastCacheTime = 0;
    private static final long CACHE_TTL_MS = 5000; // 5 seconds in-memory cache for ultra-fast refreshes

    public DashboardServiceImpl(EnquiryRepository enquiryRepository) {
        this.enquiryRepository = enquiryRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public DashboardStatsResponse getDashboardStats() {
        long now = System.currentTimeMillis();
        if (cachedResponse != null && (now - lastCacheTime) < CACHE_TTL_MS) {
            log.debug("Returning cached dashboard stats (latency: < 1ms)");
            return cachedResponse;
        }

        log.debug("Computing optimized executive dashboard analytics");

        // 1. Single aggregate query for status distribution and metric counts
        Map<String, Long> statusDist = new LinkedHashMap<>();
        for (EnquiryStatus s : EnquiryStatus.values()) {
            statusDist.put(s.name(), 0L);
        }

        List<Object[]> statusCounts = enquiryRepository.countEnquiriesGroupedByStatus();
        long total = 0;
        long confirmed = 0;
        long cancelled = 0;
        long pending = 0;

        for (Object[] row : statusCounts) {
            EnquiryStatus status = (EnquiryStatus) row[0];
            Long count = (Long) row[1];
            statusDist.put(status.name(), count);
            total += count;

            if (status == EnquiryStatus.CONFIRMED) {
                confirmed = count;
            } else if (status == EnquiryStatus.CANCELLED) {
                cancelled = count;
            } else if (status == EnquiryStatus.NEW || status == EnquiryStatus.CONTACTED
                    || status == EnquiryStatus.QUOTATION_SENT || status == EnquiryStatus.NEGOTIATION) {
                pending += count;
            }
        }

        // 2. Today's enquiries & upcoming active events
        LocalDateTime startOfToday = LocalDate.now().atStartOfDay();
        long todays = enquiryRepository.countByCreatedAtGreaterThanEqualAndDeletedFalse(startOfToday);

        long upcoming = enquiryRepository.countByEventDateGreaterThanEqualAndStatusNotInAndDeletedFalse(
                LocalDate.now(), List.of(EnquiryStatus.CANCELLED, EnquiryStatus.COMPLETED)
        );

        // 3. Event Type Distribution for Recharts Bar Chart
        Map<String, Long> eventTypeDist = new HashMap<>();
        List<Object[]> eventTypeCounts = enquiryRepository.countEnquiriesGroupedByEventType();
        for (Object[] row : eventTypeCounts) {
            String eventTypeName = (String) row[0];
            Long count = (Long) row[1];
            eventTypeDist.put(eventTypeName, count);
        }

        // 4. Monthly Trend for Recharts Line Chart (Past 6 Months in 1 SQL query)
        YearMonth currentMonth = YearMonth.now();
        YearMonth startMonth = currentMonth.minusMonths(5);
        LocalDateTime sixMonthsAgo = startMonth.atDay(1).atStartOfDay();

        List<Object[]> monthlyCounts = enquiryRepository.countEnquiriesGroupedByYearAndMonth(sixMonthsAgo);
        Map<String, Long> monthCountMap = new HashMap<>();
        for (Object[] row : monthlyCounts) {
            Integer year = (Integer) row[0];
            Integer month = (Integer) row[1];
            Long count = row[2] != null ? ((Number) row[2]).longValue() : 0L;
            String key = String.format("%d-%02d", year, month);
            monthCountMap.put(key, count);
        }

        List<DashboardStatsResponse.MonthlyTrendPoint> monthlyTrend = new ArrayList<>();
        DateTimeFormatter monthFormatter = DateTimeFormatter.ofPattern("MMM yyyy");

        for (int i = 5; i >= 0; i--) {
            YearMonth targetMonth = currentMonth.minusMonths(i);
            String key = String.format("%d-%02d", targetMonth.getYear(), targetMonth.getMonthValue());
            long count = monthCountMap.getOrDefault(key, 0L);

            monthlyTrend.add(DashboardStatsResponse.MonthlyTrendPoint.builder()
                    .month(targetMonth.format(monthFormatter))
                    .count(count)
                    .build());
        }

        // 5. Top 5 Recent Enquiries
        List<Enquiry> recentEntities = enquiryRepository.findTop5ByDeletedFalseOrderByCreatedAtDesc();
        List<EnquiryResponse> recentResponses = recentEntities.stream()
                .map(EnquiryResponse::fromEntity)
                .collect(Collectors.toList());

        DashboardStatsResponse response = DashboardStatsResponse.builder()
                .totalEnquiries(total)
                .todaysEnquiries(todays)
                .confirmedEvents(confirmed)
                .pendingEnquiries(pending)
                .cancelledEvents(cancelled)
                .upcomingEvents(upcoming)
                .statusDistribution(statusDist)
                .eventTypeDistribution(eventTypeDist)
                .monthlyTrend(monthlyTrend)
                .recentEnquiries(recentResponses)
                .build();

        this.cachedResponse = response;
        this.lastCacheTime = now;

        return response;
    }
}
