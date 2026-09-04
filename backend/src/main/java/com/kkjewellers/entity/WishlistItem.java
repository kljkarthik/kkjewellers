package com.kkjewellers.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "wishlist_items")
public class WishlistItem {

    @Id
    private String id;

    @DBRef
    private CustomerUser customerUser;

    @DBRef
    private Product product;

    private LocalDateTime createdAt;

    public WishlistItem() {
        this.createdAt = LocalDateTime.now();
    }

    public WishlistItem(CustomerUser customerUser, Product product) {
        this.customerUser = customerUser;
        this.product = product;
        this.createdAt = LocalDateTime.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public CustomerUser getCustomerUser() { return customerUser; }
    public void setCustomerUser(CustomerUser customerUser) { this.customerUser = customerUser; }

    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
