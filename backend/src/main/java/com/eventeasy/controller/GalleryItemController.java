package com.eventeasy.controller;

import com.eventeasy.dto.request.GalleryItemRequest;
import com.eventeasy.dto.response.ApiResponse;
import com.eventeasy.dto.response.GalleryItemResponse;
import com.eventeasy.service.GalleryItemService;

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
 * <p>REST Controller exposing public and administrator endpoints for recent celebrations portfolio gallery items.</p>
 *
 * @author EventEasy Engineering
 * @version 1.0.0
 */
@RestController
@RequestMapping("/api/v1/gallery")
@Tag(name = "Gallery Module", description = "Endpoints for public celebration portfolio gallery and admin management")
public class GalleryItemController {

    private final GalleryItemService service;

    public GalleryItemController(GalleryItemService service) {
        this.service = service;
    }

    @GetMapping
    @Operation(summary = "Get Public Active Celebrations", description = "Retrieve active celebration gallery items sorted by display order for public viewing")
    public ResponseEntity<ApiResponse<List<GalleryItemResponse>>> getPublicActiveGalleryItems() {
        List<GalleryItemResponse> result = service.getPublicActiveGalleryItems();
        return ResponseEntity.ok(ApiResponse.success(result, "Active gallery items retrieved successfully"));
    }

    @GetMapping("/admin/all")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Get All Celebrations (Admin)", description = "Retrieve all gallery items including inactive ones for administration", security = @SecurityRequirement(name = "BearerAuthentication"))
    public ResponseEntity<ApiResponse<List<GalleryItemResponse>>> getAllGalleryItems() {
        List<GalleryItemResponse> result = service.getAllGalleryItems();
        return ResponseEntity.ok(ApiResponse.success(result, "All gallery items retrieved successfully"));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get Celebration by ID", description = "Retrieve single celebration item by UUID")
    public ResponseEntity<ApiResponse<GalleryItemResponse>> getGalleryItemById(@PathVariable UUID id) {
        GalleryItemResponse result = service.getGalleryItemById(id);
        return ResponseEntity.ok(ApiResponse.success(result, "Gallery item details retrieved successfully"));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create Celebration Item (Admin)", description = "Create a new recent celebration item", security = @SecurityRequirement(name = "BearerAuthentication"))
    public ResponseEntity<ApiResponse<GalleryItemResponse>> createGalleryItem(@Valid @RequestBody GalleryItemRequest request) {
        GalleryItemResponse result = service.createGalleryItem(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(result, "Gallery celebration item created successfully"));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update Celebration Item (Admin)", description = "Update existing celebration item details", security = @SecurityRequirement(name = "BearerAuthentication"))
    public ResponseEntity<ApiResponse<GalleryItemResponse>> updateGalleryItem(
            @PathVariable UUID id, @Valid @RequestBody GalleryItemRequest request) {
        GalleryItemResponse result = service.updateGalleryItem(id, request);
        return ResponseEntity.ok(ApiResponse.success(result, "Gallery celebration item updated successfully"));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete Celebration Item (Admin)", description = "Soft delete a celebration item", security = @SecurityRequirement(name = "BearerAuthentication"))
    public ResponseEntity<ApiResponse<Void>> deleteGalleryItem(@PathVariable UUID id) {
        service.deleteGalleryItem(id);
        return ResponseEntity.ok(ApiResponse.success("Gallery celebration item deleted successfully"));
    }
}
