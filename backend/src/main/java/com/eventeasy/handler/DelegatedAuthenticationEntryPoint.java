package com.eventeasy.handler;

import com.eventeasy.dto.response.ApiResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * <p>Spring Security AuthenticationEntryPoint handling HTTP 401 Unauthorized attempts when unauthenticated users access protected APIs.</p>
 *
 * @author Abdul Khadar
 * @version 1.0.0
 */
@Slf4j
@Component
public class DelegatedAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private final ObjectMapper objectMapper;

    /**
     * Constructor injection for Jackson ObjectMapper dependency.
     *
     * @param objectMapper ObjectMapper for writing JSON error response
     */
    public DelegatedAuthenticationEntryPoint(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    /**
     * Commences HTTP 401 JSON error payload response upon unauthenticated API request access.
     *
     * @param request current HTTP request
     * @param response current HTTP response
     * @param authException authentication exception triggered
     * @throws IOException in case of output stream writing failure
     * @throws ServletException in case of servlet exception
     */
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)
            throws IOException, ServletException {
        log.warn("Unauthorized endpoint access attempt to path: {} - Exception: {}", request.getRequestURI(), authException.getMessage());

        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        ApiResponse<Object> apiResponse = ApiResponse.error("Authentication required to access this resource", authException.getMessage());
        objectMapper.writeValue(response.getOutputStream(), apiResponse);
    }
}
