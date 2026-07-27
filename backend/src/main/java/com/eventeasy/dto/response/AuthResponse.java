package com.eventeasy.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * <p>Data Transfer Object payload returned upon successful authentication containing JWT token and user profile.</p>
 *
 * @author Abdul Khadar
 * @version 1.0.0
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {

    /**
     * Signed JWT bearer token string.
     */
    private String accessToken;

    /**
     * Authorization token header type prefix (default "Bearer").
     */
    @Builder.Default
    private String tokenType = "Bearer";

    /**
     * Authenticated user profile information.
     */
    private UserResponse user;
}
