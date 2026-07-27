package com.eventeasy.service.impl;

import com.eventeasy.dto.request.EventTypeRequest;
import com.eventeasy.dto.response.EventTypeResponse;
import com.eventeasy.entity.EventType;
import com.eventeasy.exception.BadRequestException;
import com.eventeasy.exception.ResourceNotFoundException;
import com.eventeasy.repository.EventTypeRepository;
import com.eventeasy.security.SecurityUtils;
import com.eventeasy.service.EventTypeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * <p>Implementation of {@link EventTypeService} performing EventType CRUD business logic.</p>
 *
 * @author EventEasy Engineering
 * @version 1.0.0
 */
@Slf4j
@Service
public class EventTypeServiceImpl implements EventTypeService {

    private final EventTypeRepository eventTypeRepository;

    /**
     * Constructor injection for EventTypeRepository dependency.
     *
     * @param eventTypeRepository EventTypeRepository instance
     */
    public EventTypeServiceImpl(EventTypeRepository eventTypeRepository) {
        this.eventTypeRepository = eventTypeRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<EventTypeResponse> getActiveEventTypes() {
        log.debug("Fetching active event types for public display");
        return eventTypeRepository.findByActiveStatusTrueAndDeletedFalseOrderByDisplayOrderAsc()
                .stream()
                .map(EventTypeResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<EventTypeResponse> getAllEventTypes() {
        log.debug("Fetching all event types for admin management");
        return eventTypeRepository.findByDeletedFalseOrderByDisplayOrderAsc()
                .stream()
                .map(EventTypeResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public EventTypeResponse getEventTypeById(UUID id) {
        log.debug("Fetching event type by ID: {}", id);
        EventType entity = eventTypeRepository.findById(id)
                .filter(e -> !e.isDeleted())
                .orElseThrow(() -> new ResourceNotFoundException("EventType", "id", id));
        return EventTypeResponse.fromEntity(entity);
    }

    @Override
    @Transactional
    public EventTypeResponse createEventType(EventTypeRequest request) {
        log.info("Creating new event type with code: {}", request.getCode());

        if (eventTypeRepository.existsByCodeAndDeletedFalse(request.getCode())) {
            throw new BadRequestException("An event type with code '" + request.getCode() + "' already exists.");
        }

        EventType entity = EventType.builder()
                .name(request.getName())
                .code(request.getCode())
                .description(request.getDescription())
                .iconName(request.getIconName())
                .imagePath(request.getImagePath())
                .displayOrder(request.getDisplayOrder())
                .activeStatus(request.getActiveStatus())
                .build();

        EventType saved = eventTypeRepository.save(entity);
        return EventTypeResponse.fromEntity(saved);
    }

    @Override
    @Transactional
    public EventTypeResponse updateEventType(UUID id, EventTypeRequest request) {
        log.info("Updating event type ID: {}", id);

        EventType entity = eventTypeRepository.findById(id)
                .filter(e -> !e.isDeleted())
                .orElseThrow(() -> new ResourceNotFoundException("EventType", "id", id));

        if (!entity.getCode().equalsIgnoreCase(request.getCode()) &&
                eventTypeRepository.existsByCodeAndDeletedFalse(request.getCode())) {
            throw new BadRequestException("An event type with code '" + request.getCode() + "' already exists.");
        }

        entity.setName(request.getName());
        entity.setCode(request.getCode());
        entity.setDescription(request.getDescription());
        entity.setIconName(request.getIconName());
        entity.setImagePath(request.getImagePath());
        entity.setDisplayOrder(request.getDisplayOrder());
        entity.setActiveStatus(request.getActiveStatus());

        EventType updated = eventTypeRepository.save(entity);
        return EventTypeResponse.fromEntity(updated);
    }

    @Override
    @Transactional
    public void deleteEventType(UUID id) {
        log.info("Soft deleting event type ID: {}", id);
        EventType entity = eventTypeRepository.findById(id)
                .filter(e -> !e.isDeleted())
                .orElseThrow(() -> new ResourceNotFoundException("EventType", "id", id));

        String currentUser = SecurityUtils.getCurrentUserEmail().orElse("SYSTEM");
        entity.markAsDeleted(currentUser);
        eventTypeRepository.save(entity);
    }
}
