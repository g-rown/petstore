package com.petstore.controller;

import com.petstore.dto.request.AuthRequest;
import com.petstore.dto.request.RegisterRequest;
import com.petstore.dto.response.ApiResponse;
import com.petstore.dto.response.AuthResponse;
import com.petstore.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ApiResponse<AuthResponse> login(@Valid @RequestBody AuthRequest loginRequest) {
        try {
            return ApiResponse.success(authService.login(loginRequest));
        } catch (Exception e) {
            return ApiResponse.error("UNAUTHORIZED", "Invalid email or password");
        }
    }

    @PostMapping("/register")
    public ApiResponse<AuthResponse> register(@Valid @RequestBody RegisterRequest registerRequest) {
        try {
            return ApiResponse.success(authService.register(registerRequest));
        } catch (IllegalArgumentException e) {
            return ApiResponse.error("CONFLICT", e.getMessage());
        }
    }
}
