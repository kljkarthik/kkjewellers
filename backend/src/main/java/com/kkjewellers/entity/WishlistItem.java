package com.kkjewellers.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "wishlist_items", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"customer_user_id", "product_id"})
})
public class WishlistItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "customer_user_id", nullable = false)
    private CustomerUser customerUser;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public WishlistItem() {}

    public WishlistItem(CustomerUser customerUser, Product product) {
        this.customerUser = customerUser;
        this.product = product;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public CustomerUser getCustomerUser() { return customerUser; }
    public void setCustomerUser(CustomerUser customerUser) { this.customerUser = customerUser; }

    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
