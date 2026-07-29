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

    /**
     * Constructor injection for EnquiryRepository dependency.
     *
     * @param enquiryRepository EnquiryRepository instance
     */
    public DashboardServiceImpl(EnquiryRepository enquiryRepository) {
        this.enquiryRepository = enquiryRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public DashboardStatsResponse getDashboardStats() {
        log.debug("Generating executive dashboard stats and analytics");

        long total = enquiryRepository.countByDeletedFalse();

        LocalDateTime startOfToday = LocalDate.now().atStartOfDay();
        long todays = enquiryRepository.countByCreatedAtGreaterThanEqualAndDeletedFalse(startOfToday);

        long confirmed = enquiryRepository.countByStatusAndDeletedFalse(EnquiryStatus.CONFIRMED);
        long cancelled = enquiryRepository.countByStatusAndDeletedFalse(EnquiryStatus.CANCELLED);

        long pending = enquiryRepository.countByStatusAndDeletedFalse(EnquiryStatus.NEW)
                + enquiryRepository.countByStatusAndDeletedFalse(EnquiryStatus.CONTACTED)
                + enquiryRepository.countByStatusAndDeletedFalse(EnquiryStatus.QUOTATION_SENT)
                + enquiryRepository.countByStatusAndDeletedFalse(EnquiryStatus.NEGOTIATION);

        long upcoming = enquiryRepository.countByEventDateGreaterThanEqualAndStatusNotInAndDeletedFalse(
                LocalDate.now(), java.util.List.of(EnquiryStatus.CANCELLED, EnquiryStatus.COMPLETED)
        );

        // Status Distribution for Recharts Pie Chart
        Map<String, Long> statusDist = new LinkedHashMap<>();
        for (EnquiryStatus s : EnquiryStatus.values()) {
            statusDist.put(s.name(), enquiryRepository.countByStatusAndDeletedFalse(s));
        }

        // Event Type Distribution for Recharts Bar Chart
        Map<String, Long> eventTypeDist = new HashMap<>();
        List<Object[]> eventTypeCounts = enquiryRepository.countEnquiriesGroupedByEventType();
        for (Object[] row : eventTypeCounts) {
            String eventTypeName = (String) row[0];
            Long count = (Long) row[1];
            eventTypeDist.put(eventTypeName, count);
        }

        // Monthly Trend for Recharts Line Chart (Past 6 Months)
        List<DashboardStatsResponse.MonthlyTrendPoint> monthlyTrend = new ArrayList<>();
        YearMonth currentMonth = YearMonth.now();
        DateTimeFormatter monthFormatter = DateTimeFormatter.ofPattern("MMM yyyy");

        for (int i = 5; i >= 0; i--) {
            YearMonth targetMonth = currentMonth.minusMonths(i);
            LocalDateTime monthStart = targetMonth.atDay(1).atStartOfDay();
            LocalDateTime monthEnd = targetMonth.atEndOfMonth().atTime(LocalTime.MAX);

            long count = enquiryRepository.countByCreatedAtBetweenAndDeletedFalse(monthStart, monthEnd);
            monthlyTrend.add(DashboardStatsResponse.MonthlyTrendPoint.builder()
                    .month(targetMonth.format(monthFormatter))
                    .count(count)
                    .build());
        }

        // Top 5 Recent Enquiries
        List<Enquiry> recentEntities = enquiryRepository.findTop5ByDeletedFalseOrderByCreatedAtDesc();
        List<EnquiryResponse> recentResponses = recentEntities.stream()
                .map(EnquiryResponse::fromEntity)
                .collect(Collectors.toList());

        return DashboardStatsResponse.builder()
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
    }
}
