package com.eventeasy.dto.response;

import com.eventeasy.entity.EventPackage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * <p>Data Transfer Object representing EventPackage details returned to clients.</p>
 *
 * @author EventEasy Engineering
 * @version 1.0.0
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EventPackageResponse {

    private UUID id;
    private String name;
    private String subtitle;
    private String description;
    private BigDecimal price;
    private String imagePath;
    private Boolean popularFlag;
    private Integer displayOrder;
    private Boolean activeStatus;
    private List<PackageFeatureResponse> features;
    private LocalDateTime createdAt;

    /**
     * Manual entity-to-DTO conversion mapping method.
     *
     * @param entity source EventPackage entity
     * @return EventPackageResponse DTO or null if entity is null
     */
    public static EventPackageResponse fromEntity(EventPackage entity) {
        if (entity == null) return null;

        List<PackageFeatureResponse> featureResponses = entity.getFeatures() != null
                ? entity.getFeatures().stream()
                .map(PackageFeatureResponse::fromEntity)
                .collect(Collectors.toList())
                : List.of();

        return EventPackageResponse.builder()
                .id(entity.getId())
                .name(entity.getName())
                .subtitle(entity.getSubtitle())
                .description(entity.getDescription())
                .price(entity.getPrice())
                .imagePath(entity.getImagePath())
                .popularFlag(entity.getPopularFlag())
                .displayOrder(entity.getDisplayOrder())
                .activeStatus(entity.getActiveStatus())
                .features(featureResponses)
                .createdAt(entity.getCreatedAt())
                .build();
    }
}
