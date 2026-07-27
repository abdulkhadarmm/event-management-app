package com.eventeasy.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

/**
 * <p>Data Transfer Object payload for creating or updating an EventPackage.</p>
 *
 * @author EventEasy Engineering
 * @version 1.0.0
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EventPackageRequest {

    @NotBlank(message = "Package name is required")
    @Size(max = 100, message = "Name cannot exceed 100 characters")
    private String name;

    @Size(max = 255, message = "Subtitle cannot exceed 255 characters")
    private String subtitle;

    @Size(max = 1000, message = "Description cannot exceed 1000 characters")
    private String description;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.00", message = "Price must be greater than or equal to zero")
    private BigDecimal price;

    @Size(max = 255, message = "Image path cannot exceed 255 characters")
    private String imagePath;

    @NotNull(message = "Popular flag is required")
    private Boolean popularFlag;

    @NotNull(message = "Display order is required")
    private Integer displayOrder;

    @NotNull(message = "Active status is required")
    private Boolean activeStatus;

    @Valid
    private List<PackageFeatureRequest> features;
}
