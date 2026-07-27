package com.eventeasy.dto.response;

import com.eventeasy.entity.EventType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * <p>Data Transfer Object representing event type category details returned to clients.</p>
 *
 * @author EventEasy Engineering
 * @version 1.0.0
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EventTypeResponse {

    private UUID id;
    private String name;
    private String code;
    private String description;
    private String iconName;
    private String imagePath;
    private Integer displayOrder;
    private Boolean activeStatus;
    private LocalDateTime createdAt;

    /**
     * Manual entity-to-DTO conversion mapping method.
     *
     * @param entity source EventType entity
     * @return EventTypeResponse DTO or null if entity is null
     */
    public static EventTypeResponse fromEntity(EventType entity) {
        if (entity == null) return null;
        return EventTypeResponse.builder()
                .id(entity.getId())
                .name(entity.getName())
                .code(entity.getCode())
                .description(entity.getDescription())
                .iconName(entity.getIconName())
                .imagePath(entity.getImagePath())
                .displayOrder(entity.getDisplayOrder())
                .activeStatus(entity.getActiveStatus())
                .createdAt(entity.getCreatedAt())
                .build();
    }
}
