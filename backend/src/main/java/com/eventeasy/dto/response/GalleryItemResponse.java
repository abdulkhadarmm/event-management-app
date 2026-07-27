package com.eventeasy.dto.response;

import com.eventeasy.entity.GalleryItem;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * <p>DTO response representing a recent celebration item.</p>
 *
 * @author EventEasy Engineering
 * @version 1.0.0
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GalleryItemResponse {

    private UUID id;
    private String title;
    private String location;
    private String category;
    private String year;
    private String imagePath;
    private int displayOrder;
    private boolean activeStatus;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public static GalleryItemResponse fromEntity(GalleryItem entity) {
        if (entity == null) return null;
        return GalleryItemResponse.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .location(entity.getLocation())
                .category(entity.getCategory())
                .year(entity.getYear())
                .imagePath(entity.getImagePath())
                .displayOrder(entity.getDisplayOrder())
                .activeStatus(entity.isActiveStatus())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
}
