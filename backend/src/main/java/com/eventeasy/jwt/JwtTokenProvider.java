package com.eventeasy.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SecurityException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.stream.Collectors;

/**
 * <p>Utility component responsible for creating, signing, parsing, and validating JWT access tokens.</p>
 *
 * @author Abdul Khadar
 * @version 1.0.0
 */
@Slf4j
@Component
public class JwtTokenProvider {

    private final JwtProperties jwtProperties;

    /**
     * Constructor injection for JwtProperties dependency.
     *
     * @param jwtProperties bound JWT properties bean
     */
    public JwtTokenProvider(JwtProperties jwtProperties) {
        this.jwtProperties = jwtProperties;
    }

    /**
     * Generate a signed JWT token string containing username subject and granted authority claims.
     *
     * @param authentication active Spring Security Authentication object
     * @return signed JWT token string
     */
    public String generateToken(Authentication authentication) {
        String username = authentication.getName();
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtProperties.getExpirationMs());

        String roles = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        return Jwts.builder()
                .subject(username)
                .claim("roles", roles)
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(getSigningKey())
                .compact();
    }

    /**
     * Extract account username (subject) stored in JWT claims payload.
     *
     * @param token signed JWT string
     * @return extracted username string
     */
    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();

        return claims.getSubject();
    }

    /**
     * Cryptographically validate token integrity, expiration timestamp, and signature validity.
     *
     * @param token candidate JWT token string
     * @return true if token is valid, false if expired or corrupted
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (SecurityException | MalformedJwtException e) {
            log.error("Invalid JWT signature or malformed token format");
        } catch (ExpiredJwtException e) {
            log.error("Expired JWT token received");
        } catch (UnsupportedJwtException e) {
            log.error("Unsupported JWT token algorithm");
        } catch (IllegalArgumentException e) {
            log.error("JWT claims string is empty or blank");
        }
        return false;
    }

    /**
     * Decode secret key string into HMAC SecretKey instance for signing.
     *
     * @return SecretKey cryptographic key
     */
    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(jwtProperties.getSecret());
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
