package com.eventeasy.controller;

import com.eventeasy.dto.request.EnquiryCreateRequest;
import com.eventeasy.dto.request.EnquiryStatusUpdateRequest;
import com.eventeasy.dto.response.ApiResponse;
import com.eventeasy.dto.response.EnquiryResponse;
import com.eventeasy.dto.response.PagedResponse;
import com.eventeasy.enums.EnquiryStatus;
import com.eventeasy.service.EnquiryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.UUID;

/**
 * <p>REST Controller exposing public enquiry submission and administrator enquiry management endpoints.</p>
 *
 * @author EventEasy Engineering
 * @version 1.0.0
 */
@RestController
@RequestMapping("/api/v1/enquiries")
@Tag(name = "Customer Enquiry Module", description = "Endpoints for public enquiry submissions and admin enquiry processing")
public class EnquiryController {

    private final EnquiryService enquiryService;

    /**
     * Constructor injection for EnquiryService dependency.
     *
     * @param enquiryService EnquiryService instance
     */
    public EnquiryController(EnquiryService enquiryService) {
        this.enquiryService = enquiryService;
    }

    /**
     * Public unauthenticated endpoint for submitting an event enquiry.
     *
     * @param request validated creation request payload
     * @return ResponseEntity with created EnquiryResponse DTO containing enquiry number
     */
    @PostMapping
    @Operation(summary = "Submit Public Enquiry", description = "Public endpoint for customers to submit preliminary event booking requests")
    public ResponseEntity<ApiResponse<EnquiryResponse>> createEnquiry(@Valid @RequestBody EnquiryCreateRequest request) {
        EnquiryResponse result = enquiryService.createEnquiry(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(result, "Enquiry submitted successfully. An event concierge will contact you shortly."));
    }

    /**
     * Admin endpoint retrieving paginated, filtered, searched, and sorted list of enquiries.
     *
     * @param search text search query (enquiryNumber, name, phone, email, city)
     * @param status optional status filter
     * @param eventTypeId optional event type filter
     * @param packageId optional package filter
     * @param themeId optional theme filter
     * @param startDate optional date range start
     * @param endDate optional date range end
     * @param page zero-based page index (default 0)
     * @param size page size (default 10)
     * @param sortBy field name to sort by (default createdAt)
     * @param sortDir sort direction (default desc)
     * @return ResponseEntity with PagedResponse containing EnquiryResponse DTOs
     */
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Search & Filter Enquiries (Admin)", description = "Admin endpoint retrieving paginated enquiries with multi-criteria filters", security = @SecurityRequirement(name = "BearerAuthentication"))
    public ResponseEntity<ApiResponse<PagedResponse<EnquiryResponse>>> getEnquiries(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) EnquiryStatus status,
            @RequestParam(required = false) UUID eventTypeId,
            @RequestParam(required = false) UUID packageId,
            @RequestParam(required = false) UUID themeId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {

        PagedResponse<EnquiryResponse> result = enquiryService.getEnquiries(
                search, status, eventTypeId, packageId, themeId, startDate, endDate, page, size, sortBy, sortDir
        );
        return ResponseEntity.ok(ApiResponse.success(result, "Enquiries retrieved successfully"));
    }

    /**
     * Admin endpoint retrieving specific enquiry details by UUID.
     *
     * @param id enquiry UUID
     * @return ResponseEntity with EnquiryResponse DTO
     */
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Get Enquiry Details (Admin)", description = "Retrieve full enquiry details by UUID", security = @SecurityRequirement(name = "BearerAuthentication"))
    public ResponseEntity<ApiResponse<EnquiryResponse>> getEnquiryById(@PathVariable UUID id) {
        EnquiryResponse result = enquiryService.getEnquiryById(id);
        return ResponseEntity.ok(ApiResponse.success(result, "Enquiry details retrieved successfully"));
    }

    /**
     * Admin endpoint updating enquiry workflow status and admin notes.
     *
     * @param id enquiry UUID
     * @param request status update request payload
     * @return ResponseEntity with updated EnquiryResponse DTO
     */
    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update Enquiry Status (Admin)", description = "Update enquiry workflow status and admin notes", security = @SecurityRequirement(name = "BearerAuthentication"))
    public ResponseEntity<ApiResponse<EnquiryResponse>> updateEnquiryStatus(
            @PathVariable UUID id, @Valid @RequestBody EnquiryStatusUpdateRequest request) {
        EnquiryResponse result = enquiryService.updateEnquiryStatus(id, request);
        return ResponseEntity.ok(ApiResponse.success(result, "Enquiry status updated successfully"));
    }

    /**
     * Admin endpoint soft-deleting an enquiry.
     *
     * @param id enquiry UUID
     * @return ResponseEntity success confirmation
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete Enquiry (Admin)", description = "Soft delete an enquiry record", security = @SecurityRequirement(name = "BearerAuthentication"))
    public ResponseEntity<ApiResponse<Void>> deleteEnquiry(@PathVariable UUID id) {
        enquiryService.deleteEnquiry(id);
        return ResponseEntity.ok(ApiResponse.success("Enquiry deleted successfully"));
    }
}
