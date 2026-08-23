package com.kkjewellers.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "appointments")
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_user_id")
    private CustomerUser customerUser;

    @Column(nullable = false)
    private String customerName;

    @Column(nullable = false)
    private String phone;

    private String email;

    @Column(nullable = false)
    private LocalDate preferredDate;

    @Column(nullable = false)
    private String preferredTime; // e.g. "11:00 AM", "03:30 PM"

    private String collectionName;

    @Column(length = 1000)
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
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

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
