package com.eventeasy.entity;

import com.eventeasy.enums.RoleType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * <p>JPA Entity representing authorization security roles assigned to system users.</p>
 *
 * @author Abdul Khadar
 * @version 1.0.0
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "roles")
public class Role extends BaseEntity {

    /**
     * Enumerated unique role identifier name (e.g. ROLE_ADMIN).
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "name", nullable = false, unique = true, length = 50)
    private RoleType name;

    /**
     * Human-readable role description.
     */
    @Column(name = "description", length = 255)
    private String description;
}
