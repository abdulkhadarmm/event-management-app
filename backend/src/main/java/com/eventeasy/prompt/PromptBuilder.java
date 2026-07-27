package com.eventeasy.prompt;

import com.eventeasy.dto.request.AIEventPlannerRequest;
import com.eventeasy.entity.EventPackage;
import com.eventeasy.entity.EventTheme;
import com.eventeasy.entity.EventType;
import com.eventeasy.repository.EventPackageRepository;
import com.eventeasy.repository.EventThemeRepository;
import com.eventeasy.repository.EventTypeRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

/**
 * <p>Prompt Engineering Builder responsible for fetching active EventEasy database catalog records,
 * sanitizing user inputs, and constructing structured system prompts for AI models.</p>
 *
 * @author EventEasy Engineering
 * @version 1.0.0
 */
@Slf4j
@Component
public class PromptBuilder {

    private final EventPackageRepository packageRepository;
    private final EventThemeRepository themeRepository;
    private final EventTypeRepository eventTypeRepository;

    public PromptBuilder(
            EventPackageRepository packageRepository,
            EventThemeRepository themeRepository,
            EventTypeRepository eventTypeRepository) {
        this.packageRepository = packageRepository;
        this.themeRepository = themeRepository;
        this.eventTypeRepository = eventTypeRepository;
    }

    /**
     * Build system prompt injecting real EventEasy database catalog entities and strict JSON output formatting rules.
     *
     * @param request AIEventPlannerRequest user planning parameters
     * @return String complete system prompt for Gemini model
     */
    public String buildPrompt(AIEventPlannerRequest request) {
        List<EventPackage> packages = packageRepository.findByActiveStatusTrueAndDeletedFalseOrderByDisplayOrderAsc();
        List<EventTheme> themes = themeRepository.findByActiveStatusTrueAndDeletedFalseOrderByDisplayOrderAsc();
        List<EventType> eventTypes = eventTypeRepository.findByActiveStatusTrueAndDeletedFalseOrderByDisplayOrderAsc();

        String catalogPackagesStr = packages.stream()
                .map(p -> String.format("- %s (Price: ₹%s - %s)", p.getName(), p.getPrice(), p.getSubtitle()))
                .collect(Collectors.joining("\n"));

        String catalogThemesStr = themes.stream()
                .map(t -> String.format("- %s (Category: %s)", t.getName(), t.getCategory()))
                .collect(Collectors.joining("\n"));

        String catalogTypesStr = eventTypes.stream()
                .map(e -> String.format("- %s (%s)", e.getName(), e.getDescription()))
                .collect(Collectors.joining("\n"));

        String sanitizedSpecialReqs = sanitizeInput(request.getSpecialRequirements());
        String sanitizedNotes = sanitizeInput(request.getAdditionalNotes());

        return """
            You are an elite, highly experienced luxury event consultant for EventEasy SaaS Platform.
            Your role is to create an executive, realistic, location-aware, and budget-conscious event plan for a client.

            IMPORTANT EVENTEASY CATALOG DIRECTIVE:
            You MUST evaluate the client's event and recommend ONLY from EventEasy's actual active catalog whenever possible:

            AVAILABLE EVENTEASY PACKAGES:
            %s

            AVAILABLE EVENTEASY THEMES:
            %s

            AVAILABLE EVENTEASY EVENT CATEGORIES:
            %s

            CLIENT EVENT SPECIFICATIONS:
            - Event Type: %s
            - Expected Guest Count: %d guests
            - Estimated Budget: ₹%s INR
            - Event Location: %s
            - Preferred Date: %s
            - Venue Preference: %s
            - Theme Preference: %s
            - Duration: %s
            - Food Preference: %s
            - Decoration Preference: %s
            - Photography Required: %s
            - Entertainment Required: %s
            - Accommodation Required: %s
            - Transportation Required: %s
            - Special Requirements: %s
            - Additional Notes: %s

            SYSTEM OUTPUT INSTRUCTIONS:
            Return ONLY a single valid JSON object matching the exact structure below.
            Do NOT include markdown formatting, do NOT include triple backticks ```json ```, do NOT include intro text.

            REQUIRED JSON OUTPUT SCHEMA:
            {
              "title": "Short executive title for the plan",
              "summary": "2-sentence high level summary",
              "recommendedPackage": "Exact EventEasy Package Name from catalog",
              "recommendedTheme": "Exact EventEasy Theme Name from catalog",
              "venueRecommendation": "Recommended venue style or location in the city",
              "venueReason": "Why this venue style suits the guest count and budget",
              "guestExperience": "Key highlights of guest journey and atmosphere",
              "decorRecommendations": ["Decor detail 1", "Decor detail 2", "Decor detail 3"],
              "foodRecommendations": ["Catering recommendation 1", "Menu highlight 2", "Beverage highlight 3"],
              "entertainmentRecommendations": ["DJ / Live music suggestion 1", "Lighting / FX suggestion 2"],
              "photographyRecommendations": ["Coverage suggestion 1", "Drone / Cinematic recommendation 2"],
              "vendorSuggestions": ["Vendor type 1", "Vendor type 2", "Vendor type 3"],
              "timeline": [
                { "period": "6 Months Before", "milestone": "Venue & Date Confirmation", "details": "Action steps" },
                { "period": "4 Months Before", "milestone": "Catering & Theme Selection", "details": "Action steps" },
                { "period": "2 Months Before", "milestone": "Invites & Vendor Briefing", "details": "Action steps" },
                { "period": "2 Weeks Before", "milestone": "Final Rehearsal & Guest Count", "details": "Action steps" },
                { "period": "Event Day", "milestone": "On-Site Event Execution", "details": "Action steps" }
              ],
              "budgetBreakdown": [
                { "category": "Venue & Catering", "allocatedAmount": 0.00, "percentage": 45.0, "description": "Venue rental and catering" },
                { "category": "Decor & Architecture", "allocatedAmount": 0.00, "percentage": 20.0, "description": "Floral, lighting, stage setup" },
                { "category": "Photography & Video", "allocatedAmount": 0.00, "percentage": 15.0, "description": "Full coverage" },
                { "category": "Entertainment & DJ", "allocatedAmount": 0.00, "percentage": 10.0, "description": "Sound, DJ, performance" },
                { "category": "Reserve Contingency", "allocatedAmount": 0.00, "percentage": 10.0, "description": "Emergency reserve" }
              ],
              "planningChecklist": ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"],
              "riskManagement": ["Risk mitigation tip 1", "Backup plan tip 2"],
              "assumptions": ["Budget excludes local taxes", "Guest count may vary by +-10%%", "Favourable weather for outdoor segments"],
              "expertTips": ["Book key vendors 4+ months early", "Reserve 10%% for surprise contingencies"],
              "nextSteps": ["Schedule site visit", "Request formal quotation", "Lock event date"]
            }
            """.formatted(
                catalogPackagesStr.isEmpty() ? "Standard EventEasy Packages" : catalogPackagesStr,
                catalogThemesStr.isEmpty() ? "Standard EventEasy Themes" : catalogThemesStr,
                catalogTypesStr.isEmpty() ? "Standard Event Categories" : catalogTypesStr,
                sanitizeInput(request.getEventType()),
                request.getGuestCount() != null ? request.getGuestCount() : 100,
                request.getBudget() != null ? request.getBudget().toPlainString() : "300000",
                sanitizeInput(request.getLocation()),
                request.getEventDate() != null ? request.getEventDate().toString() : "TBD",
                sanitizeInput(request.getVenuePreference()),
                sanitizeInput(request.getThemePreference()),
                sanitizeInput(request.getDuration()),
                sanitizeInput(request.getFoodPreference()),
                sanitizeInput(request.getDecorationPreference()),
                request.getPhotographyRequired() != null && request.getPhotographyRequired() ? "Yes" : "No",
                request.getEntertainmentRequired() != null && request.getEntertainmentRequired() ? "Yes" : "No",
                request.getAccommodationRequired() != null && request.getAccommodationRequired() ? "Yes" : "No",
                request.getTransportationRequired() != null && request.getTransportationRequired() ? "Yes" : "No",
                sanitizedSpecialReqs,
                sanitizedNotes
        );
    }

    private String sanitizeInput(String input) {
        if (input == null || input.isBlank()) return "Not specified";
        return input.replaceAll("(?i)ignore previous instructions|system prompt|override", "[filtered]")
                .replace("\"", "'")
                .trim();
    }
}
