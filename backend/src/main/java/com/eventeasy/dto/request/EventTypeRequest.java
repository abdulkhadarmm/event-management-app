package com.eventeasy.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * <p>Data Transfer Object payload for creating or updating an EventType.</p>
 *
 * @author EventEasy Engineering
 * @version 1.0.0
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EventTypeRequest {

    @NotBlank(message = "Event type name is required")
    @Size(max = 100, message = "Name cannot exceed 100 characters")
    private String name;

    @NotBlank(message = "Event type unique code is required")
    @Size(max = 100, message = "Code cannot exceed 100 characters")
    private String code;

    @Size(max = 1000, message = "Description cannot exceed 1000 characters")
    private String description;

    @Size(max = 50, message = "Icon name cannot exceed 50 characters")
    private String iconName;

    @Size(max = 255, message = "Image path cannot exceed 255 characters")
    private String imagePath;

    @NotNull(message = "Display order is required")
    private Integer displayOrder;

    @NotNull(message = "Active status is required")
    private Boolean activeStatus;
}
