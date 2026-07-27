package com.eventeasy.audit;

import com.eventeasy.constants.ApplicationConstants;
import com.eventeasy.security.UserPrincipal;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

/**
 * <p>Spring Data JPA AuditorAware implementation capturing current authenticated user principal email for audit logging.</p>
 *
 * @author Abdul Khadar
 * @version 1.0.0
 */
public class SecurityAuditorAware implements AuditorAware<String> {

    /**
     * Retrieve the current logged-in user username/email for populating BaseEntity createdBy and updatedBy audit fields.
     *
     * @return Optional containing authenticated username string or system fallback
     */
    @Override
    public Optional<String> getCurrentAuditor() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated() || "anonymousUser".equals(authentication.getPrincipal())) {
            return Optional.of(ApplicationConstants.SYSTEM_USER);
        }

        Object principal = authentication.getPrincipal();
        if (principal instanceof UserPrincipal userPrincipal) {
            return Optional.ofNullable(userPrincipal.getUsername());
        }

        return Optional.ofNullable(authentication.getName());
    }
}
