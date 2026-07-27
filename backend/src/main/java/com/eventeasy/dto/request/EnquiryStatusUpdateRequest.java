package com.eventeasy.dto.request;

import com.eventeasy.enums.EnquiryStatus;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * <p>Data Transfer Object payload for administrator enquiry status & notes update.</p>
 *
 * @author EventEasy Engineering
 * @version 1.0.0
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EnquiryStatusUpdateRequest {

    @NotNull(message = "Enquiry status is required")
    private EnquiryStatus status;

    @Size(max = 1000, message = "Admin notes cannot exceed 1000 characters")
    private String adminNotes;
}
