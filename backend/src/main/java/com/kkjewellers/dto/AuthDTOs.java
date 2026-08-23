package com.kkjewellers.dto;

public class AuthDTOs {
    public static class LoginRequest {
        private String username;
        private String password;

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class RegisterRequest {
        private String username;
        private String password;
        private String fullName;
        private String email;

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }

        public String getFullName() { return fullName; }
        public void setFullName(String fullName) { this.fullName = fullName; }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
    }

    public static class AuthResponse {
        private String token;
        private String username;
        private String fullName;
        private String role;

        public AuthResponse(String token, String username, String fullName, String role) {
            this.token = token;
            this.username = username;
            this.fullName = fullName;
            this.role = role;
        }

        public String getToken() { return token; }
        public String getUsername() { return username; }
        public String getFullName() { return fullName; }
        public String getRole() { return role; }
    }
}
