package com.eventeasy.exception;

import com.eventeasy.dto.response.ApiResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.ArrayList;
import java.util.List;

/**
 * <p>Centralized REST Controller Advice intercepting exceptions across controllers and mapping them to uniform {@link ApiResponse} objects.</p>
 *
 * @author Abdul Khadar
 * @version 1.0.0
 */
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Handle bean validation exceptions thrown when request body validation fails.
     *
     * @param ex MethodArgumentNotValidException instance
     * @param request current HTTP request context
     * @return ResponseEntity with HTTP 400 and list of field validation errors
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Object>> handleValidationExceptions(
            MethodArgumentNotValidException ex, HttpServletRequest request) {
        log.warn("Validation error on request path: {}", request.getRequestURI());

        List<String> errors = new ArrayList<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.add(fieldName + ": " + errorMessage);
        });

        ApiResponse<Object> response = ApiResponse.error("Validation failed for input request parameters", errors);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    /**
     * Handle custom BadRequestException failures.
     *
     * @param ex BadRequestException instance
     * @return ResponseEntity with HTTP 400 status
     */
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ApiResponse<Object>> handleBadRequestException(BadRequestException ex) {
        log.warn("Bad request exception: {}", ex.getMessage());
        ApiResponse<Object> response = ApiResponse.error(ex.getMessage(), ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    /**
     * Handle custom ResourceNotFoundException failures.
     *
     * @param ex ResourceNotFoundException instance
     * @return ResponseEntity with HTTP 404 status
     */
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleResourceNotFoundException(ResourceNotFoundException ex) {
        log.warn("Resource not found: {}", ex.getMessage());
        ApiResponse<Object> response = ApiResponse.error(ex.getMessage(), ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    /**
     * Handle Spring Security BadCredentialsException login failures.
     *
     * @param ex BadCredentialsException instance
     * @return ResponseEntity with HTTP 401 status
     */
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ApiResponse<Object>> handleBadCredentialsException(BadCredentialsException ex) {
        log.warn("Authentication failed - invalid credentials attempt");
        ApiResponse<Object> response = ApiResponse.error("Invalid email address or password", "Bad credentials provided");
        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }

    /**
     * Handle custom UnauthorizedException token or session failures.
     *
     * @param ex UnauthorizedException instance
     * @return ResponseEntity with HTTP 401 status
     */
    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ApiResponse<Object>> handleUnauthorizedException(UnauthorizedException ex) {
        log.warn("Unauthorized access attempt: {}", ex.getMessage());
        ApiResponse<Object> response = ApiResponse.error("Unauthorized access", ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }

    /**
     * Handle Spring Security AccessDeniedException authorization failures.
     *
     * @param ex AccessDeniedException instance
     * @return ResponseEntity with HTTP 403 status
     */
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ApiResponse<Object>> handleAccessDeniedException(AccessDeniedException ex) {
        log.warn("Access denied for current user: {}", ex.getMessage());
        ApiResponse<Object> response = ApiResponse.error("Access Denied", "You do not have permission to access this resource");
        return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
    }

    /**
     * Generic uncaught exception fallback handler.
     *
     * @param ex Exception instance
     * @param request current HTTP request context
     * @return ResponseEntity with HTTP 500 status
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Object>> handleGlobalException(Exception ex, HttpServletRequest request) {
        log.error("Unhandled internal system error at {}: ", request.getRequestURI(), ex);
        ApiResponse<Object> response = ApiResponse.error(
                "An unexpected internal error occurred. Please contact system administrator.",
                ex.getMessage()
        );
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
