package com.eventeasy.service.impl;

import com.eventeasy.dto.request.EnquiryCreateRequest;
import com.eventeasy.dto.request.EnquiryStatusUpdateRequest;

import com.eventeasy.dto.response.EnquiryResponse;
import com.eventeasy.dto.response.PagedResponse;

import com.eventeasy.entity.Enquiry;
import com.eventeasy.entity.EventPackage;
import com.eventeasy.entity.EventTheme;
import com.eventeasy.entity.EventType;
import com.eventeasy.enums.EnquiryStatus;
import com.eventeasy.exception.ResourceNotFoundException;
import com.eventeasy.repository.EnquiryRepository;
import com.eventeasy.repository.EventPackageRepository;
import com.eventeasy.repository.EventThemeRepository;
import com.eventeasy.repository.EventTypeRepository;
import com.eventeasy.service.EnquiryService;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

/**
 * <p>Production implementation of {@link EnquiryService} encapsulating event enquiry processing,
 * search filtering, AI plan persistence, and administrative status transitions.</p>

 * @author EventEasy Engineering
 * @version 1.0.0
 */
@Slf4j
@Service
public class EnquiryServiceImpl implements EnquiryService {

    private final EnquiryRepository enquiryRepository;
    private final EventTypeRepository eventTypeRepository;
    private final EventPackageRepository packageRepository;
    private final EventThemeRepository themeRepository;

    private static final AtomicLong SEQUENCE = new AtomicLong(System.currentTimeMillis() % 1000000);

    public EnquiryServiceImpl(
            EnquiryRepository enquiryRepository,
            EventTypeRepository eventTypeRepository,
            EventPackageRepository packageRepository,
            EventThemeRepository themeRepository) {
        this.enquiryRepository = enquiryRepository;
        this.eventTypeRepository = eventTypeRepository;
        this.packageRepository = packageRepository;
        this.themeRepository = themeRepository;
    }

    @Override
    @Transactional
    public EnquiryResponse createEnquiry(EnquiryCreateRequest request) {
        log.info("Processing public customer enquiry submission for email: {}", request.getEmail());

        EventType eventType = eventTypeRepository.findById(request.getEventTypeId())
                .filter(e -> !e.isDeleted())
                .orElseThrow(() -> new ResourceNotFoundException("EventType", "id", request.getEventTypeId()));

        EventPackage eventPackage = null;
        if (request.getEventPackageId() != null) {
            eventPackage = packageRepository.findByIdAndDeletedFalse(request.getEventPackageId())
                    .orElseThrow(() -> new ResourceNotFoundException("EventPackage", "id", request.getEventPackageId()));
        }

        EventTheme eventTheme = null;
        if (request.getEventThemeId() != null) {
            eventTheme = themeRepository.findByIdAndDeletedFalse(request.getEventThemeId())
                    .orElseThrow(() -> new ResourceNotFoundException("EventTheme", "id", request.getEventThemeId()));
        }

        String enquiryNumber = generateEnquiryNumber();

        Enquiry entity = Enquiry.builder()
                .enquiryNumber(enquiryNumber)
                .fullName(request.getFullName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .city(request.getCity())
                .eventType(eventType)
                .eventPackage(eventPackage)
                .eventTheme(eventTheme)
                .eventDate(request.getEventDate())
                .expectedGuests(request.getExpectedGuests())
                .venue(request.getVenue())
                .venueType(request.getVenueType())
                .estimatedBudget(request.getEstimatedBudget())
                .additionalRequirements(request.getAdditionalRequirements())
                .status(EnquiryStatus.NEW)
                .plannerInputJson(request.getPlannerInputJson())
                .aiEventPlanJson(request.getAiEventPlanJson())
                .aiPlanSummary(request.getAiPlanSummary())
                .aiModel(request.getAiModel() != null ? request.getAiModel() : "gemini-1.5-flash")
                .aiProvider(request.getAiProvider() != null ? request.getAiProvider() : "Google Gemini")
                .promptVersion(request.getPromptVersion() != null ? request.getPromptVersion() : "v1.0")
                .aiGeneratedAt(request.getAiEventPlanJson() != null ? LocalDateTime.now() : null)
                .build();

        Enquiry saved = enquiryRepository.save(entity);
        log.info("Enquiry successfully created with Enquiry Number: {}", saved.getEnquiryNumber());
        return EnquiryResponse.fromEntity(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public PagedResponse<EnquiryResponse> getEnquiries(
            String search,
            EnquiryStatus status,
            UUID eventTypeId,
            UUID packageId,
            UUID themeId,
            LocalDate startDate,
            LocalDate endDate,
            int page,
            int size,
            String sortBy,
            String sortDir) {
        log.info("Fetching paged enquiries list - page: {}, size: {}, status: {}", page, size, status);

        Sort sort = sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Enquiry> enquiriesPage = enquiryRepository.findAllWithFilters(
                search != null && !search.isBlank() ? search.toLowerCase() : null,
                status,
                eventTypeId,
                packageId,
                themeId,
                startDate,
                endDate,
                pageable
        );

        List<EnquiryResponse> content = enquiriesPage.getContent()
                .stream()
                .map(EnquiryResponse::fromEntity)
                .toList();

        return PagedResponse.<EnquiryResponse>builder()
                .content(content)
                .page(enquiriesPage.getNumber())
                .size(enquiriesPage.getSize())
                .totalElements(enquiriesPage.getTotalElements())
                .totalPages(enquiriesPage.getTotalPages())
                .last(enquiriesPage.isLast())
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public EnquiryResponse getEnquiryById(UUID id) {
        Enquiry entity = enquiryRepository.findById(id)
                .filter(e -> !e.isDeleted())
                .orElseThrow(() -> new ResourceNotFoundException("Enquiry", "id", id));
        return EnquiryResponse.fromEntity(entity);
    }

    @Override
    @Transactional
    public EnquiryResponse updateEnquiryStatus(UUID id, EnquiryStatusUpdateRequest request) {
        log.info("Updating enquiry status for ID: {} to {}", id, request.getStatus());
        Enquiry entity = enquiryRepository.findById(id)
                .filter(e -> !e.isDeleted())
                .orElseThrow(() -> new ResourceNotFoundException("Enquiry", "id", id));

        entity.setStatus(request.getStatus());
        if (request.getAdminNotes() != null) {
            entity.setAdminNotes(request.getAdminNotes());
        }

        Enquiry updated = enquiryRepository.save(entity);
        return EnquiryResponse.fromEntity(updated);
    }

    @Override
    @Transactional
    public void deleteEnquiry(UUID id) {
        log.info("Soft deleting enquiry with ID: {}", id);
        Enquiry entity = enquiryRepository.findById(id)
                .filter(e -> !e.isDeleted())
                .orElseThrow(() -> new ResourceNotFoundException("Enquiry", "id", id));

        entity.setDeleted(true);
        enquiryRepository.save(entity);
    }

    private String generateEnquiryNumber() {
        long seq = SEQUENCE.incrementAndGet();
        return String.format("EVT-%d-%06d", LocalDate.now().getYear(), seq % 1000000);
    }
}
