package com.eventeasy.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * <p>JPA Entity representing signature visual design themes (e.g. Royal Opulence, Boho Botanical, Sunset Velvet).</p>
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
@Table(name = "event_themes")
public class EventTheme extends BaseEntity {

    /**
     * Theme name (e.g. Midnight Opulence).
     */
    @Column(name = "name", nullable = false, length = 100)
    private String name;

    /**
     * Theme category classification (e.g. Luxury Gala & Weddings).
     */
    @Column(name = "category", nullable = false, length = 100)
    private String category;

    /**
     * Detailed theme visual description.
     */
    @Column(name = "description", length = 1000)
    private String description;

    /**
     * Media asset storage path.
     */
    @Column(name = "image_path", length = 255)
    private String imagePath;

    /**
     * Hex primary preview color code or multi-hex color palette string (e.g. #1E1B4B, #D97706, #059669, #F59E0B).
     */
    @Column(name = "accent_color", length = 255)
    private String accentColor;

    /**
     * Display order index.
     */
    @Column(name = "display_order", nullable = false)
    @Builder.Default
    private Integer displayOrder = 0;

    /**
     * Active availability flag.
     */
    @Column(name = "active_status", nullable = false)
    @Builder.Default
    private Boolean activeStatus = true;
}
