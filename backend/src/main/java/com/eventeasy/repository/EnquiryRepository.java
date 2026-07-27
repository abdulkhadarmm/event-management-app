package com.eventeasy.repository;

import com.eventeasy.entity.Enquiry;
import com.eventeasy.enums.EnquiryStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * <p>Spring Data JPA Repository for performing persistence operations and specification queries on {@link Enquiry} entities.</p>

 * @author EventEasy Engineering
 * @version 1.0.0
 */
@Repository
public interface EnquiryRepository extends JpaRepository<Enquiry, UUID>, JpaSpecificationExecutor<Enquiry> {

    /**
     * Locate non-deleted enquiry by UUID primary key.
     *
     * @param id enquiry UUID
     * @return Optional containing matched Enquiry or empty Optional
     */
    Optional<Enquiry> findByIdAndDeletedFalse(UUID id);

    /**
     * Locate non-deleted enquiry by unique human-readable enquiry number code.
     *
     * @param enquiryNumber unique enquiry number string (e.g. EVT-2026-000001)
     * @return Optional containing matched Enquiry or empty Optional
     */
    Optional<Enquiry> findByEnquiryNumberAndDeletedFalse(String enquiryNumber);

    /**
     * Filter non-deleted enquiries by search term, status, event type, package, theme, and date range.
     */
    @Query("""
        SELECT e FROM Enquiry e
        WHERE e.deleted = false
        AND (:search IS NULL OR LOWER(e.fullName) LIKE CONCAT('%', :search, '%') OR LOWER(e.email) LIKE CONCAT('%', :search, '%') OR LOWER(e.enquiryNumber) LIKE CONCAT('%', :search, '%') OR LOWER(e.city) LIKE CONCAT('%', :search, '%'))
        AND (:status IS NULL OR e.status = :status)
        AND (:eventTypeId IS NULL OR e.eventType.id = :eventTypeId)
        AND (:packageId IS NULL OR e.eventPackage.id = :packageId)
        AND (:themeId IS NULL OR e.eventTheme.id = :themeId)
        AND (:startDate IS NULL OR e.eventDate >= :startDate)
        AND (:endDate IS NULL OR e.eventDate <= :endDate)
    """)
    Page<Enquiry> findAllWithFilters(
            @Param("search") String search,
            @Param("status") EnquiryStatus status,
            @Param("eventTypeId") UUID eventTypeId,
            @Param("packageId") UUID packageId,
            @Param("themeId") UUID themeId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate,
            Pageable pageable
    );

    /**
     * Count total non-deleted enquiries in system.
     *
     * @return total count long
     */
    long countByDeletedFalse();

    /**
     * Count enquiries created since specified timestamp.
     *
     * @param startOfDay beginning of day timestamp
     * @return count long
     */
    long countByCreatedAtGreaterThanEqualAndDeletedFalse(LocalDateTime startOfDay);

    /**
     * Count enquiries matching specified status.
     *
     * @param status EnquiryStatus enum
     * @return count long
     */
    long countByStatusAndDeletedFalse(EnquiryStatus status);

    /**
     * Count upcoming events where event date is on or after today and status is not CANCELLED.
     *
     * @param today current date
     * @param excludedStatus EnquiryStatus to exclude (CANCELLED)
     * @return count long
     */
    long countByEventDateGreaterThanEqualAndStatusNotAndDeletedFalse(LocalDate today, EnquiryStatus excludedStatus);

    /**
     * Retrieve top 5 recent non-deleted enquiries ordered by creation date descending.
     *
     * @return List of 5 latest Enquiry entities
     */
    List<Enquiry> findTop5ByDeletedFalseOrderByCreatedAtDesc();

    /**
     * Count total count of enquiries created in specified date range.
     *
     * @param start start timestamp
     * @param end end timestamp
     * @return count long
     */
    long countByCreatedAtBetweenAndDeletedFalse(LocalDateTime start, LocalDateTime end);

    /**
     * Custom aggregate projection query retrieving count per status for dashboard charts.
     *
     * @return List of Object arrays [EnquiryStatus, Count]
     */
    @Query("SELECT e.status, COUNT(e) FROM Enquiry e WHERE e.deleted = false GROUP BY e.status")
    List<Object[]> countEnquiriesGroupedByStatus();

    /**
     * Custom aggregate projection query retrieving count per event type for dashboard charts.
     *
     * @return List of Object arrays [eventTypeName, Count]
     */
    @Query("SELECT e.eventType.name, COUNT(e) FROM Enquiry e WHERE e.deleted = false GROUP BY e.eventType.name")
    List<Object[]> countEnquiriesGroupedByEventType();
}
