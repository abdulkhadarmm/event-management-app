package com.eventeasy.service.impl;

import com.eventeasy.dto.request.ChangePasswordRequest;
import com.eventeasy.dto.request.LoginRequest;
import com.eventeasy.dto.request.UpdateProfileRequest;
import com.eventeasy.dto.response.AuthResponse;
import com.eventeasy.dto.response.UserResponse;
import com.eventeasy.entity.User;
import com.eventeasy.exception.BadRequestException;
import com.eventeasy.exception.ResourceNotFoundException;
import com.eventeasy.exception.UnauthorizedException;
import com.eventeasy.jwt.JwtTokenProvider;
import com.eventeasy.repository.UserRepository;
import com.eventeasy.security.SecurityUtils;
import com.eventeasy.security.UserPrincipal;
import com.eventeasy.service.AuthService;
import com.eventeasy.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * <p>Production implementation of {@link AuthService} performing authentication, JWT token generation,
 * current security context profile resolution, profile details update, and password modification.</p>
 *
 * @author EventEasy Engineering
 * @version 1.0.0
 */
@Slf4j
@Service
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final UserService userService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthServiceImpl(
            AuthenticationManager authenticationManager,
            JwtTokenProvider tokenProvider,
            UserService userService,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
        this.userService = userService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public AuthResponse login(LoginRequest loginRequest) {
        log.info("Processing login request for user: {}", loginRequest.getEmail());

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);
        User user = userService.getUserByEmail(loginRequest.getEmail());

        log.info("User {} successfully authenticated", loginRequest.getEmail());

        return AuthResponse.builder()
                .accessToken(jwt)
                .tokenType("Bearer")
                .user(UserResponse.fromEntity(user))
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponse getCurrentUser() {
        UserPrincipal principal = SecurityUtils.getCurrentUserPrincipal()
                .orElseThrow(() -> new UnauthorizedException("No active authenticated session found"));

        User user = userRepository.findById(principal.getId())
                .orElseThrow(() -> new UnauthorizedException("User associated with current session no longer exists"));

        return UserResponse.fromEntity(user);
    }

    @Override
    @Transactional
    public UserResponse updateProfile(UpdateProfileRequest request) {
        UserPrincipal principal = SecurityUtils.getCurrentUserPrincipal()
                .orElseThrow(() -> new UnauthorizedException("No active authenticated session found"));

        User user = userRepository.findById(principal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", principal.getId()));

        if (!user.getEmail().equalsIgnoreCase(request.getEmail()) && userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email address " + request.getEmail() + " is already in use.");
        }

        user.setEmail(request.getEmail());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());

        User updatedUser = userRepository.save(user);
        log.info("Successfully updated user profile for ID: {}", user.getId());
        return UserResponse.fromEntity(updatedUser);
    }

    @Override
    @Transactional
    public void changePassword(ChangePasswordRequest request) {
        UserPrincipal principal = SecurityUtils.getCurrentUserPrincipal()
                .orElseThrow(() -> new UnauthorizedException("No active authenticated session found"));

        User user = userRepository.findById(principal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", principal.getId()));

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new BadRequestException("Current password provided is incorrect.");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
        log.info("Successfully changed password for user ID: {}", user.getId());
    }
}
