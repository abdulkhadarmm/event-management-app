package com.eventeasy.repository;

import com.eventeasy.entity.Role;
import com.eventeasy.enums.RoleType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

/**
 * <p>Spring Data JPA Repository interface for performing persistence operations on {@link Role} entities.</p>
 *
 * @author Abdul Khadar
 * @version 1.0.0
 */
@Repository
public interface RoleRepository extends JpaRepository<Role, UUID> {

    /**
     * Retrieve role entity matching specified role type enum.
     *
     * @param name role type enum to locate
     * @return Optional containing matched role entity or empty Optional
     */
    Optional<Role> findByName(RoleType name);

    /**
     * Verify whether a role matching specified role type enum exists in database.
     *
     * @param name role type enum to check
     * @return true if role exists, false otherwise
     */
    boolean existsByName(RoleType name);
}
