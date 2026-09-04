package com.kkjewellers.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Document(collection = "appointments")
public class Appointment {
    @Id
    private String id;

    @DBRef
    private CustomerUser customerUser;

    private String customerName;
    private String phone;
    private String email;

    private LocalDate preferredDate;
    private String preferredTime; // e.g. "11:00 AM", "03:30 PM"
    private String collectionName;
    private String message;
    private String status; // PENDING, CONFIRMED, COMPLETED, CANCELLED
    private LocalDateTime createdAt;

    public Appointment() {
        this.status = "PENDING";
        this.createdAt = LocalDateTime.now();
    }

    public Appointment(String customerName, String phone, String email, LocalDate preferredDate, String preferredTime, String collectionName, String message) {
        this.customerName = customerName;
        this.phone = phone;
        this.email = email;
        this.preferredDate = preferredDate;
        this.preferredTime = preferredTime;
        this.collectionName = collectionName;
        this.message = message;
        this.status = "PENDING";
        this.createdAt = LocalDateTime.now();
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public CustomerUser getCustomerUser() { return customerUser; }
    public void setCustomerUser(CustomerUser customerUser) { this.customerUser = customerUser; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public LocalDate getPreferredDate() { return preferredDate; }
    public void setPreferredDate(LocalDate preferredDate) { this.preferredDate = preferredDate; }

    public String getPreferredTime() { return preferredTime; }
    public void setPreferredTime(String preferredTime) { this.preferredTime = preferredTime; }

    public String getCollectionName() { return collectionName; }
    public void setCollectionName(String collectionName) { this.collectionName = collectionName; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
