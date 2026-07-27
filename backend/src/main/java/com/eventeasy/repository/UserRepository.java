package com.eventeasy.repository;

import com.eventeasy.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

/**
 * <p>Spring Data JPA Repository interface for performing database queries on {@link User} entities.</p>
 *
 * @author Abdul Khadar
 * @version 1.0.0
 */
@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    /**
     * Locate user entity by unique email login username.
     *
     * @param email user email address to search
     * @return Optional containing matched User entity or empty Optional
     */
    Optional<User> findByEmail(String email);

    /**
     * Verify whether a user account exists with given email address.
     *
     * @param email email address to verify
     * @return true if matching email exists, false otherwise
     */
    boolean existsByEmail(String email);
}
