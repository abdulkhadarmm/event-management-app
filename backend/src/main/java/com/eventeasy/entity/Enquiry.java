package com.eventeasy.entity;

import com.eventeasy.enums.EnquiryStatus;
import com.eventeasy.enums.VenueType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * <p>JPA Entity representing customer event booking enquiries submitted via website contact concierge.</p>
 * <p>Includes optional AI Event Plan & user planner input storage for administrator review.</p>
 *
 * @author EventEasy Engineering
 * @version 1.0.0
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "enquiries")
public class Enquiry extends BaseEntity {

    /**
     * Unique human-readable enquiry code identifier (e.g. EVT-2026-000001).
     */
    @Column(name = "enquiry_number", nullable = false, unique = true, length = 50)
    private String enquiryNumber;

    /**
     * Customer full name.
     */
    @Column(name = "full_name", nullable = false, length = 150)
    private String fullName;

    /**
     * Customer email address.
     */
    @Column(name = "email", nullable = false, length = 150)
    private String email;

    /**
     * Customer phone contact number.
     */
    @Column(name = "phone", nullable = false, length = 30)
    private String phone;

    /**
     * Customer city or event destination location.
     */
    @Column(name = "city", nullable = false, length = 100)
    private String city;

    /**
     * Target EventType relationship link.
     */
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "event_type_id", nullable = false)
    private EventType eventType;

    /**
     * Selected EventPackage link (optional).
     */
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "event_package_id")
    private EventPackage eventPackage;

    /**
     * Preferred EventTheme link (optional).
     */
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "event_theme_id")
    private EventTheme eventTheme;

    /**
     * Planned event execution date.
     */
    @Column(name = "event_date", nullable = false)
    private LocalDate eventDate;

    /**
     * Estimated guest headcount count.
     */
    @Column(name = "expected_guests", nullable = false)
    private Integer expectedGuests;

    /**
     * Target venue name or location address.
     */
    @Column(name = "venue", length = 255)
    private String venue;

    /**
     * Venue preference type (INDOOR, OUTDOOR, BOTH).
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "venue_type", length = 30)
    private VenueType venueType;

    /**
     * Customer estimated budget amount.
     */
    @Column(name = "estimated_budget", nullable = false, precision = 12, scale = 2)
    private BigDecimal estimatedBudget;

    /**
     * Customer additional requirements and event notes.
     */
    @Column(name = "additional_requirements", length = 1000)
    private String additionalRequirements;

    /**
     * Enquiry processing status workflow state.
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 30)
    @Builder.Default
    private EnquiryStatus status = EnquiryStatus.NEW;

    /**
     * Internal administrator notes and follow-up history.
     */
    @Column(name = "admin_notes", length = 1000)
    private String adminNotes;

    // --- AI Event Planner Extensions ---

    /**
     * Raw JSON string of original user inputs from AI Event Planner form.
     */
    @Column(name = "planner_input_json", columnDefinition = "LONGTEXT")
    private String plannerInputJson;

    /**
     * Structured JSON string of AI-generated Event Plan.
     */
    @Column(name = "ai_event_plan_json", columnDefinition = "LONGTEXT")
    private String aiEventPlanJson;

    /**
     * One-line summary of AI Event Plan for admin list display.
     */
    @Column(name = "ai_plan_summary", length = 255)
    private String aiPlanSummary;

    /**
     * AI Model name used for generation (e.g. gemini-1.5-flash).
     */
    @Column(name = "ai_model", length = 50)
    private String aiModel;

    /**
     * AI Service Provider (e.g. Google Gemini).
     */
    @Column(name = "ai_provider", length = 50)
    private String aiProvider;

    /**
     * Prompt Version identifier.
     */
    @Column(name = "prompt_version", length = 20)
    private String promptVersion;

    /**
     * Timestamp when AI Plan was generated.
     */
    @Column(name = "ai_generated_at")
    private LocalDateTime aiGeneratedAt;
}
