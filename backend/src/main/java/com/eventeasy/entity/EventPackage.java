package com.eventeasy.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * <p>JPA Entity representing structured event service pricing packages (e.g. Silver, Gold, Platinum, Royal Signature).</p>
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
@Table(name = "event_packages")
public class EventPackage extends BaseEntity {

    /**
     * Package title name (e.g. Royal Signature Experience).
     */
    @Column(name = "name", nullable = false, length = 100)
    private String name;

    /**
     * Subtitle summary description.
     */
    @Column(name = "subtitle", length = 255)
    private String subtitle;

    /**
     * Full detailed package overview.
     */
    @Column(name = "description", length = 1000)
    private String description;

    /**
     * Package base price amount.
     */
    @Column(name = "price", nullable = false, precision = 12, scale = 2)
    private BigDecimal price;

    /**
     * Media asset storage path (e.g. /assets/images/packages/royal.jpg).
     */
    @Column(name = "image_path", length = 255)
    private String imagePath;

    /**
     * Flag indicating if package is highlighted as Most Popular.
     */
    @Column(name = "popular_flag", nullable = false)
    @Builder.Default
    private Boolean popularFlag = false;

    /**
     * Display order sequence index.
     */
    @Column(name = "display_order", nullable = false)
    @Builder.Default
    private Integer displayOrder = 0;

    /**
     * Active availability status.
     */
    @Column(name = "active_status", nullable = false)
    @Builder.Default
    private Boolean activeStatus = true;

    /**
     * List of included package features linked via PackageFeature entity relationship.
     */
    @OneToMany(mappedBy = "eventPackage", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @OrderBy("displayOrder ASC")
    @Builder.Default
    private List<PackageFeature> features = new ArrayList<>();

    /**
     * Helper method to add feature item maintaining bidirectional link.
     *
     * @param feature PackageFeature instance
     */
    public void addFeature(PackageFeature feature) {
        features.add(feature);
        feature.setEventPackage(this);
    }
}
