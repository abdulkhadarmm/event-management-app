package com.eventeasy.dto.request;

import com.eventeasy.enums.VenueType;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

/**
 * <p>Data Transfer Object payload for public customer enquiry submission.</p>
 * <p>Includes optional AI Event Plan payload integration.</p>
 *
 * @author EventEasy Engineering
 * @version 1.0.0
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EnquiryCreateRequest {

    @NotBlank(message = "Full name is required")
    @Pattern(regexp = "^[a-zA-Z\\s']+$", message = "Full name must contain letters and spaces only")
    @Size(max = 150, message = "Full name cannot exceed 150 characters")
    private String fullName;

    @NotBlank(message = "Email address is required")
    @Email(message = "Please provide a valid email address format")
    @Size(max = 150, message = "Email cannot exceed 150 characters")
    private String email;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[+\\d\\s()-]{7,20}$", message = "Please provide a valid phone number format")
    private String phone;

    @NotBlank(message = "City or event location is required")
    @Size(max = 100, message = "City cannot exceed 100 characters")
    private String city;

    @NotNull(message = "Event type selection is required")
    private UUID eventTypeId;

    private UUID eventPackageId;

    private UUID eventThemeId;

    @NotNull(message = "Event date is required")
    @FutureOrPresent(message = "Event date must be today or a future date")
    private LocalDate eventDate;

    @NotNull(message = "Expected guest count is required")
    @Min(value = 1, message = "Expected guest count must be at least 1")
    private Integer expectedGuests;

    @Size(max = 255, message = "Venue cannot exceed 255 characters")
    private String venue;

    private VenueType venueType;

    @NotNull(message = "Estimated budget is required")
    @DecimalMin(value = "0.00", message = "Estimated budget must be greater than or equal to zero")
    private BigDecimal estimatedBudget;

    @Size(max = 1000, message = "Additional requirements cannot exceed 1000 characters")
    private String additionalRequirements;

    // AI Event Planner Optional Submissions
    private String plannerInputJson;
    private String aiEventPlanJson;
    private String aiPlanSummary;
    private String aiModel;
    private String aiProvider;
    private String promptVersion;
}
