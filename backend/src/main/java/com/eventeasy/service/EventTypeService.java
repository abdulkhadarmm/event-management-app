package com.eventeasy.service;

import com.eventeasy.dto.request.EventTypeRequest;
import com.eventeasy.dto.response.EventTypeResponse;

import java.util.List;
import java.util.UUID;

/**
 * <p>Service interface declaring EventType management operations.</p>
 *
 * @author EventEasy Engineering
 * @version 1.0.0
 */
public interface EventTypeService {

    /**
     * Retrieve list of all active public event types.
     *
     * @return List of EventTypeResponse DTOs
     */
    List<EventTypeResponse> getActiveEventTypes();

    /**
     * Retrieve all non-deleted event types for admin management.
     *
     * @return List of EventTypeResponse DTOs
     */
    List<EventTypeResponse> getAllEventTypes();

    /**
     * Retrieve EventType by UUID identifier.
     *
     * @param id event type UUID
     * @return EventTypeResponse DTO
     */
    EventTypeResponse getEventTypeById(UUID id);

    /**
     * Create new EventType.
     *
     * @param request creation payload
     * @return created EventTypeResponse DTO
     */
    EventTypeResponse createEventType(EventTypeRequest request);

    /**
     * Update existing EventType.
     *
     * @param id event type UUID
     * @param request update payload
     * @return updated EventTypeResponse DTO
     */
    EventTypeResponse updateEventType(UUID id, EventTypeRequest request);

    /**
     * Soft delete EventType record.
     *
     * @param id event type UUID
     */
    void deleteEventType(UUID id);
}
