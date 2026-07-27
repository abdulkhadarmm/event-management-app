package com.eventeasy.service.impl;

import com.eventeasy.dto.request.EventPackageRequest;
import com.eventeasy.dto.response.EventPackageResponse;
import com.eventeasy.entity.EventPackage;
import com.eventeasy.entity.PackageFeature;
import com.eventeasy.exception.ResourceNotFoundException;
import com.eventeasy.repository.EventPackageRepository;
import com.eventeasy.security.SecurityUtils;
import com.eventeasy.service.EventPackageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * <p>Implementation of {@link EventPackageService} performing EventPackage CRUD business logic.</p>
 *
 * @author EventEasy Engineering
 * @version 1.0.0
 */
@Slf4j
@Service
public class EventPackageServiceImpl implements EventPackageService {

    private final EventPackageRepository packageRepository;

    /**
     * Constructor injection for EventPackageRepository dependency.
     *
     * @param packageRepository EventPackageRepository instance
     */
    public EventPackageServiceImpl(EventPackageRepository packageRepository) {
        this.packageRepository = packageRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<EventPackageResponse> getActivePackages() {
        log.debug("Fetching active event packages");
        return packageRepository.findByActiveStatusTrueAndDeletedFalseOrderByDisplayOrderAsc()
                .stream()
                .map(EventPackageResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<EventPackageResponse> getAllPackages() {
        log.debug("Fetching all event packages for admin management");
        return packageRepository.findByDeletedFalseOrderByDisplayOrderAsc()
                .stream()
                .map(EventPackageResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public EventPackageResponse getPackageById(UUID id) {
        log.debug("Fetching event package by ID: {}", id);
        EventPackage entity = packageRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("EventPackage", "id", id));
        return EventPackageResponse.fromEntity(entity);
    }

    @Override
    @Transactional
    public EventPackageResponse createPackage(EventPackageRequest request) {
        log.info("Creating new event package: {}", request.getName());

        EventPackage packageEntity = EventPackage.builder()
                .name(request.getName())
                .subtitle(request.getSubtitle())
                .description(request.getDescription())
                .price(request.getPrice())
                .imagePath(request.getImagePath())
                .popularFlag(request.getPopularFlag())
                .displayOrder(request.getDisplayOrder())
                .activeStatus(request.getActiveStatus())
                .build();

        if (request.getFeatures() != null && !request.getFeatures().isEmpty()) {
            request.getFeatures().forEach(featureReq -> {
                PackageFeature feature = PackageFeature.builder()
                        .featureName(featureReq.getFeatureName())
                        .displayOrder(featureReq.getDisplayOrder())
                        .activeStatus(featureReq.getActiveStatus())
                        .build();
                packageEntity.addFeature(feature);
            });
        }

        EventPackage saved = packageRepository.save(packageEntity);
        return EventPackageResponse.fromEntity(saved);
    }

    @Override
    @Transactional
    public EventPackageResponse updatePackage(UUID id, EventPackageRequest request) {
        log.info("Updating event package ID: {}", id);

        EventPackage packageEntity = packageRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("EventPackage", "id", id));

        packageEntity.setName(request.getName());
        packageEntity.setSubtitle(request.getSubtitle());
        packageEntity.setDescription(request.getDescription());
        packageEntity.setPrice(request.getPrice());
        packageEntity.setImagePath(request.getImagePath());
        packageEntity.setPopularFlag(request.getPopularFlag());
        packageEntity.setDisplayOrder(request.getDisplayOrder());
        packageEntity.setActiveStatus(request.getActiveStatus());

        packageEntity.getFeatures().clear();

        if (request.getFeatures() != null && !request.getFeatures().isEmpty()) {
            request.getFeatures().forEach(featureReq -> {
                PackageFeature feature = PackageFeature.builder()
                        .featureName(featureReq.getFeatureName())
                        .displayOrder(featureReq.getDisplayOrder())
                        .activeStatus(featureReq.getActiveStatus())
                        .build();
                packageEntity.addFeature(feature);
            });
        }

        EventPackage updated = packageRepository.save(packageEntity);
        return EventPackageResponse.fromEntity(updated);
    }

    @Override
    @Transactional
    public void deletePackage(UUID id) {
        log.info("Soft deleting event package ID: {}", id);
        EventPackage entity = packageRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("EventPackage", "id", id));

        String currentUser = SecurityUtils.getCurrentUserEmail().orElse("SYSTEM");
        entity.markAsDeleted(currentUser);
        packageRepository.save(entity);
    }
}
