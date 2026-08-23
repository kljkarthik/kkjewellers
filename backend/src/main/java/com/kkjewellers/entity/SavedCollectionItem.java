package com.kkjewellers.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "saved_collection_items", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"customer_user_id", "collection_id"})
})
public class SavedCollectionItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "customer_user_id", nullable = false)
    private CustomerUser customerUser;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "collection_id", nullable = false)
    private CollectionEntity collection;

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public SavedCollectionItem() {}

    public SavedCollectionItem(CustomerUser customerUser, CollectionEntity collection) {
        this.customerUser = customerUser;
        this.collection = collection;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public CustomerUser getCustomerUser() { return customerUser; }
    public void setCustomerUser(CustomerUser customerUser) { this.customerUser = customerUser; }

    public CollectionEntity getCollection() { return collection; }
    public void setCollection(CollectionEntity collection) { this.collection = collection; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
