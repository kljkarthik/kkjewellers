package com.kkjewellers.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "customer_notifications")
public class CustomerNotification {

    @Id
    private String id;

    @DBRef
    private CustomerUser customerUser;

    private String title;
    private String message;
    private boolean isRead = false;
    private String type = "GENERAL"; // ENQUIRY, APPOINTMENT, COLLECTION, GENERAL
    private LocalDateTime createdAt;

    public CustomerNotification() {
        this.createdAt = LocalDateTime.now();
    }

    public CustomerNotification(CustomerUser customerUser, String title, String message, String type) {
        this.customerUser = customerUser;
        this.title = title;
        this.message = message;
        this.type = type;
        this.createdAt = LocalDateTime.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public CustomerUser getCustomerUser() { return customerUser; }
    public void setCustomerUser(CustomerUser customerUser) { this.customerUser = customerUser; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public boolean isRead() { return isRead; }
    public void setRead(boolean read) { isRead = read; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
