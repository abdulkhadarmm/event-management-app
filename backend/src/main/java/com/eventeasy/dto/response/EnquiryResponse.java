package com.eventeasy.dto.response;

import com.eventeasy.entity.Enquiry;
import com.eventeasy.enums.EnquiryStatus;
import com.eventeasy.enums.VenueType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * <p>Data Transfer Object representing Enquiry details returned to clients and administrators.</p>
 * <p>Includes AI Event Plan and user planner input payload attributes.</p>
 *
 * @author EventEasy Engineering
 * @version 1.0.0
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EnquiryResponse {

    private UUID id;
    private String enquiryNumber;
    private String fullName;
    private String email;
    private String phone;
    private String city;
    private EventTypeResponse eventType;
    private EventPackageResponse eventPackage;
    private EventThemeResponse eventTheme;
    private LocalDate eventDate;
    private Integer expectedGuests;
    private String venue;
    private VenueType venueType;
    private BigDecimal estimatedBudget;
    private String additionalRequirements;
    private EnquiryStatus status;
    private String adminNotes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // AI Extensions
    private String plannerInputJson;
    private String aiEventPlanJson;
    private String aiPlanSummary;
    private String aiModel;
    private String aiProvider;
    private String promptVersion;
    private LocalDateTime aiGeneratedAt;

    /**
     * Manual entity-to-DTO conversion mapping method.
     *
     * @param entity source Enquiry entity
     * @return EnquiryResponse DTO or null if entity is null
     */
    public static EnquiryResponse fromEntity(Enquiry entity) {
        if (entity == null) return null;

        return EnquiryResponse.builder()
                .id(entity.getId())
                .enquiryNumber(entity.getEnquiryNumber())
                .fullName(entity.getFullName())
                .email(entity.getEmail())
                .phone(entity.getPhone())
                .city(entity.getCity())
                .eventType(EventTypeResponse.fromEntity(entity.getEventType()))
                .eventPackage(EventPackageResponse.fromEntity(entity.getEventPackage()))
                .eventTheme(EventThemeResponse.fromEntity(entity.getEventTheme()))
                .eventDate(entity.getEventDate())
                .expectedGuests(entity.getExpectedGuests())
                .venue(entity.getVenue())
                .venueType(entity.getVenueType())
                .estimatedBudget(entity.getEstimatedBudget())
                .additionalRequirements(entity.getAdditionalRequirements())
                .status(entity.getStatus())
                .adminNotes(entity.getAdminNotes())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .plannerInputJson(entity.getPlannerInputJson())
                .aiEventPlanJson(entity.getAiEventPlanJson())
                .aiPlanSummary(entity.getAiPlanSummary())
                .aiModel(entity.getAiModel())
                .aiProvider(entity.getAiProvider())
                .promptVersion(entity.getPromptVersion())
                .aiGeneratedAt(entity.getAiGeneratedAt())
                .build();
    }
}
