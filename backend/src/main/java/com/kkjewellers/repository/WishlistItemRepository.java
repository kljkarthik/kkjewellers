package com.kkjewellers.repository;

import com.kkjewellers.entity.WishlistItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WishlistItemRepository extends JpaRepository<WishlistItem, Long> {
    List<WishlistItem> findByCustomerUserIdOrderByCreatedAtDesc(Long customerUserId);
    Optional<WishlistItem> findByCustomerUserIdAndProductId(Long customerUserId, Long productId);
    boolean existsByCustomerUserIdAndProductId(Long customerUserId, Long productId);
    long countByCustomerUserId(Long customerUserId);
    void deleteByCustomerUserIdAndProductId(Long customerUserId, Long productId);
}
