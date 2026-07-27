package com.eventeasy.constants;

/**
 * <p>Centralized security-related constant values utilized across security filters,
 * JWT processing, CORS configurations, and authorization evaluation.</p>
 *
 * @author Abdul Khadar
 * @version 1.0.0
 */
public final class SecurityConstants {

    /**
     * Private constructor to enforce static utility constant usage.
     */
    private SecurityConstants() {
        throw new UnsupportedOperationException("Utility class should not be instantiated.");
    }

    /**
     * Header key for HTTP Authorization header.
     */
    public static final String AUTHORIZATION_HEADER = "Authorization";

    /**
     * Prefix string required for HTTP Bearer authentication token.
     */
    public static final String BEARER_PREFIX = "Bearer ";

    /**
     * Length index offset for removing "Bearer " string from authorization token header.
     */
    public static final int BEARER_PREFIX_LENGTH = 7;

    /**
     * Public authentication API route endpoints permitted without token check.
     */
    public static final String[] PUBLIC_AUTH_ENDPOINTS = {
            "/api/v1/auth/login",
            "/v3/api-docs/**",
            "/swagger-ui/**",
            "/swagger-ui.html",
            "/actuator/health"
    };

    /**
     * Default admin role string representation.
     */
    public static final String ROLE_ADMIN = "ROLE_ADMIN";
}
