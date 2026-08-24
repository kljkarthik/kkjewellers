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

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestBody ChangeProfileRequest request) {
        String currentUsername = SecurityContextHolder.getContext().getAuthentication() != null 
                ? SecurityContextHolder.getContext().getAuthentication().getName() 
                : null;

        AdminUser admin = null;
        if (currentUsername != null && !currentUsername.equals("anonymousUser")) {
            admin = adminUserRepository.findByUsername(currentUsername).orElse(null);
        }

        if (admin == null && SecurityContextHolder.getContext().getAuthentication().getPrincipal() instanceof AdminUser u) {
            admin = u;
        }

        if (admin == null) {
            admin = adminUserRepository.findAll().stream().findFirst().orElse(null);
        }

        if (admin == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthorized access. Admin user not found."));
        }

        // Require current password for any security updates
        if (request.getCurrentPassword() == null || request.getCurrentPassword().isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Current password is required to save security changes."));
        }

        if (!passwordEncoder.matches(request.getCurrentPassword(), admin.getPassword())) {
            return ResponseEntity.badRequest().body(Map.of("error", "Incorrect current password. Verification failed."));
        }

        // Update Username if changed
        if (request.getNewUsername() != null && !request.getNewUsername().isBlank()) {
            String newUsername = request.getNewUsername().trim();
            if (!newUsername.equals(admin.getUsername())) {
                if (adminUserRepository.findByUsername(newUsername).isPresent()) {
                    return ResponseEntity.badRequest().body(Map.of("error", "Username '" + newUsername + "' is already taken."));
                }
                admin.setUsername(newUsername);
            }
        }

        // Update Password if provided
        if (request.getNewPassword() != null && !request.getNewPassword().isBlank()) {
            admin.setPassword(passwordEncoder.encode(request.getNewPassword().trim()));
        }

        // Update Full Name & Email if provided
        if (request.getFullName() != null && !request.getFullName().isBlank()) {
            admin.setFullName(request.getFullName().trim());
        }
        if (request.getEmail() != null && !request.getEmail().isBlank()) {
            admin.setEmail(request.getEmail().trim());
        }

        adminUserRepository.save(admin);

        // Generate fresh token for updated username
        String newToken = jwtTokenProvider.generateToken(admin.getUsername());

        return ResponseEntity.ok(new AuthResponse(newToken, admin.getUsername(), admin.getFullName(), admin.getRole()));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
        String usernameToFind = (request.getUsername() != null && !request.getUsername().isBlank()) 
                ? request.getUsername().trim() 
                : "admin";

        AdminUser admin = adminUserRepository.findByUsername(usernameToFind)
                .orElseGet(() -> adminUserRepository.findAll().stream().findFirst().orElse(null));

        if (admin == null) {
            // Create default admin user if system has no admin accounts yet
            admin = new AdminUser();
            admin.setUsername(usernameToFind);
            admin.setFullName("Master Admin");
            admin.setRole("ADMIN");
        }

        if (request.getNewPassword() == null || request.getNewPassword().isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "New password is required"));
        }

        // Update password
        admin.setPassword(passwordEncoder.encode(request.getNewPassword().trim()));

        // Update username if requested
        if (request.getNewUsername() != null && !request.getNewUsername().isBlank()) {
            admin.setUsername(request.getNewUsername().trim());
        }

        adminUserRepository.save(admin);

        return ResponseEntity.ok(Map.of("message", "Admin password updated successfully! You can now log in with your new credentials."));
    }
}
