package com.eventeasy.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

/**
 * <p>Data Transfer Object representing AI-generated Event Proposal details.</p>
 *
 * @author EventEasy Engineering
 * @version 1.0.0
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AIEventPlannerResponse {

    private String title;
    private String summary;
    private String recommendedPackage;
    private String recommendedTheme;
    private String venueRecommendation;
    private String venueReason;
    private String guestExperience;
    private List<String> decorRecommendations;
    private List<String> foodRecommendations;
    private List<String> entertainmentRecommendations;
    private List<String> photographyRecommendations;
    private List<String> vendorSuggestions;
    private List<TimelineMilestone> timeline;
    private List<BudgetItem> budgetBreakdown;
    private List<String> planningChecklist;
    private List<String> riskManagement;
    private List<String> assumptions;
    private List<String> expertTips;
    private List<String> nextSteps;

    // AI Metadata
    private String aiModel;
    private String aiProvider;
    private String promptVersion;
    private String generatedAt;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TimelineMilestone {
        private String period;
        private String milestone;
        private String details;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BudgetItem {
        private String category;
        private BigDecimal allocatedAmount;
        private Double percentage;
        private String description;
    }
}
