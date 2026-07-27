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
 * <p>JPA Entity representing event type categories (e.g. Wedding, Corporate Event, Birthday).</p>
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
@Table(name = "event_types")
public class EventType extends BaseEntity {

    /**
     * Display name of event type (e.g. Luxury Wedding).
     */
    @Column(name = "name", nullable = false, length = 100)
    private String name;

    /**
     * Unique URL-friendly code identifier (e.g. wedding, corporate-gala).
     */
    @Column(name = "code", nullable = false, unique = true, length = 100)
    private String code;

    /**
     * Detailed description of event category offerings.
     */
    @Column(name = "description", length = 1000)
    private String description;

    /**
     * Frontend icon identifier name (e.g. celebration, diamond, favorite).
     */
    @Column(name = "icon_name", length = 50)
    private String iconName;

    /**
     * Media asset storage path (e.g. /assets/images/events/wedding.jpg).
     */
    @Column(name = "image_path", length = 255)
    private String imagePath;

    /**
     * UI display ordering index.
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
}
