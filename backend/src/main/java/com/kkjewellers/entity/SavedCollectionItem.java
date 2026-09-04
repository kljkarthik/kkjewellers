package com.kkjewellers.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "saved_collection_items")
public class SavedCollectionItem {

    @Id
    private String id;

    @DBRef
    private CustomerUser customerUser;

    @DBRef
    private CollectionEntity collection;

    private LocalDateTime createdAt;

    public SavedCollectionItem() {
        this.createdAt = LocalDateTime.now();
    }

    public SavedCollectionItem(CustomerUser customerUser, CollectionEntity collection) {
        this.customerUser = customerUser;
        this.collection = collection;
        this.createdAt = LocalDateTime.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public CustomerUser getCustomerUser() { return customerUser; }
    public void setCustomerUser(CustomerUser customerUser) { this.customerUser = customerUser; }

    public CollectionEntity getCollection() { return collection; }
    public void setCollection(CollectionEntity collection) { this.collection = collection; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
