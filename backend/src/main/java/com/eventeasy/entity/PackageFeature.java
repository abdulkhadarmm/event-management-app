package com.eventeasy.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * <p>JPA Entity representing individual features included within an {@link EventPackage}.</p>
 *
 * @author EventEasy Engineering
 * @version 1.0.0
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "package_features")
public class PackageFeature extends BaseEntity {

    /**
     * Text description of feature inclusion.
     */
    @Column(name = "feature_name", nullable = false, length = 255)
    private String featureName;

    /**
     * UI display sequence order.
     */
    @Column(name = "display_order", nullable = false)
    @Builder.Default
    private Integer displayOrder = 0;

    /**
     * Active feature status flag.
     */
    @Column(name = "active_status", nullable = false)
    @Builder.Default
    private Boolean activeStatus = true;

    /**
     * Parent EventPackage relationship link.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "event_package_id", nullable = false)
    private EventPackage eventPackage;
}
