package com.eventeasy.service.impl;

import com.eventeasy.config.GeminiConfig;
import com.eventeasy.dto.request.AIEventPlannerRequest;
import com.eventeasy.dto.response.AIEventPlannerResponse;
import com.eventeasy.dto.response.AIEventPlannerResponse.BudgetItem;
import com.eventeasy.dto.response.AIEventPlannerResponse.TimelineMilestone;
import com.eventeasy.prompt.PromptBuilder;
import com.eventeasy.service.AIService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * <p>Google Gemini REST API implementation of {@link AIService}.</p>
 * <p>Handles HTTP payload construction, JSON response parsing, dynamic procedural proposal generation, and performance logging.</p>
 *
 * @author EventEasy Engineering
 * @version 1.0.0
 */
@Slf4j
@Service
public class GeminiAIService implements AIService {

    private final GeminiConfig geminiConfig;
    private final PromptBuilder promptBuilder;
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public GeminiAIService(
            GeminiConfig geminiConfig,
            PromptBuilder promptBuilder,
            RestTemplate restTemplate,
            ObjectMapper objectMapper) {
        this.geminiConfig = geminiConfig;
        this.promptBuilder = promptBuilder;
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    @Override
    public AIEventPlannerResponse generateEventPlan(AIEventPlannerRequest request) {
        long startTime = System.currentTimeMillis();
        String provider = "Google Gemini";
        String model = geminiConfig.getModelName();
        String version = "v1.0";

        log.info("Initiating AI Event Plan generation for event type: {}, guests: {}, location: {}",
                request.getEventType(), request.getGuestCount(), request.getLocation());

        if (geminiConfig.getApiKey() != null && !geminiConfig.getApiKey().isBlank() && geminiConfig.getApiKey().startsWith("AIzaSy")) {
            try {
                String promptText = promptBuilder.buildPrompt(request);
                AIEventPlannerResponse response = callGeminiApi(promptText);

                if (response != null) {
                    response.setAiModel(model);
                    response.setAiProvider(provider);
                    response.setPromptVersion(version);
                    response.setGeneratedAt(LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));

                    long duration = System.currentTimeMillis() - startTime;
                    log.info("Successfully generated live Gemini AI Event Plan in {} ms", duration);
                    return response;
                }
            } catch (Exception e) {
                log.error("Gemini API invocation encountered error: {}. Engaging EventEasy Dynamic Procedural Engine.", e.getMessage(), e);
            }
        } else {
            log.warn("Valid GEMINI_API_KEY (starting with AIzaSy) not provided. Utilizing EventEasy Dynamic Procedural Engine.");
        }

        // Return dynamic, location-specific, budget-conscious proposal tailored to unique input parameters
        long duration = System.currentTimeMillis() - startTime;
        log.info("Generated EventEasy Dynamic Procedural Event Plan in {} ms", duration);

        AIEventPlannerResponse dynamicPlan = generateDynamicResponse(request);
        dynamicPlan.setAiModel(model + "-procedural");
        dynamicPlan.setAiProvider(provider);
        dynamicPlan.setPromptVersion(version);
        dynamicPlan.setGeneratedAt(LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));

        return dynamicPlan;
    }

    private AIEventPlannerResponse callGeminiApi(String promptText) throws Exception {
        String url = geminiConfig.getApiUrl() + "?key=" + geminiConfig.getApiKey();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> textPart = Map.of("text", promptText);
        Map<String, Object> partsObj = Map.of("parts", List.of(textPart));
        Map<String, Object> contentsObj = Map.of("contents", List.of(partsObj));

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(contentsObj, headers);
        ResponseEntity<String> responseEntity = restTemplate.postForEntity(url, entity, String.class);

        if (responseEntity.getStatusCode().is2xxSuccessful() && responseEntity.getBody() != null) {
            JsonNode root = objectMapper.readTree(responseEntity.getBody());
            JsonNode candidatesNode = root.path("candidates");
            if (candidatesNode.isArray() && candidatesNode.size() > 0) {
                String rawText = candidatesNode.get(0)
                        .path("content")
                        .path("parts")
                        .get(0)
                        .path("text")
                        .asText();

                String jsonText = rawText.replaceAll("```json|```", "").trim();
                return objectMapper.readValue(jsonText, AIEventPlannerResponse.class);
            }
        }
        return null;
    }

    /**
     * Procedurally generates unique, location-aware, budget-matched proposals for every distinct input.
     */
    private AIEventPlannerResponse generateDynamicResponse(AIEventPlannerRequest request) {
        BigDecimal budget = request.getBudget() != null ? request.getBudget() : new BigDecimal("300000.00");
        int guests = request.getGuestCount() != null ? request.getGuestCount() : 100;
        String eventType = request.getEventType() != null ? request.getEventType() : "Celebration";
        String location = request.getLocation() != null ? request.getLocation() : "Primary Destination";
        String venuePref = request.getVenuePreference() != null ? request.getVenuePreference() : "BOTH";
        String themePref = request.getThemePreference() != null ? request.getThemePreference() : "Midnight Opulence";

        // Budget Calculations
        BigDecimal venueBudget = budget.multiply(new BigDecimal("0.42")).setScale(2, RoundingMode.HALF_UP);
        BigDecimal decorBudget = budget.multiply(new BigDecimal("0.22")).setScale(2, RoundingMode.HALF_UP);
        BigDecimal photoBudget = budget.multiply(new BigDecimal("0.16")).setScale(2, RoundingMode.HALF_UP);
        BigDecimal entertainBudget = budget.multiply(new BigDecimal("0.10")).setScale(2, RoundingMode.HALF_UP);
        BigDecimal reserveBudget = budget.multiply(new BigDecimal("0.10")).setScale(2, RoundingMode.HALF_UP);

        // Dynamic Package Matching
        String recommendedPackage = budget.compareTo(new BigDecimal("800000")) >= 0
                ? "Bespoke Diamond Luxury"
                : budget.compareTo(new BigDecimal("350000")) >= 0
                ? "Royal Signature Experience"
                : "Essential Celebration";

        // Dynamic Theme Matching
        String recommendedTheme = themePref.isBlank() ? "Midnight Opulence" : themePref;

        // Dynamic Venue Generation based on Location & Setting
        String venueName;
        String venueReason;
        if (venuePref.toUpperCase().contains("HERITAGE") || venuePref.toUpperCase().contains("PALACE")) {
            venueName = "Royal Heritage Palace & Gardens, " + location;
            venueReason = String.format("Features grand imperial archways, heritage marble courtyard staging, and expansive lawns capacity for %d guests.", guests);
        } else if (venuePref.toUpperCase().contains("OUTDOOR") || venuePref.toUpperCase().contains("LAWN")) {
            venueName = "Grand Open-Air Lawn & Palm Grove, " + location;
            venueReason = String.format("Offers a scenic open canopy setting with natural acoustic acoustics and ample space for %d guests.", guests);
        } else if (venuePref.toUpperCase().contains("INDOOR") || venuePref.toUpperCase().contains("HALL")) {
            venueName = "Sapphire Grand Ballroom & Convention Center, " + location;
            venueReason = String.format("A fully climate-controlled 18ft high ceiling ballroom designed for up to %d guests with state-of-the-art acoustic soundproofing.", guests);
        } else {
            venueName = "Sheraton Grand Resort & Convention Park, " + location;
            venueReason = String.format("Combines luxury indoor banqueting with manicured poolside lawns to accommodate %d guests comfortably.", guests);
        }

        // Dynamic Guest Experience based on Event Type
        String guestExperience;
        String eventLower = eventType.toLowerCase();
        if (eventLower.contains("wedding") || eventLower.contains("reception")) {
            guestExperience = String.format("Rose-water welcome ceremony, signature mocktail lounge, live classical instrumentalist, interactive chef counters, and dedicated family concierge escort for %d guests.", guests);
        } else if (eventLower.contains("birthday") || eventLower.contains("party")) {
            guestExperience = String.format("Interactive 360 photo booth reception, live artisanal dessert bar, custom LED dance floor lighting, and DJ interactive performance for %d guests.", guests);
        } else if (eventLower.contains("corporate") || eventLower.contains("conference") || eventLower.contains("launch")) {
            guestExperience = String.format("Fast-track digital badge reception desk, executive coffee lounge, high-impact widescreen stage projection, and networking cocktail area for %d delegates.", guests);
        } else if (eventLower.contains("engagement") || eventLower.contains("anniversary")) {
            guestExperience = String.format("Champagne toast welcome lounge, romantic ambient lighting, customized ring stage architecture, and live acoustic serenade for %d guests.", guests);
        } else {
            guestExperience = String.format("Bespoke concierge greeting, curated welcome beverages, immersive theme lighting wash, and live interactive dining for %d guests.", guests);
        }

        // Dynamic Decor Recommendations
        List<String> decorRecs = new ArrayList<>();
        decorRecs.add(String.format("Custom stage backdrop styled in the '%s' color palette with warm LED wash", recommendedTheme));
        decorRecs.add(String.format("Entrance archway floral architecture designed for %s event atmosphere", eventType));
        decorRecs.add("Table seating arrangements with silk runners and crystal centerpieces");

        // Dynamic Food Recommendations
        List<String> foodRecs = new ArrayList<>();
        if (request.getFoodPreference() != null && !request.getFoodPreference().isBlank()) {
            foodRecs.add(String.format("Customized menu focusing on %s", request.getFoodPreference()));
        } else {
            foodRecs.add("Multi-course fine dining buffet with live interactive chef counters");
        }
        foodRecs.add("Signature welcome mocktail bar and artisanal dessert lounge");
        foodRecs.add("Specialized dietary options (Vegetarian, Jain, and Non-Vegetarian counters)");

        // Dynamic Entertainment
        List<String> entertainRecs = new ArrayList<>();
        if (Boolean.TRUE.equals(request.getEntertainmentRequired())) {
            entertainRecs.add("Professional event DJ & intelligent sound engineering setup");
            entertainRecs.add("Live ambient acoustic instrumentalist for welcome reception");
        } else {
            entertainRecs.add("Curated background lounge audio & crystal-clear speech PA system");
        }

        // Dynamic Photography
        List<String> photoRecs = new ArrayList<>();
        if (Boolean.TRUE.equals(request.getPhotographyRequired())) {
            photoRecs.add("2 Senior candid photographers with 4K drone aerial coverage");
            photoRecs.add("Cinematic event highlight trailer and full high-resolution digital album");
        } else {
            photoRecs.add("Standard event coverage photographer with digital delivery");
        }

        return AIEventPlannerResponse.builder()
                .title(String.format("%s Architecture Proposal - %s", eventType, location))
                .summary(String.format("Bespoke event architecture plan for %d guests in %s. Specially crafted around EventEasy's '%s' package and '%s' design theme.", guests, location, recommendedPackage, recommendedTheme))
                .recommendedPackage(recommendedPackage)
                .recommendedTheme(recommendedTheme)
                .venueRecommendation(venueName)
                .venueReason(venueReason)
                .guestExperience(guestExperience)
                .decorRecommendations(decorRecs)
                .foodRecommendations(foodRecs)
                .entertainmentRecommendations(entertainRecs)
                .photographyRecommendations(photoRecs)
                .vendorSuggestions(List.of(
                        "EventEasy Master Production Team",
                        "Signature Theme Decorators",
                        "Premier Culinary Partners"
                ))
                .timeline(List.of(
                        TimelineMilestone.builder().period("6 Months Before").milestone("Venue Scouting & Date Locking").details("Reserve venue space and lock preferred execution date.").build(),
                        TimelineMilestone.builder().period("4 Months Before").milestone("Theme Design & Catering Tasting").details("Finalize decor 3D renderings and conduct menu tasting.").build(),
                        TimelineMilestone.builder().period("2 Months Before").milestone("Media & Entertainment Booking").details("Confirm DJ, photographers, and entertainment contracts.").build(),
                        TimelineMilestone.builder().period("2 Weeks Before").milestone("Final Guest List & Run of Show").details("Rehearse timeline and confirm final headcount with venue.").build(),
                        TimelineMilestone.builder().period("Event Day").milestone("On-Site Production & Execution").details("EventEasy dedicated concierge manages setup to wrap.").build()
                ))
                .budgetBreakdown(List.of(
                        BudgetItem.builder().category("Venue & Catering").allocatedAmount(venueBudget).percentage(42.0).description("Space rental, food, beverage service").build(),
                        BudgetItem.builder().category("Theme & Stage Decor").allocatedAmount(decorBudget).percentage(22.0).description("Stage backdrop, entrance arch, floral design").build(),
                        BudgetItem.builder().category("Media & Photography").allocatedAmount(photoBudget).percentage(16.0).description("Coverage stills, video highlight film").build(),
                        BudgetItem.builder().category("Sound & Lighting").allocatedAmount(entertainBudget).percentage(10.0).description("Sound PA, DJ setup, intelligent lighting").build(),
                        BudgetItem.builder().category("Emergency Contingency").allocatedAmount(reserveBudget).percentage(10.0).description("Reserve buffer").build()
                ))
                .planningChecklist(List.of(
                        "Confirm venue booking and deposit",
                        "Finalize " + recommendedTheme + " decor layout",
                        "Confirm food menu and beverage counters",
                        "Lock photography shot list",
                        "Send formal invitations to guest list"
                ))
                .riskManagement(List.of(
                        "Keep 10% contingency reserve for unannounced guest variance",
                        "Uninterruptible power backup generator on standby",
                        "Weather protection plan for open-air lawn segments"
                ))
                .assumptions(List.of(
                        "Budget excludes local government taxes",
                        "Guest count variance estimated within +-10%",
                        "Outdoor segments assume favorable weather conditions"
                ))
                .expertTips(List.of(
                        "Book signature venue and photographers at least 4 months in advance",
                        "Reserve 10% of budget for last-minute headcount additions",
                        "Finalize dietary requirements 7 days prior to execution"
                ))
                .nextSteps(List.of(
                        "Click 'Proceed with Enquiry' to transmit specifications to our concierge",
                        "Schedule a complimentary venue walkthrough with an EventEasy specialist",
                        "Request a formal customized quotation"
                ))
                .build();
    }
}
