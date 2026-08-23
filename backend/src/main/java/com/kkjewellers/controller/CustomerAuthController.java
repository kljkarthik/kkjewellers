package com.kkjewellers.controller;

import com.kkjewellers.config.JwtTokenProvider;
import com.kkjewellers.dto.CustomerDTOs.*;
import com.kkjewellers.entity.CustomerUser;
import com.kkjewellers.repository.CustomerUserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api/auth")
public class CustomerAuthController {

    private final CustomerUserRepository customerUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    // Simulated OTP storage (Mobile -> OTP)
    private final Map<String, String> otpStore = new ConcurrentHashMap<>();

    public CustomerAuthController(
            CustomerUserRepository customerUserRepository,
            PasswordEncoder passwordEncoder,
            JwtTokenProvider jwtTokenProvider
    ) {
        this.customerUserRepository = customerUserRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerCustomer(@RequestBody CustomerRegisterRequest request) {
        if (request.getFirstName() == null || request.getFirstName().isBlank() ||
            request.getLastName() == null || request.getLastName().isBlank() ||
            request.getEmail() == null || request.getEmail().isBlank() ||
            request.getMobile() == null || request.getMobile().isBlank() ||
            request.getPassword() == null || request.getPassword().isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "All required fields must be filled out"));
        }

        String email = request.getEmail().trim().toLowerCase();
        String mobile = request.getMobile().trim();

        if (customerUserRepository.existsByEmail(email)) {
            return ResponseEntity.badRequest().body(Map.of("error", "An account with this email already exists"));
        }

        if (customerUserRepository.existsByMobile(mobile)) {
            return ResponseEntity.badRequest().body(Map.of("error", "An account with this mobile number already exists"));
        }

        CustomerUser customer = new CustomerUser();
        customer.setFirstName(request.getFirstName().trim());
        customer.setLastName(request.getLastName().trim());
        customer.setEmail(email);
        customer.setMobile(mobile);
        customer.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        customer.setDateOfBirth(request.getDateOfBirth());
        customer.setPreferredCategory(request.getPreferredCategory() != null ? request.getPreferredCategory() : "Bridal Collection");
        customer.setStatus("ACTIVE");

        customerUserRepository.save(customer);

        String token = jwtTokenProvider.generateToken(customer.getEmail());

        return ResponseEntity.ok(new CustomerAuthResponse(
                token,
                customer.getId(),
                customer.getFirstName(),
                customer.getLastName(),
                customer.getEmail(),
                customer.getMobile(),
                customer.getDateOfBirth(),
                customer.getPreferredCategory()
        ));
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginCustomer(@RequestBody CustomerLoginRequest request) {
        if (request.getIdentifier() == null || request.getIdentifier().isBlank() ||
            request.getPassword() == null || request.getPassword().isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Identifier and password are required"));
        }

        String identifier = request.getIdentifier().trim();
        Optional<CustomerUser> userOpt = customerUserRepository.findByEmailOrMobile(identifier.toLowerCase(), identifier);

        if (userOpt.isPresent() && passwordEncoder.matches(request.getPassword(), userOpt.get().getPasswordHash())) {
            CustomerUser customer = userOpt.get();
            if ("INACTIVE".equalsIgnoreCase(customer.getStatus())) {
                return ResponseEntity.status(403).body(Map.of("error", "Account has been deactivated. Please contact support."));
            }
            String token = jwtTokenProvider.generateToken(customer.getEmail());

            return ResponseEntity.ok(new CustomerAuthResponse(
                    token,
                    customer.getId(),
                    customer.getFirstName(),
                    customer.getLastName(),
                    customer.getEmail(),
                    customer.getMobile(),
                    customer.getDateOfBirth(),
                    customer.getPreferredCategory()
            ));
        }

        return ResponseEntity.status(401).body(Map.of("error", "Invalid email/mobile or password"));
    }

    @PostMapping("/otp-send")
    public ResponseEntity<?> sendOtp(@RequestBody Map<String, String> payload) {
        String mobile = payload.get("mobile");
        if (mobile == null || mobile.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Mobile number is required"));
        }
        mobile = mobile.trim();

        // Generate demo OTP 123456
        String generatedOtp = "123456";
        otpStore.put(mobile, generatedOtp);

        return ResponseEntity.ok(Map.of("message", "OTP sent successfully to " + mobile, "demoOtp", generatedOtp));
    }

    @PostMapping("/otp-verify")
    public ResponseEntity<?> verifyOtp(@RequestBody CustomerOtpRequest request) {
        if (request.getMobile() == null || request.getOtp() == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Mobile and OTP are required"));
        }
        String mobile = request.getMobile().trim();
        String storedOtp = otpStore.get(mobile);

        if (storedOtp == null || !storedOtp.equals(request.getOtp().trim())) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid or expired OTP"));
        }

        otpStore.remove(mobile);

        Optional<CustomerUser> userOpt = customerUserRepository.findByMobile(mobile);
        CustomerUser customer;
        if (userOpt.isPresent()) {
            customer = userOpt.get();
        } else {
            // Auto register guest via OTP
            customer = new CustomerUser("Guest", "Member", mobile + "@kkjewellers.com", mobile, passwordEncoder.encode("KKDefault#123"));
            customerUserRepository.save(customer);
        }

        String token = jwtTokenProvider.generateToken(customer.getEmail());
        return ResponseEntity.ok(new CustomerAuthResponse(
                token,
                customer.getId(),
                customer.getFirstName(),
                customer.getLastName(),
                customer.getEmail(),
                customer.getMobile(),
                customer.getDateOfBirth(),
                customer.getPreferredCategory()
        ));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> payload) {
        String identifier = payload.get("identifier");
        if (identifier == null || identifier.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email or mobile number is required"));
        }

        Optional<CustomerUser> userOpt = customerUserRepository.findByEmailOrMobile(identifier.trim().toLowerCase(), identifier.trim());
        if (userOpt.isPresent()) {
            return ResponseEntity.ok(Map.of("message", "Password reset instructions sent. Enter new password.", "valid", true));
        }

        return ResponseEntity.badRequest().body(Map.of("error", "No customer account found with specified email/mobile"));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> payload) {
        String identifier = payload.get("identifier");
        String newPassword = payload.get("newPassword");

        if (identifier == null || newPassword == null || newPassword.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Identifier and new password are required"));
        }

        Optional<CustomerUser> userOpt = customerUserRepository.findByEmailOrMobile(identifier.trim().toLowerCase(), identifier.trim());
        if (userOpt.isPresent()) {
            CustomerUser customer = userOpt.get();
            customer.setPasswordHash(passwordEncoder.encode(newPassword));
            customerUserRepository.save(customer);
            return ResponseEntity.ok(Map.of("message", "Password updated successfully. You can now sign in."));
        }

        return ResponseEntity.badRequest().body(Map.of("error", "Account not found"));
    }
}
