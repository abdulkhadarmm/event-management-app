package com.eventeasy.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * <p>Data Transfer Object payload for package feature item.</p>
 *
 * @author EventEasy Engineering
 * @version 1.0.0
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PackageFeatureRequest {

    @NotBlank(message = "Feature name is required")
    @Size(max = 255, message = "Feature name cannot exceed 255 characters")
    private String featureName;

    @NotNull(message = "Display order is required")
    private Integer displayOrder;

    @NotNull(message = "Active status is required")
    private Boolean activeStatus;
}
