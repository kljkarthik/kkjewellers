package com.kkjewellers.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "enquiries")
public class Enquiry {
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

    private Long productId;
    private String productName;
    private String productCode;

    @Column(length = 2000, nullable = false)
    private String message;

    private String status; // NEW, CONTACTED, FOLLOW_UP, INTERESTED, CLOSED

    @Column(length = 1000)
    private String internalNotes;

    private LocalDateTime createdAt;

    public Enquiry() {
        this.status = "NEW";
        this.createdAt = LocalDateTime.now();
    }

    public Enquiry(String customerName, String phone, String email, Long productId, String productName, String productCode, String message) {
        this.customerName = customerName;
        this.phone = phone;
        this.email = email;
        this.productId = productId;
        this.productName = productName;
        this.productCode = productCode;
        this.message = message;
        this.status = "NEW";
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

    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }

    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }

    public String getProductCode() { return productCode; }
    public void setProductCode(String productCode) { this.productCode = productCode; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getInternalNotes() { return internalNotes; }
    public void setInternalNotes(String internalNotes) { this.internalNotes = internalNotes; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
