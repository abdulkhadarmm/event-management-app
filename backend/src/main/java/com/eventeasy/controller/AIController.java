package com.eventeasy.controller;

import com.eventeasy.dto.request.AIEventPlannerRequest;
import com.eventeasy.dto.response.ApiResponse;
import com.eventeasy.dto.response.AIEventPlannerResponse;
import com.eventeasy.entity.Enquiry;
import com.eventeasy.exception.ResourceNotFoundException;
import com.eventeasy.repository.EnquiryRepository;
import com.eventeasy.service.AIService;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * <p>REST Controller exposing AI Event Planner consultation services for EventEasy platform.</p>
 * <p>Provides public AI proposal generation and administrative enquiry plan regeneration.</p>
 *
 * @author EventEasy Engineering
 * @version 1.0.0
 */
@Slf4j
@RestController
@RequestMapping("/api/v1/ai")
@Tag(name = "AI Event Planner Module", description = "Endpoints for generating AI event proposals and admin plan regeneration")
public class AIController {

    private final AIService aiService;
    private final EnquiryRepository enquiryRepository;
    private final ObjectMapper objectMapper;

    public AIController(
            AIService aiService,
            EnquiryRepository enquiryRepository,
            ObjectMapper objectMapper) {
        this.aiService = aiService;
        this.enquiryRepository = enquiryRepository;
        this.objectMapper = objectMapper;
    }

    /**
     * Public endpoint: Generate an AI event plan proposal based on client requirements.
     *
     * @param request AIEventPlannerRequest validated specification DTO
     * @return ResponseEntity containing ApiResponse with AIEventPlannerResponse
     */
    @PostMapping("/event-plan")
    @Operation(summary = "Generate AI Event Plan", description = "Public endpoint generating personalized AI event proposal matched to EventEasy catalog")
    public ResponseEntity<ApiResponse<AIEventPlannerResponse>> generatePlan(@Valid @RequestBody AIEventPlannerRequest request) {
        log.info("REST Request: Generate AI Event Plan for type: {}, location: {}", request.getEventType(), request.getLocation());
        AIEventPlannerResponse response = aiService.generateEventPlan(request);
        return ResponseEntity.ok(ApiResponse.success(response, "AI Event Plan generated successfully"));
    }

    /**
     * Admin endpoint: Regenerate AI Event Plan for an existing enquiry.
     *
     * @param enquiryId UUID identifier of target enquiry
     * @return ResponseEntity containing ApiResponse with updated AIEventPlannerResponse
     */
    @PostMapping("/regenerate-enquiry-plan/{enquiryId}")
    @Operation(summary = "Regenerate Enquiry AI Plan", description = "Admin endpoint regenerating AI proposal for an existing enquiry and updating database record")
    public ResponseEntity<ApiResponse<AIEventPlannerResponse>> regenerateEnquiryPlan(@PathVariable UUID enquiryId) {
        log.info("REST Request: Regenerate AI Plan for Enquiry ID: {}", enquiryId);

        Enquiry enquiry = enquiryRepository.findById(enquiryId)
                .filter(e -> !e.isDeleted())
                .orElseThrow(() -> new ResourceNotFoundException("Enquiry", "id", enquiryId));

        AIEventPlannerRequest plannerRequest;
        if (enquiry.getPlannerInputJson() != null && !enquiry.getPlannerInputJson().isBlank()) {
            try {
                plannerRequest = objectMapper.readValue(enquiry.getPlannerInputJson(), AIEventPlannerRequest.class);
            } catch (Exception e) {
                log.warn("Failed to parse plannerInputJson for enquiry {}, constructing request from entity attributes", enquiryId);
                plannerRequest = buildRequestFromEnquiry(enquiry);
            }
        } else {
            plannerRequest = buildRequestFromEnquiry(enquiry);
        }

        AIEventPlannerResponse aiResponse = aiService.generateEventPlan(plannerRequest);

        try {
            String planJson = objectMapper.writeValueAsString(aiResponse);
            String summary = String.format("%s • %d Guests • %s • %s",
                    enquiry.getEventType().getName(),
                    enquiry.getExpectedGuests(),
                    aiResponse.getRecommendedTheme() != null ? aiResponse.getRecommendedTheme() : "Signature Theme",
                    aiResponse.getRecommendedPackage() != null ? aiResponse.getRecommendedPackage() : "Custom Package"
            );

            enquiry.setAiEventPlanJson(planJson);
            enquiry.setAiPlanSummary(summary);
            enquiry.setAiModel(aiResponse.getAiModel());
            enquiry.setAiProvider(aiResponse.getAiProvider());
            enquiry.setPromptVersion(aiResponse.getPromptVersion());
            enquiry.setAiGeneratedAt(LocalDateTime.now());
            enquiryRepository.save(enquiry);

            log.info("Successfully regenerated and persisted AI Plan for Enquiry ID: {}", enquiryId);
        } catch (Exception e) {
            log.error("Failed to serialize regenerated AI Plan JSON for enquiry ID: {}", enquiryId, e);
        }

        return ResponseEntity.ok(ApiResponse.success(aiResponse, "AI Event Plan regenerated and saved successfully"));
    }

    private AIEventPlannerRequest buildRequestFromEnquiry(Enquiry enquiry) {
        return AIEventPlannerRequest.builder()
                .eventType(enquiry.getEventType() != null ? enquiry.getEventType().getName() : "Luxury Event")
                .guestCount(enquiry.getExpectedGuests() != null ? enquiry.getExpectedGuests() : 100)
                .budget(enquiry.getEstimatedBudget() != null ? enquiry.getEstimatedBudget() : new java.math.BigDecimal("300000"))
                .location(enquiry.getCity() != null ? enquiry.getCity() : "Primary Destination")
                .eventDate(enquiry.getEventDate() != null ? enquiry.getEventDate() : java.time.LocalDate.now().plusMonths(3))
                .venuePreference(enquiry.getVenue())
                .themePreference(enquiry.getEventTheme() != null ? enquiry.getEventTheme().getName() : null)
                .specialRequirements(enquiry.getAdditionalRequirements())
                .build();
    }
}
