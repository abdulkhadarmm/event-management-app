package com.eventeasy.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * <p>Data Transfer Object payload for creating or updating an EventTheme.</p>
 *
 * @author EventEasy Engineering
 * @version 1.0.0
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EventThemeRequest {

    @NotBlank(message = "Theme name is required")
    @Size(max = 100, message = "Theme name cannot exceed 100 characters")
    private String name;

    @NotBlank(message = "Category is required")
    @Size(max = 100, message = "Category cannot exceed 100 characters")
    private String category;

    @Size(max = 1000, message = "Description cannot exceed 1000 characters")
    private String description;

    @Size(max = 255, message = "Image path cannot exceed 255 characters")
    private String imagePath;

    @Size(max = 30, message = "Accent color cannot exceed 30 characters")
    private String accentColor;

    @NotNull(message = "Display order is required")
    private Integer displayOrder;

    @NotNull(message = "Active status is required")
    private Boolean activeStatus;
}
