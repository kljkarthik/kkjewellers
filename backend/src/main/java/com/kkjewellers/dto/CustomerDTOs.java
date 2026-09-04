package com.kkjewellers.dto;

public class CustomerDTOs {

    public static class CustomerRegisterRequest {
        private String firstName;
        private String lastName;
        private String email;
        private String mobile;
        private String password;
        private String dateOfBirth;
        private String preferredCategory;

        public String getFirstName() { return firstName; }
        public void setFirstName(String firstName) { this.firstName = firstName; }

        public String getLastName() { return lastName; }
        public void setLastName(String lastName) { this.lastName = lastName; }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getMobile() { return mobile; }
        public void setMobile(String mobile) { this.mobile = mobile; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }

        public String getDateOfBirth() { return dateOfBirth; }
        public void setDateOfBirth(String dateOfBirth) { this.dateOfBirth = dateOfBirth; }

        public String getPreferredCategory() { return preferredCategory; }
        public void setPreferredCategory(String preferredCategory) { this.preferredCategory = preferredCategory; }
    }

    public static class CustomerLoginRequest {
        private String identifier; // Email or Mobile
        private String password;

        public String getIdentifier() { return identifier; }
        public void setIdentifier(String identifier) { this.identifier = identifier; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class CustomerOtpRequest {
        private String mobile;
        private String otp;

        public String getMobile() { return mobile; }
        public void setMobile(String mobile) { this.mobile = mobile; }

        public String getOtp() { return otp; }
        public void setOtp(String otp) { this.otp = otp; }
    }

    public static class CustomerAuthResponse {
        private String token;
        private String id;
        private String firstName;
        private String lastName;
        private String email;
        private String mobile;
        private String dateOfBirth;
        private String preferredCategory;

        public CustomerAuthResponse(String token, String id, String firstName, String lastName, String email, String mobile, String dateOfBirth, String preferredCategory) {
            this.token = token;
            this.id = id;
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.mobile = mobile;
            this.dateOfBirth = dateOfBirth;
            this.preferredCategory = preferredCategory;
        }

        public String getToken() { return token; }
        public String getId() { return id; }
        public String getFirstName() { return firstName; }
        public String getLastName() { return lastName; }
        public String getEmail() { return email; }
        public String getMobile() { return mobile; }
        public String getDateOfBirth() { return dateOfBirth; }
        public String getPreferredCategory() { return preferredCategory; }
    }

    public static class CustomerProfileUpdateRequest {
        private String firstName;
        private String lastName;
        private String email;
        private String mobile;
        private String dateOfBirth;
        private String preferredCategory;

        public String getFirstName() { return firstName; }
        public void setFirstName(String firstName) { this.firstName = firstName; }

        public String getLastName() { return lastName; }
        public void setLastName(String lastName) { this.lastName = lastName; }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getMobile() { return mobile; }
        public void setMobile(String mobile) { this.mobile = mobile; }

        public String getDateOfBirth() { return dateOfBirth; }
        public void setDateOfBirth(String dateOfBirth) { this.dateOfBirth = dateOfBirth; }

        public String getPreferredCategory() { return preferredCategory; }
        public void setPreferredCategory(String preferredCategory) { this.preferredCategory = preferredCategory; }
    }

    public static class CustomerPasswordChangeRequest {
        private String currentPassword;
        private String newPassword;

        public String getCurrentPassword() { return currentPassword; }
        public void setCurrentPassword(String currentPassword) { this.currentPassword = currentPassword; }

        public String getNewPassword() { return newPassword; }
        public void setNewPassword(String newPassword) { this.newPassword = newPassword; }
    }
}
