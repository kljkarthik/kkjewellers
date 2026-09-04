package com.kkjewellers.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "enquiries")
public class Enquiry {
    @Id
    private String id;

    @DBRef
    private CustomerUser customerUser;

    private String customerName;
    private String phone;
    private String email;

    private String productId;
    private String productName;
    private String productCode;

    private String message;
    private String status; // NEW, CONTACTED, FOLLOW_UP, INTERESTED, CLOSED
    private String internalNotes;
    private LocalDateTime createdAt;

    public Enquiry() {
        this.status = "NEW";
        this.createdAt = LocalDateTime.now();
    }

    public Enquiry(String customerName, String phone, String email, String productId, String productName, String productCode, String message) {
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

    public String getProductId() { return productId; }
    public void setProductId(String productId) { this.productId = productId; }

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
