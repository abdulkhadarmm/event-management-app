package com.eventeasy.handler;

import com.eventeasy.dto.response.ApiResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * <p>Spring Security AccessDeniedHandler handling HTTP 403 Forbidden attempts when authenticated users lack required roles.</p>
 *
 * @author Abdul Khadar
 * @version 1.0.0
 */
@Slf4j
@Component
public class CustomAccessDeniedHandler implements AccessDeniedHandler {

    private final ObjectMapper objectMapper;

    /**
     * Constructor injection for ObjectMapper dependency.
     *
     * @param objectMapper ObjectMapper for writing JSON error response
     */
    public CustomAccessDeniedHandler(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    /**
     * Handles HTTP 403 Forbidden JSON response generation upon access denial.
     *
     * @param request current HTTP request
     * @param response current HTTP response
     * @param accessDeniedException access denied exception triggered
     * @throws IOException in case of output stream writing failure
     * @throws ServletException in case of servlet exception
     */
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException)
            throws IOException, ServletException {
        log.warn("Access denied for path: {} - Exception: {}", request.getRequestURI(), accessDeniedException.getMessage());

        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);

        ApiResponse<Object> apiResponse = ApiResponse.error("Access denied. You do not possess privileges for this action.", accessDeniedException.getMessage());
        objectMapper.writeValue(response.getOutputStream(), apiResponse);
    }
}
