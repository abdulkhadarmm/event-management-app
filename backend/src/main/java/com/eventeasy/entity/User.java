package com.eventeasy.entity;

import com.eventeasy.enums.UserStatus;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

/**
 * <p>JPA Entity representing system accounts (Customers and Administrators).</p>
 *
 * @author EventEasy Engineering
 * @version 1.0.0
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User extends BaseEntity {

    /**
     * Unique email address used as primary login identifier.
     */
    @Column(name = "email", nullable = false, unique = true, length = 150)
    private String email;

    /**
     * BCrypt encoded password hash.
     */
    @Column(name = "password", nullable = false, length = 255)
    private String password;

    /**
     * User given first name.
     */
    @Column(name = "first_name", nullable = false, length = 100)
    private String firstName;

    /**
     * User family last name.
     */
    @Column(name = "last_name", nullable = false, length = 100)
    private String lastName;

    /**
     * Account operational status (ACTIVE, INACTIVE, LOCKED).
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 30)
    @Builder.Default
    private UserStatus status = UserStatus.ACTIVE;

    /**
     * Set of security roles assigned to user.
     */
    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.MERGE})
    @JoinTable(
            name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id")
    )
    @Builder.Default
    private Set<Role> roles = new HashSet<>();
}
