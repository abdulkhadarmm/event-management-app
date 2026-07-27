package com.eventeasy.repository;

import com.eventeasy.entity.GalleryItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * <p>Spring Data JPA repository interface for {@link GalleryItem} operations.</p>
 *
 * @author EventEasy Engineering
 * @version 1.0.0
 */
@Repository
public interface GalleryItemRepository extends JpaRepository<GalleryItem, UUID> {

    List<GalleryItem> findByActiveStatusTrueAndDeletedFalseOrderByDisplayOrderAsc();

    List<GalleryItem> findByDeletedFalseOrderByDisplayOrderAsc();

    Optional<GalleryItem> findByIdAndDeletedFalse(UUID id);
}
