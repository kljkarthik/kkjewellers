package com.kkjewellers.controller;

import com.kkjewellers.config.JwtTokenProvider;
import com.kkjewellers.dto.AuthDTOs.*;
import com.kkjewellers.entity.AdminUser;
import com.kkjewellers.repository.AdminUserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin/auth")
public class AdminAuthController {

    private final AdminUserRepository adminUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public AdminAuthController(
            AdminUserRepository adminUserRepository,
            PasswordEncoder passwordEncoder,
            JwtTokenProvider jwtTokenProvider
    ) {
        this.adminUserRepository = adminUserRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<AdminUser> adminOpt = adminUserRepository.findByUsername(request.getUsername());

        if (adminOpt.isPresent() && passwordEncoder.matches(request.getPassword(), adminOpt.get().getPassword())) {
            AdminUser admin = adminOpt.get();
            String token = jwtTokenProvider.generateToken(admin.getUsername());
            return ResponseEntity.ok(new AuthResponse(token, admin.getUsername(), admin.getFullName(), admin.getRole()));
        }

        return ResponseEntity.status(401).body(Map.of("error", "Invalid username or password"));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        if (request.getUsername() == null || request.getUsername().isBlank() ||
            request.getPassword() == null || request.getPassword().isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Username and password are required"));
        }

        if (adminUserRepository.findByUsername(request.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Username is already taken"));
        }

        AdminUser newUser = new AdminUser();
        newUser.setUsername(request.getUsername().trim());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        newUser.setFullName(request.getFullName() != null && !request.getFullName().isBlank() ? request.getFullName().trim() : request.getUsername());
        newUser.setEmail(request.getEmail());
        newUser.setRole("ADMIN");

        adminUserRepository.save(newUser);

        String token = jwtTokenProvider.generateToken(newUser.getUsername());
        return ResponseEntity.ok(new AuthResponse(token, newUser.getUsername(), newUser.getFullName(), newUser.getRole()));
    }

    @GetMapping("/me")
    public ResponseEntity<?> getMe() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof AdminUser admin) {
            return ResponseEntity.ok(Map.of(
                    "id", admin.getId(),
                    "username", admin.getUsername(),
                    "fullName", admin.getFullName(),
                    "email", admin.getEmail(),
                    "role", admin.getRole()
            ));
        }
        return ResponseEntity.status(401).build();
    }
}
