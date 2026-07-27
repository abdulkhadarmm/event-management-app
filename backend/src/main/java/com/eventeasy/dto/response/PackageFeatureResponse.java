package com.eventeasy.dto.response;

import com.eventeasy.entity.PackageFeature;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

/**
 * <p>Data Transfer Object representing package feature detail.</p>
 *
 * @author EventEasy Engineering
 * @version 1.0.0
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PackageFeatureResponse {

    private UUID id;
    private String featureName;
    private Integer displayOrder;
    private Boolean activeStatus;

    /**
     * Manual entity-to-DTO conversion mapping method.
     *
     * @param entity PackageFeature entity
     * @return PackageFeatureResponse DTO
     */
    public static PackageFeatureResponse fromEntity(PackageFeature entity) {
        if (entity == null) return null;
        return PackageFeatureResponse.builder()
                .id(entity.getId())
                .featureName(entity.getFeatureName())
                .displayOrder(entity.getDisplayOrder())
                .activeStatus(entity.getActiveStatus())
                .build();
    }
}
