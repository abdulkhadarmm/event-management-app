package com.eventeasy.service;

import com.eventeasy.dto.request.EventThemeRequest;
import com.eventeasy.dto.response.EventThemeResponse;

import java.util.List;
import java.util.UUID;

/**
 * <p>Service interface declaring EventTheme management operations.</p>
 *
 * @author EventEasy Engineering
 * @version 1.0.0
 */
public interface EventThemeService {

    /**
     * Retrieve list of active public event themes.
     *
     * @return List of EventThemeResponse DTOs
     */
    List<EventThemeResponse> getActiveThemes();

    /**
     * Retrieve all non-deleted themes for admin management.
     *
     * @return List of EventThemeResponse DTOs
     */
    List<EventThemeResponse> getAllThemes();

    /**
     * Retrieve EventTheme by UUID identifier.
     *
     * @param id theme UUID
     * @return EventThemeResponse DTO
     */
    EventThemeResponse getThemeById(UUID id);

    /**
     * Create new EventTheme.
     *
     * @param request creation payload
     * @return created EventThemeResponse DTO
     */
    EventThemeResponse createTheme(EventThemeRequest request);

    /**
     * Update existing EventTheme.
     *
     * @param id theme UUID
     * @param request update payload
     * @return updated EventThemeResponse DTO
     */
    EventThemeResponse updateTheme(UUID id, EventThemeRequest request);

    /**
     * Soft delete EventTheme record.
     *
     * @param id theme UUID
     */
    void deleteTheme(UUID id);
}
