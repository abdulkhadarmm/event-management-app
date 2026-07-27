package com.eventeasy.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

/**
 * <p>Generic API Response Wrapper ensuring consistent HTTP payload format across all REST endpoints.</p>
 *
 * @param <T> data payload generic type
 * @author Abdul Khadar
 * @version 1.0.0
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {

    /**
     * Indicates whether requested action completed successfully.
     */
    private boolean success;

    /**
     * Human-readable response summary message.
     */
    private String message;

    /**
     * Generic payload body returned on success.
     */
    private T data;

    /**
     * ISO timestamp when response was generated.
     */
    @Builder.Default
    private LocalDateTime timestamp = LocalDateTime.now();

    /**
     * Optional list of validation or execution error details.
     */
    private List<String> errors;

    /**
     * Static factory method creating a successful response wrapper with data payload.
     *
     * @param data response payload content
     * @param message descriptive success text
     * @param <T> payload type
     * @return constructed ApiResponse instance
     */
    public static <T> ApiResponse<T> success(T data, String message) {
        return ApiResponse.<T>builder()
                .success(true)
                .message(message)
                .data(data)
                .timestamp(LocalDateTime.now())
                .build();
    }

    /**
     * Static factory method creating a successful response wrapper without payload.
     *
     * @param message descriptive success text
     * @param <T> payload type
     * @return constructed ApiResponse instance
     */
    public static <T> ApiResponse<T> success(String message) {
        return success(null, message);
    }

    /**
     * Static factory method creating an error response wrapper.
     *
     * @param message descriptive failure text
     * @param errors list of specific error details
     * @param <T> payload type
     * @return constructed ApiResponse instance
     */
    public static <T> ApiResponse<T> error(String message, List<String> errors) {
        return ApiResponse.<T>builder()
                .success(false)
                .message(message)
                .errors(errors)
                .timestamp(LocalDateTime.now())
                .build();
    }

    /**
     * Static factory method creating an error response wrapper with single error string.
     *
     * @param message descriptive failure text
     * @param error single error explanation
     * @param <T> payload type
     * @return constructed ApiResponse instance
     */
    public static <T> ApiResponse<T> error(String message, String error) {
        return error(message, List.of(error));
    }
}
