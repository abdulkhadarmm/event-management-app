package com.eventeasy.controller;

import com.eventeasy.dto.request.EventThemeRequest;
import com.eventeasy.dto.response.ApiResponse;
import com.eventeasy.dto.response.EventThemeResponse;
import com.eventeasy.service.EventThemeService;
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
 * <p>REST Controller exposing public and admin endpoints for managing Event Themes.</p>
 *
 * @author EventEasy Engineering
 * @version 1.0.0
 */
@RestController
@RequestMapping("/api/v1/themes")
@Tag(name = "Event Themes Module", description = "Endpoints for retrieving and managing signature visual design themes")
public class ThemeController {

    private final EventThemeService themeService;

    /**
     * Constructor injection for EventThemeService dependency.
     *
     * @param themeService EventThemeService instance
     */
    public ThemeController(EventThemeService themeService) {
        this.themeService = themeService;
    }

    /**
     * Public endpoint retrieving active themes for website display.
     *
     * @return ResponseEntity with list of EventThemeResponse DTOs
     */
    @GetMapping
    @Operation(summary = "Get Active Themes", description = "Public endpoint listing active visual design themes")
    public ResponseEntity<ApiResponse<List<EventThemeResponse>>> getActiveThemes() {
        List<EventThemeResponse> result = themeService.getActiveThemes();
        return ResponseEntity.ok(ApiResponse.success(result, "Active themes retrieved successfully"));
    }

    /**
     * Admin endpoint retrieving all themes including inactive ones.
     *
     * @return ResponseEntity with list of EventThemeResponse DTOs
     */
    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Get All Themes (Admin)", description = "Admin endpoint listing all non-deleted themes", security = @SecurityRequirement(name = "BearerAuthentication"))
    public ResponseEntity<ApiResponse<List<EventThemeResponse>>> getAllThemes() {
        List<EventThemeResponse> result = themeService.getAllThemes();
        return ResponseEntity.ok(ApiResponse.success(result, "All themes retrieved successfully"));
    }

    /**
     * Retrieve single theme details by UUID.
     *
     * @param id theme UUID
     * @return ResponseEntity with EventThemeResponse DTO
     */
    @GetMapping("/{id}")
    @Operation(summary = "Get Theme by ID", description = "Retrieve specific visual theme details")
    public ResponseEntity<ApiResponse<EventThemeResponse>> getThemeById(@PathVariable UUID id) {
        EventThemeResponse result = themeService.getThemeById(id);
        return ResponseEntity.ok(ApiResponse.success(result, "Theme retrieved successfully"));
    }

    /**
     * Admin endpoint creating a new event theme.
     *
     * @param request creation request payload
     * @return ResponseEntity with created EventThemeResponse DTO
     */
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create Event Theme", description = "Create a new visual theme", security = @SecurityRequirement(name = "BearerAuthentication"))
    public ResponseEntity<ApiResponse<EventThemeResponse>> createTheme(@Valid @RequestBody EventThemeRequest request) {
        EventThemeResponse result = themeService.createTheme(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(result, "Theme created successfully"));
    }

    /**
     * Admin endpoint updating an existing event theme.
     *
     * @param id theme UUID
     * @param request update request payload
     * @return ResponseEntity with updated EventThemeResponse DTO
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update Event Theme", description = "Update an existing visual theme", security = @SecurityRequirement(name = "BearerAuthentication"))
    public ResponseEntity<ApiResponse<EventThemeResponse>> updateTheme(@PathVariable UUID id, @Valid @RequestBody EventThemeRequest request) {
        EventThemeResponse result = themeService.updateTheme(id, request);
        return ResponseEntity.ok(ApiResponse.success(result, "Theme updated successfully"));
    }

    /**
     * Admin endpoint soft-deleting an event theme.
     *
     * @param id theme UUID
     * @return ResponseEntity success confirmation
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete Event Theme", description = "Soft delete a visual theme", security = @SecurityRequirement(name = "BearerAuthentication"))
    public ResponseEntity<ApiResponse<Void>> deleteTheme(@PathVariable UUID id) {
        themeService.deleteTheme(id);
        return ResponseEntity.ok(ApiResponse.success("Theme deleted successfully"));
    }
}
