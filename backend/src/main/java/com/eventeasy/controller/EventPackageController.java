package com.eventeasy.controller;

import com.eventeasy.dto.request.EventPackageRequest;
import com.eventeasy.dto.response.ApiResponse;
import com.eventeasy.dto.response.EventPackageResponse;
import com.eventeasy.service.EventPackageService;
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
 * <p>REST Controller exposing public and admin endpoints for managing Event Packages.</p>
 *
 * @author EventEasy Engineering
 * @version 1.0.0
 */
@RestController
@RequestMapping("/api/v1/packages")
@Tag(name = "Event Packages Module", description = "Endpoints for retrieving and managing event pricing packages")
public class EventPackageController {

    private final EventPackageService packageService;

    /**
     * Constructor injection for EventPackageService dependency.
     *
     * @param packageService EventPackageService instance
     */
    public EventPackageController(EventPackageService packageService) {
        this.packageService = packageService;
    }

    /**
     * Public endpoint retrieving active packages for website display.
     *
     * @return ResponseEntity with list of EventPackageResponse DTOs
     */
    @GetMapping
    @Operation(summary = "Get Active Packages", description = "Public endpoint listing active event pricing packages")
    public ResponseEntity<ApiResponse<List<EventPackageResponse>>> getActivePackages() {
        List<EventPackageResponse> result = packageService.getActivePackages();
        return ResponseEntity.ok(ApiResponse.success(result, "Active packages retrieved successfully"));
    }

    /**
     * Admin endpoint retrieving all packages including inactive ones.
     *
     * @return ResponseEntity with list of EventPackageResponse DTOs
     */
    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Get All Packages (Admin)", description = "Admin endpoint listing all non-deleted event packages", security = @SecurityRequirement(name = "BearerAuthentication"))
    public ResponseEntity<ApiResponse<List<EventPackageResponse>>> getAllPackages() {
        List<EventPackageResponse> result = packageService.getAllPackages();
        return ResponseEntity.ok(ApiResponse.success(result, "All packages retrieved successfully"));
    }

    /**
     * Retrieve single package details by UUID.
     *
     * @param id package UUID
     * @return ResponseEntity with EventPackageResponse DTO
     */
    @GetMapping("/{id}")
    @Operation(summary = "Get Package by ID", description = "Retrieve specific event package details")
    public ResponseEntity<ApiResponse<EventPackageResponse>> getPackageById(@PathVariable UUID id) {
        EventPackageResponse result = packageService.getPackageById(id);
        return ResponseEntity.ok(ApiResponse.success(result, "Package retrieved successfully"));
    }

    /**
     * Admin endpoint creating a new event package.
     *
     * @param request creation request payload
     * @return ResponseEntity with created EventPackageResponse DTO
     */
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create Event Package", description = "Create a new pricing package", security = @SecurityRequirement(name = "BearerAuthentication"))
    public ResponseEntity<ApiResponse<EventPackageResponse>> createPackage(@Valid @RequestBody EventPackageRequest request) {
        EventPackageResponse result = packageService.createPackage(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(result, "Package created successfully"));
    }

    /**
     * Admin endpoint updating an existing event package.
     *
     * @param id package UUID
     * @param request update request payload
     * @return ResponseEntity with updated EventPackageResponse DTO
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update Event Package", description = "Update an existing pricing package", security = @SecurityRequirement(name = "BearerAuthentication"))
    public ResponseEntity<ApiResponse<EventPackageResponse>> updatePackage(@PathVariable UUID id, @Valid @RequestBody EventPackageRequest request) {
        EventPackageResponse result = packageService.updatePackage(id, request);
        return ResponseEntity.ok(ApiResponse.success(result, "Package updated successfully"));
    }

    /**
     * Admin endpoint soft-deleting an event package.
     *
     * @param id package UUID
     * @return ResponseEntity success confirmation
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete Event Package", description = "Soft delete a pricing package", security = @SecurityRequirement(name = "BearerAuthentication"))
    public ResponseEntity<ApiResponse<Void>> deletePackage(@PathVariable UUID id) {
        packageService.deletePackage(id);
        return ResponseEntity.ok(ApiResponse.success("Package deleted successfully"));
    }
}
