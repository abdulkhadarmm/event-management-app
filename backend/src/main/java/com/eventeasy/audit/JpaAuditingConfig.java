package com.eventeasy.audit;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

/**
 * <p>Spring Data JPA Auditing Configuration activating automatic creation and modification timestamp/auditor injection.</p>
 *
 * @author Abdul Khadar
 * @version 1.0.0
 */
@Configuration
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
public class JpaAuditingConfig {

    /**
     * Declare AuditorAware bean for resolving current logged in auditor username.
     *
     * @return AuditorAware instance returning authenticated user string
     */
    @Bean
    public AuditorAware<String> auditorAware() {
        return new SecurityAuditorAware();
    }
}
