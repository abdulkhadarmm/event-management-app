package com.eventeasy.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * <p>DTO payload for creating or updating gallery items.</p>
 *
 * @author EventEasy Engineering
 * @version 1.0.0
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GalleryItemRequest {

    @NotBlank(message = "Title is required")
    @Size(max = 150, message = "Title cannot exceed 150 characters")
    private String title;

    @NotBlank(message = "Location is required")
    @Size(max = 150, message = "Location cannot exceed 150 characters")
    private String location;

    @NotBlank(message = "Category tag is required")
    @Size(max = 100, message = "Category tag cannot exceed 100 characters")
    private String category;

    @NotBlank(message = "Year is required")
    @Size(max = 10, message = "Year cannot exceed 10 characters")
    private String year;

    @Size(max = 500, message = "Image path cannot exceed 500 characters")
    private String imagePath;

    @NotNull(message = "Display order is required")
    private Integer displayOrder;

    private Boolean activeStatus;
}
