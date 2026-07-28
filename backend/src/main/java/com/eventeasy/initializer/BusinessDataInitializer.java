package com.eventeasy.initializer;

import com.eventeasy.entity.Role;
import com.eventeasy.entity.User;
import com.eventeasy.enums.RoleType;
import com.eventeasy.enums.UserStatus;
import com.eventeasy.repository.RoleRepository;
import com.eventeasy.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import lombok.extern.slf4j.Slf4j;

import java.util.Set;

/**
 * Security Data Initializer handling initial role creation and primary admin account setup.
 * Business entities (Categories, Packages, Themes, Gallery, Enquiries, Subscribers) are managed exclusively
 * via Database / Admin APIs without automatic mock data seeding.
 *
 * @author EventEasy Engineering
 * @version 1.0.0
 */
@Component
@Slf4j
public class BusinessDataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.init.admin.email}")
    private String adminEmail;

    @Value("${app.init.admin.password}")
    private String adminPassword;

    @Value("${app.init.admin.first-name:System}")
    private String adminFirstName;

    @Value("${app.init.admin.last-name:Administrator}")
    private String adminLastName;

    public BusinessDataInitializer(
            UserRepository userRepository,
            RoleRepository roleRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(String... args) {
        log.info("Starting Security Initialization process...");

        // 1. Initialize Security Roles
        Role adminRole = initializeRoles();

        // 2. Initialize Default Administrator User Account
        initializeAdminUser(adminRole);

        log.info("Security initialization complete.");
    }

    private Role initializeRoles() {
        for (RoleType roleType : RoleType.values()) {
            roleRepository.findByName(roleType).orElseGet(() -> {
                Role role = new Role(roleType, "System Role: " + roleType.name());
                log.info("Creating security role: {}", roleType);
                return roleRepository.save(role);
            });
        }
        return roleRepository.findByName(RoleType.ROLE_ADMIN)
                .orElseThrow(() -> new IllegalStateException("ROLE_ADMIN could not be retrieved"));
    }

    private void initializeAdminUser(Role adminRole) {
        userRepository.findByEmail(adminEmail).ifPresentOrElse(
                user -> {
                    user.setPassword(passwordEncoder.encode(adminPassword));
                    userRepository.save(user);
                    log.info("Updated existing primary admin user account credentials: {}", adminEmail);
                },
                () -> {
                    User admin = new User();
                    admin.setEmail(adminEmail);
                    admin.setPassword(passwordEncoder.encode(adminPassword));
                    admin.setFirstName(adminFirstName);
                    admin.setLastName(adminLastName);
                    admin.setStatus(UserStatus.ACTIVE);
                    admin.setRoles(Set.of(adminRole));

                    userRepository.save(admin);
                    log.info("Successfully seeded initial primary admin account: {}", adminEmail);
                }
        );
    }
}
