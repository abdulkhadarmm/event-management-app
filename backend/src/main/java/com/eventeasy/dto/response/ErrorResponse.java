package com.eventeasy.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

/**
 * <p>Data Transfer Object providing standardized structural feedback when API exceptions occur.</p>
 *
 * @author Abdul Khadar
 * @version 1.0.0
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ErrorResponse {

    /**
     * HTTP status code numeric value.
     */
    private int status;

    /**
     * HTTP status code reason phrase.
     */
    private String error;

    /**
     * High-level exception summary message.
     */
    private String message;

    /**
     * API request URI path where exception was thrown.
     */
    private String path;

    /**
     * ISO timestamp when exception was captured.
     */
    @Builder.Default
    private LocalDateTime timestamp = LocalDateTime.now();

    /**
     * List of fine-grained error validation details.
     */
    private List<String> details;
}
