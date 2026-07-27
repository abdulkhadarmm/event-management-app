package com.eventeasy.controller;

import com.eventeasy.dto.request.EventTypeRequest;
import com.eventeasy.dto.response.ApiResponse;
import com.eventeasy.dto.response.EventTypeResponse;
import com.eventeasy.service.EventTypeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

/**
 * <p>REST Controller exposing public and admin endpoints for managing Event Types.</p>
 *
 * @author EventEasy Engineering
 * @version 1.0.0
 */
@RestController
@RequestMapping("/api/v1/event-types")
@Tag(name = "Event Types Module", description = "Endpoints for retrieving and managing event category offerings")
public class EventTypeController {

    private final EventTypeService eventTypeService;

    /**
     * Constructor injection for EventTypeService dependency.
     *
     * @param eventTypeService EventTypeService instance
     */
    public EventTypeController(EventTypeService eventTypeService) {
        this.eventTypeService = eventTypeService;
    }

    /**
     * Public endpoint retrieving all active event types for website display.
     *
     * @return ResponseEntity with list of EventTypeResponse DTOs
     */
    @GetMapping
    @Operation(summary = "Get Active Event Types", description = "Public endpoint listing active event categories")
    public ResponseEntity<ApiResponse<List<EventTypeResponse>>> getActiveEventTypes() {
        List<EventTypeResponse> result = eventTypeService.getActiveEventTypes();
        return ResponseEntity.ok(ApiResponse.success(result, "Active event types retrieved successfully"));
    }

    /**
     * Admin endpoint retrieving all event types including inactive records.
     *
     * @return ResponseEntity with list of EventTypeResponse DTOs
     */
    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Get All Event Types (Admin)", description = "Admin endpoint listing all non-deleted event types", security = @SecurityRequirement(name = "BearerAuthentication"))
    public ResponseEntity<ApiResponse<List<EventTypeResponse>>> getAllEventTypes() {
        List<EventTypeResponse> result = eventTypeService.getAllEventTypes();
        return ResponseEntity.ok(ApiResponse.success(result, "All event types retrieved successfully"));
    }

    /**
     * Retrieve single event type details by UUID.
     *
     * @param id event type UUID
     * @return ResponseEntity with EventTypeResponse DTO
     */
    @GetMapping("/{id}")
    @Operation(summary = "Get Event Type by ID", description = "Retrieve specific event type details")
    public ResponseEntity<ApiResponse<EventTypeResponse>> getEventTypeById(@PathVariable UUID id) {
        EventTypeResponse result = eventTypeService.getEventTypeById(id);
        return ResponseEntity.ok(ApiResponse.success(result, "Event type retrieved successfully"));
    }

    /**
     * Admin endpoint creating a new event type.
     *
     * @param request creation request payload
     * @return ResponseEntity with created EventTypeResponse DTO
     */
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create Event Type", description = "Create a new event type category", security = @SecurityRequirement(name = "BearerAuthentication"))
    public ResponseEntity<ApiResponse<EventTypeResponse>> createEventType(@Valid @RequestBody EventTypeRequest request) {
        EventTypeResponse result = eventTypeService.createEventType(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(result, "Event type created successfully"));
    }

    /**
     * Admin endpoint updating an existing event type.
     *
     * @param id event type UUID
     * @param request update request payload
     * @return ResponseEntity with updated EventTypeResponse DTO
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update Event Type", description = "Update an existing event type", security = @SecurityRequirement(name = "BearerAuthentication"))
    public ResponseEntity<ApiResponse<EventTypeResponse>> updateEventType(@PathVariable UUID id, @Valid @RequestBody EventTypeRequest request) {
        EventTypeResponse result = eventTypeService.updateEventType(id, request);
        return ResponseEntity.ok(ApiResponse.success(result, "Event type updated successfully"));
    }

    /**
     * Admin endpoint soft-deleting an event type.
     *
     * @param id event type UUID
     * @return ResponseEntity success confirmation
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete Event Type", description = "Soft delete an event type category", security = @SecurityRequirement(name = "BearerAuthentication"))
    public ResponseEntity<ApiResponse<Void>> deleteEventType(@PathVariable UUID id) {
        eventTypeService.deleteEventType(id);
        return ResponseEntity.ok(ApiResponse.success("Event type deleted successfully"));
    }
}
