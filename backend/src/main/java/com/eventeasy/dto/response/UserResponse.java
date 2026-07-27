package com.eventeasy.dto.response;

import com.eventeasy.entity.Role;
import com.eventeasy.entity.User;
import com.eventeasy.enums.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * <p>Data Transfer Object representing user account profile details returned to REST clients.</p>
 *
 * @author Abdul Khadar
 * @version 1.0.0
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {

    /**
     * User UUID primary key identifier.
     */
    private UUID id;

    /**
     * Account login email.
     */
    private String email;

    /**
     * Given first name.
     */
    private String firstName;

    /**
     * Family last name.
     */
    private String lastName;

    /**
     * Account operational status.
     */
    private UserStatus status;

    /**
     * Set of role names assigned to user.
     */
    private Set<String> roles;

    /**
     * Account creation timestamp.
     */
    private LocalDateTime createdAt;

    /**
     * Manual entity-to-DTO conversion mapping method.
     *
     * @param user source User JPA entity
     * @return populated UserResponse instance or null if input user is null
     */
    public static UserResponse fromEntity(User user) {
        if (user == null) {
            return null;
        }

        Set<String> roleNames = user.getRoles() != null
                ? user.getRoles().stream()
                .map(role -> role.getName().name())
                .collect(Collectors.toSet())
                : Set.of();

        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .status(user.getStatus())
                .roles(roleNames)
                .createdAt(user.getCreatedAt())
                .build();
    }
}
