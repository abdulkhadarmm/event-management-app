package com.eventeasy.service;

import com.eventeasy.dto.request.ChangePasswordRequest;
import com.eventeasy.dto.request.LoginRequest;
import com.eventeasy.dto.request.UpdateProfileRequest;
import com.eventeasy.dto.response.AuthResponse;
import com.eventeasy.dto.response.UserResponse;

/**
 * <p>Service interface declaring authentication workflow operations for EventEasy application.</p>
 * <p>Contains contract signatures for user login, current user retrieval, profile updating, and password changing.</p>
 *
 * @author EventEasy Engineering
 * @version 1.0.0
 */
public interface AuthService {

    /**
     * Authenticate user credentials and return signed JWT access token with profile payload.
     *
     * @param loginRequest login credentials request payload
     * @return AuthResponse containing access token and UserResponse
     */
    AuthResponse login(LoginRequest loginRequest);

    /**
     * Retrieve current authenticated user profile details from SecurityContext.
     *
     * @return UserResponse profile payload
     */
    UserResponse getCurrentUser();

    /**
     * Update current authenticated user's email, first name, and last name.
     *
     * @param request profile update details
     * @return updated UserResponse profile
     */
    UserResponse updateProfile(UpdateProfileRequest request);

    /**
     * Change current authenticated user's password verifying current password match.
     *
     * @param request password change details
     */
    void changePassword(ChangePasswordRequest request);
}
