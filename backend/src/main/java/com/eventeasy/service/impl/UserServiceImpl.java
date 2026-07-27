package com.eventeasy.service.impl;

import com.eventeasy.dto.response.UserResponse;
import com.eventeasy.entity.User;
import com.eventeasy.exception.ResourceNotFoundException;
import com.eventeasy.repository.UserRepository;
import com.eventeasy.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

/**
 * <p>Production implementation of {@link UserService} executing database queries and entity-to-DTO conversions.</p>
 *
 * @author Abdul Khadar
 * @version 1.0.0
 */
@Slf4j
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    /**
     * Constructor injection for UserRepository dependency.
     *
     * @param userRepository UserRepository dependency
     */
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Retrieve User JPA entity by email address.
     *
     * @param email account login email address
     * @return User entity
     * @throws ResourceNotFoundException if no user exists with specified email
     */
    @Override
    @Transactional(readOnly = true)
    public User getUserByEmail(String email) {
        log.debug("Querying user entity for email: {}", email);
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
    }

    /**
     * Retrieve UserResponse profile DTO by email address.
     *
     * @param email account login email address
     * @return UserResponse DTO
     */
    @Override
    @Transactional(readOnly = true)
    public UserResponse getUserProfileByEmail(String email) {
        User user = getUserByEmail(email);
        return UserResponse.fromEntity(user);
    }

    /**
     * Retrieve UserResponse profile DTO by UUID primary key.
     *
     * @param id user UUID primary key
     * @return UserResponse DTO
     * @throws ResourceNotFoundException if no user exists with specified UUID
     */
    @Override
    @Transactional(readOnly = true)
    public UserResponse getUserById(UUID id) {
        log.debug("Querying user profile for UUID: {}", id);
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        return UserResponse.fromEntity(user);
    }
}
