package com.eventeasy.dto.request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * <p>Data Transfer Object payload for AI Event Planner recommendation requests.</p>
 *
 * @author EventEasy Engineering
 * @version 1.0.0
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AIEventPlannerRequest {

    @NotBlank(message = "Event type is required")
    private String eventType;

    @NotNull(message = "Guest count is required")
    @Min(value = 10, message = "Guest count must be at least 10")
    @Max(value = 10000, message = "Guest count cannot exceed 10,000")
    private Integer guestCount;

    @NotNull(message = "Budget is required")
    @DecimalMin(value = "1.00", message = "Budget must be greater than zero")
    private BigDecimal budget;

    @NotBlank(message = "Location is required")
    @Size(max = 150, message = "Location cannot exceed 150 characters")
    private String location;

    @NotNull(message = "Event date is required")
    @FutureOrPresent(message = "Event date must be today or a future date")
    private LocalDate eventDate;

    private String venuePreference;
    private String themePreference;

    // Optional Fields
    private String duration;
    private Boolean indoor;
    private Boolean outdoor;
    private String foodPreference;
    private String decorationPreference;
    private Boolean photographyRequired;
    private Boolean entertainmentRequired;
    private Boolean accommodationRequired;
    private Boolean transportationRequired;

    @Size(max = 1000, message = "Special requirements cannot exceed 1000 characters")
    private String specialRequirements;

    @Size(max = 1000, message = "Additional notes cannot exceed 1000 characters")
    private String additionalNotes;
}
