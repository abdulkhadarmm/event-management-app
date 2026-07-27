package com.eventeasy.service;

import com.eventeasy.dto.response.UserResponse;
import com.eventeasy.entity.User;

import java.util.UUID;

/**
 * <p>Service interface declaring user account retrieval and inspection operations.</p>
 * <p>Strictly declares signatures without business logic per enterprise application standards.</p>
 *
 * @author Abdul Khadar
 * @version 1.0.0
 */
public interface UserService {

    /**
     * Locate user entity by unique login email username.
     *
     * @param email account email address
     * @return User entity instance
     */
    User getUserByEmail(String email);

    /**
     * Retrieve user profile response DTO by unique email username.
     *
     * @param email account email address
     * @return UserResponse DTO
     */
    UserResponse getUserProfileByEmail(String email);

    /**
     * Retrieve user profile response DTO by UUID primary key.
     *
     * @param id user UUID identifier
     * @return UserResponse DTO
     */
    UserResponse getUserById(UUID id);
}
