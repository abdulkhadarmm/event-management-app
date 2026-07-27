package com.eventeasy.jwt;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * <p>Spring Configuration Properties binding JWT token secret and expiration settings from application configuration files.</p>
 *
 * @author Abdul Khadar
 * @version 1.0.0
 */
@Getter
@Setter
@Configuration
@ConfigurationProperties(prefix = "app.jwt")
public class JwtProperties {

    /**
     * Secret key for HMAC-SHA signature generation.
     */
    private String secret;

    /**
     * Token expiration duration in milliseconds (default 24h).
     */
    private long expirationMs = 86400000L;

    /**
     * Token type prefix (default "Bearer").
     */
    private String tokenPrefix = "Bearer";

    /**
     * HTTP Header name containing token (default "Authorization").
     */
    private String headerString = "Authorization";
}
