package com.eventeasy.service;

import com.eventeasy.dto.request.EventPackageRequest;
import com.eventeasy.dto.response.EventPackageResponse;

import java.util.List;
import java.util.UUID;

/**
 * <p>Service interface declaring EventPackage management operations.</p>
 *
 * @author EventEasy Engineering
 * @version 1.0.0
 */
public interface EventPackageService {

    /**
     * Retrieve list of active public event packages.
     *
     * @return List of EventPackageResponse DTOs
     */
    List<EventPackageResponse> getActivePackages();

    /**
     * Retrieve all non-deleted packages for admin management.
     *
     * @return List of EventPackageResponse DTOs
     */
    List<EventPackageResponse> getAllPackages();

    /**
     * Retrieve EventPackage by UUID identifier.
     *
     * @param id package UUID
     * @return EventPackageResponse DTO
     */
    EventPackageResponse getPackageById(UUID id);

    /**
     * Create new EventPackage with nested features.
     *
     * @param request creation payload
     * @return created EventPackageResponse DTO
     */
    EventPackageResponse createPackage(EventPackageRequest request);

    /**
     * Update existing EventPackage.
     *
     * @param id package UUID
     * @param request update payload
     * @return updated EventPackageResponse DTO
     */
    EventPackageResponse updatePackage(UUID id, EventPackageRequest request);

    /**
     * Soft delete EventPackage record.
     *
     * @param id package UUID
     */
    void deletePackage(UUID id);
}
