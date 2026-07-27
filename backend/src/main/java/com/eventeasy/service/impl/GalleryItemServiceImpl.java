package com.eventeasy.service.impl;

import com.eventeasy.dto.request.GalleryItemRequest;
import com.eventeasy.dto.response.GalleryItemResponse;
import com.eventeasy.entity.GalleryItem;
import com.eventeasy.exception.ResourceNotFoundException;
import com.eventeasy.repository.GalleryItemRepository;
import com.eventeasy.security.SecurityUtils;
import com.eventeasy.service.GalleryItemService;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * <p>Implementation of {@link GalleryItemService} managing portfolio celebration items.</p>
 *
 * @author EventEasy Engineering
 * @version 1.0.0
 */
@Slf4j
@Service
public class GalleryItemServiceImpl implements GalleryItemService {

    private final GalleryItemRepository repository;

    public GalleryItemServiceImpl(GalleryItemRepository repository) {
        this.repository = repository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<GalleryItemResponse> getPublicActiveGalleryItems() {
        log.debug("Fetching active public gallery items sorted by display order");
        return repository.findByActiveStatusTrueAndDeletedFalseOrderByDisplayOrderAsc()
                .stream()
                .map(GalleryItemResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<GalleryItemResponse> getAllGalleryItems() {
        log.debug("Fetching all non-deleted gallery items for administrator management");
        return repository.findByDeletedFalseOrderByDisplayOrderAsc()
                .stream()
                .map(GalleryItemResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public GalleryItemResponse getGalleryItemById(UUID id) {
        GalleryItem entity = repository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("GalleryItem", "id", id));
        return GalleryItemResponse.fromEntity(entity);
    }

    @Override
    @Transactional
    public GalleryItemResponse createGalleryItem(GalleryItemRequest request) {
        log.info("Creating new gallery celebration item: {}", request.getTitle());

        GalleryItem entity = GalleryItem.builder()
                .title(request.getTitle())
                .location(request.getLocation())
                .category(request.getCategory())
                .year(request.getYear())
                .imagePath(request.getImagePath())
                .displayOrder(request.getDisplayOrder() != null ? request.getDisplayOrder() : 0)
                .activeStatus(request.getActiveStatus() != null ? request.getActiveStatus() : true)
                .build();

        GalleryItem saved = repository.save(entity);
        return GalleryItemResponse.fromEntity(saved);
    }

    @Override
    @Transactional
    public GalleryItemResponse updateGalleryItem(UUID id, GalleryItemRequest request) {
        log.info("Updating gallery celebration item ID: {}", id);

        GalleryItem entity = repository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("GalleryItem", "id", id));

        entity.setTitle(request.getTitle());
        entity.setLocation(request.getLocation());
        entity.setCategory(request.getCategory());
        entity.setYear(request.getYear());
        entity.setImagePath(request.getImagePath());

        if (request.getDisplayOrder() != null) {
            entity.setDisplayOrder(request.getDisplayOrder());
        }
        if (request.getActiveStatus() != null) {
            entity.setActiveStatus(request.getActiveStatus());
        }

        GalleryItem updated = repository.save(entity);
        return GalleryItemResponse.fromEntity(updated);
    }

    @Override
    @Transactional
    public void deleteGalleryItem(UUID id) {
        log.info("Soft-deleting gallery item ID: {}", id);
        GalleryItem entity = repository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("GalleryItem", "id", id));

        String currentUser = SecurityUtils.getCurrentUserEmail().orElse("SYSTEM");
        entity.markAsDeleted(currentUser);
        repository.save(entity);
    }
}
