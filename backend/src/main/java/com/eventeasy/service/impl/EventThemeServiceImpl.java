package com.eventeasy.service.impl;

import com.eventeasy.dto.request.EventThemeRequest;
import com.eventeasy.dto.response.EventThemeResponse;
import com.eventeasy.entity.EventTheme;
import com.eventeasy.exception.ResourceNotFoundException;
import com.eventeasy.repository.EventThemeRepository;
import com.eventeasy.security.SecurityUtils;
import com.eventeasy.service.EventThemeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * <p>Implementation of {@link EventThemeService} performing EventTheme CRUD business logic.</p>
 *
 * @author EventEasy Engineering
 * @version 1.0.0
 */
@Slf4j
@Service
public class EventThemeServiceImpl implements EventThemeService {

    private final EventThemeRepository themeRepository;

    /**
     * Constructor injection for EventThemeRepository dependency.
     *
     * @param themeRepository EventThemeRepository instance
     */
    public EventThemeServiceImpl(EventThemeRepository themeRepository) {
        this.themeRepository = themeRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<EventThemeResponse> getActiveThemes() {
        log.debug("Fetching active event themes");
        return themeRepository.findByActiveStatusTrueAndDeletedFalseOrderByDisplayOrderAsc()
                .stream()
                .map(EventThemeResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<EventThemeResponse> getAllThemes() {
        log.debug("Fetching all event themes for admin management");
        return themeRepository.findByDeletedFalseOrderByDisplayOrderAsc()
                .stream()
                .map(EventThemeResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public EventThemeResponse getThemeById(UUID id) {
        log.debug("Fetching event theme by ID: {}", id);
        EventTheme entity = themeRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("EventTheme", "id", id));
        return EventThemeResponse.fromEntity(entity);
    }

    @Override
    @Transactional
    public EventThemeResponse createTheme(EventThemeRequest request) {
        log.info("Creating new event theme: {}", request.getName());

        EventTheme themeEntity = EventTheme.builder()
                .name(request.getName())
                .category(request.getCategory())
                .description(request.getDescription())
                .imagePath(request.getImagePath())
                .accentColor(request.getAccentColor())
                .displayOrder(request.getDisplayOrder())
                .activeStatus(request.getActiveStatus())
                .build();

        EventTheme saved = themeRepository.save(themeEntity);
        return EventThemeResponse.fromEntity(saved);
    }

    @Override
    @Transactional
    public EventThemeResponse updateTheme(UUID id, EventThemeRequest request) {
        log.info("Updating event theme ID: {}", id);

        EventTheme themeEntity = themeRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("EventTheme", "id", id));

        themeEntity.setName(request.getName());
        themeEntity.setCategory(request.getCategory());
        themeEntity.setDescription(request.getDescription());
        themeEntity.setImagePath(request.getImagePath());
        themeEntity.setAccentColor(request.getAccentColor());
        themeEntity.setDisplayOrder(request.getDisplayOrder());
        themeEntity.setActiveStatus(request.getActiveStatus());

        EventTheme updated = themeRepository.save(themeEntity);
        return EventThemeResponse.fromEntity(updated);
    }

    @Override
    @Transactional
    public void deleteTheme(UUID id) {
        log.info("Soft deleting event theme ID: {}", id);
        EventTheme entity = themeRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new ResourceNotFoundException("EventTheme", "id", id));

        String currentUser = SecurityUtils.getCurrentUserEmail().orElse("SYSTEM");
        entity.markAsDeleted(currentUser);
        themeRepository.save(entity);
    }
}
