package com.eventeasy.service;

import com.eventeasy.dto.request.EnquiryCreateRequest;
import com.eventeasy.dto.request.EnquiryStatusUpdateRequest;
import com.eventeasy.dto.response.EnquiryResponse;
import com.eventeasy.dto.response.PagedResponse;
import com.eventeasy.enums.EnquiryStatus;

import java.time.LocalDate;
import java.util.UUID;

/**
 * <p>Service interface declaring customer enquiry operations.</p>
 *
 * @author EventEasy Engineering
 * @version 1.0.0
 */
public interface EnquiryService {

    /**
     * Submit new public customer event enquiry.
     *
     * @param request enquiry submission payload
     * @return created EnquiryResponse DTO with generated enquiry number
     */
    EnquiryResponse createEnquiry(EnquiryCreateRequest request);

    /**
     * Retrieve paginated, filtered, searched, and sorted list of customer enquiries for administrator dashboard.
     *
     * @param search text search query (enquiryNumber, fullName, phone, email, city)
     * @param status optional status filter
     * @param eventTypeId optional event type UUID filter
     * @param packageId optional package UUID filter
     * @param themeId optional theme UUID filter
     * @param startDate optional date range start filter
     * @param endDate optional date range end filter
     * @param page zero-based page index
     * @param size page size limit
     * @param sortBy field name to sort by (createdAt, eventDate, estimatedBudget, fullName)
     * @param sortDir sort direction (asc, desc)
     * @return PagedResponse containing EnquiryResponse DTOs
     */
    PagedResponse<EnquiryResponse> getEnquiries(
            String search,
            EnquiryStatus status,
            UUID eventTypeId,
            UUID packageId,
            UUID themeId,
            LocalDate startDate,
            LocalDate endDate,
            int page,
            int size,
            String sortBy,
            String sortDir
    );

    /**
     * Retrieve enquiry details by UUID identifier.
     *
     * @param id enquiry UUID
     * @return EnquiryResponse DTO
     */
    EnquiryResponse getEnquiryById(UUID id);

    /**
     * Update enquiry workflow status and administrator notes.
     *
     * @param id enquiry UUID
     * @param request status update payload
     * @return updated EnquiryResponse DTO
     */
    EnquiryResponse updateEnquiryStatus(UUID id, EnquiryStatusUpdateRequest request);

    /**
     * Soft delete customer enquiry record.
     *
     * @param id enquiry UUID
     */
    void deleteEnquiry(UUID id);
}
