package com.eventeasy.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

/**
 * <p>JPA Entity representing a recent celebration item featured in the public portfolio gallery.</p>
 *
 * @author EventEasy Engineering
 * @version 1.0.0
 */
@Entity
@Table(name = "gallery_items")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GalleryItem extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @NotBlank(message = "Title is required")
    @Column(name = "title", nullable = false, length = 150)
    private String title;

    @NotBlank(message = "Location is required")
    @Column(name = "location", nullable = false, length = 150)
    private String location;

    @NotBlank(message = "Category tag is required")
    @Column(name = "category", nullable = false, length = 100)
    private String category;

    @NotBlank(message = "Year is required")
    @Column(name = "year", nullable = false, length = 10)
    private String year;

    @Column(name = "image_path", length = 500)
    private String imagePath;

    @Column(name = "display_order", nullable = false)
    private int displayOrder;

    @Column(name = "active_status", nullable = false)
    private boolean activeStatus;
}
