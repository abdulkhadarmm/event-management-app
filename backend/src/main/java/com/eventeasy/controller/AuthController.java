package com.eventeasy.controller;

import com.eventeasy.dto.request.ChangePasswordRequest;
import com.eventeasy.dto.request.LoginRequest;
import com.eventeasy.dto.request.UpdateProfileRequest;
import com.eventeasy.dto.response.ApiResponse;
import com.eventeasy.dto.response.AuthResponse;
import com.eventeasy.dto.response.UserResponse;
import com.eventeasy.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * <p>REST Controller exposing authentication and account management endpoints for EventEasy SaaS platform.</p>
 * <p>Delegates business execution strictly to {@link AuthService} service layer.</p>
 *
 * @author EventEasy Engineering
 * @version 1.0.0
 */
@RestController
@RequestMapping("/api/v1/auth")
@Tag(name = "Authentication & User Settings Module", description = "Endpoints for administrator authentication, profile retrieval, profile updates, and password changes")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    @Operation(summary = "Admin Authentication", description = "Authenticate credentials and receive signed JWT token")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest loginRequest) {
        AuthResponse authResponse = authService.login(loginRequest);
        return ResponseEntity.ok(ApiResponse.success(authResponse, "Authentication successful"));
    }

    @GetMapping("/me")
    @Operation(summary = "Current User Profile", description = "Get authenticated administrator profile using JWT bearer token",
            security = @SecurityRequirement(name = "BearerAuthentication"))
    public ResponseEntity<ApiResponse<UserResponse>> getCurrentUser() {
        UserResponse userResponse = authService.getCurrentUser();
        return ResponseEntity.ok(ApiResponse.success(userResponse, "Current user profile retrieved successfully"));
    }

    @PutMapping("/profile")
    @Operation(summary = "Update Admin Profile Details", description = "Update email address, first name, and last name for current authenticated user",
            security = @SecurityRequirement(name = "BearerAuthentication"))
    public ResponseEntity<ApiResponse<UserResponse>> updateProfile(@Valid @RequestBody UpdateProfileRequest request) {
        UserResponse userResponse = authService.updateProfile(request);
        return ResponseEntity.ok(ApiResponse.success(userResponse, "Profile details updated successfully"));
    }

    @PutMapping("/password")
    @Operation(summary = "Change Admin Password", description = "Change administrator account password after verifying current password",
            security = @SecurityRequirement(name = "BearerAuthentication"))
    public ResponseEntity<ApiResponse<Void>> changePassword(@Valid @RequestBody ChangePasswordRequest request) {
        authService.changePassword(request);
        return ResponseEntity.ok(ApiResponse.success(null, "Password changed successfully"));
    }
}
