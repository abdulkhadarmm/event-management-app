package com.eventeasy.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

/**
 * <p>Static security utility helper methods for interacting with active Spring Security Context.</p>
 *
 * @author Abdul Khadar
 * @version 1.0.0
 */
public final class SecurityUtils {

    /**
     * Private constructor enforcing utility design pattern.
     */
    private SecurityUtils() {
        throw new UnsupportedOperationException("Utility class should not be instantiated.");
    }

    /**
     * Retrieve current authenticated UserPrincipal from SecurityContextHolder context.
     *
     * @return Optional containing active UserPrincipal or empty Optional if unauthenticated
     */
    public static Optional<UserPrincipal> getCurrentUserPrincipal() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof UserPrincipal userPrincipal) {
            return Optional.of(userPrincipal);
        }
        return Optional.empty();
    }

    /**
     * Retrieve login email username of current authenticated user session.
     *
     * @return Optional containing email username string or empty Optional
     */
    public static Optional<String> getCurrentUserEmail() {
        return getCurrentUserPrincipal().map(UserPrincipal::getEmail);
    }
}
