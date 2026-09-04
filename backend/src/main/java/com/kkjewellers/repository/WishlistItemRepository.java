package com.kkjewellers.repository;

import com.kkjewellers.entity.WishlistItem;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface WishlistItemRepository extends MongoRepository<WishlistItem, String> {
    List<WishlistItem> findByCustomerUserIdOrderByCreatedAtDesc(String customerUserId);
    Optional<WishlistItem> findByCustomerUserIdAndProductId(String customerUserId, String productId);
    void deleteByCustomerUserIdAndProductId(String customerUserId, String productId);
    long countByCustomerUserId(String customerUserId);
}
