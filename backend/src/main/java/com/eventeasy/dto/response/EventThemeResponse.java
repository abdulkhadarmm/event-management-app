package com.eventeasy.dto.response;

import com.eventeasy.entity.EventTheme;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * <p>Data Transfer Object representing EventTheme details returned to clients.</p>
 *
 * @author EventEasy Engineering
 * @version 1.0.0
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EventThemeResponse {

    private UUID id;
    private String name;
    private String category;
    private String description;
    private String imagePath;
    private String accentColor;
    private Integer displayOrder;
    private Boolean activeStatus;
    private LocalDateTime createdAt;

    /**
     * Manual entity-to-DTO conversion mapping method.
     *
     * @param entity source EventTheme entity
     * @return EventThemeResponse DTO or null if entity is null
     */
    public static EventThemeResponse fromEntity(EventTheme entity) {
        if (entity == null) return null;
        return EventThemeResponse.builder()
                .id(entity.getId())
                .name(entity.getName())
                .category(entity.getCategory())
                .description(entity.getDescription())
                .imagePath(entity.getImagePath())
                .accentColor(entity.getAccentColor())
                .displayOrder(entity.getDisplayOrder())
                .activeStatus(entity.getActiveStatus())
                .createdAt(entity.getCreatedAt())
                .build();
    }
}
