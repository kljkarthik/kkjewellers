package com.kkjewellers.repository;

import com.kkjewellers.entity.SavedCollectionItem;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface SavedCollectionItemRepository extends MongoRepository<SavedCollectionItem, String> {
    List<SavedCollectionItem> findByCustomerUserIdOrderByCreatedAtDesc(String customerUserId);
    Optional<SavedCollectionItem> findByCustomerUserIdAndCollectionId(String customerUserId, String collectionId);
    void deleteByCustomerUserIdAndCollectionId(String customerUserId, String collectionId);
}
