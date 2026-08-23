package com.kkjewellers.repository;

import com.kkjewellers.entity.SavedCollectionItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SavedCollectionItemRepository extends JpaRepository<SavedCollectionItem, Long> {
    List<SavedCollectionItem> findByCustomerUserIdOrderByCreatedAtDesc(Long customerUserId);
    Optional<SavedCollectionItem> findByCustomerUserIdAndCollectionId(Long customerUserId, Long collectionId);
    boolean existsByCustomerUserIdAndCollectionId(Long customerUserId, Long collectionId);
    long countByCustomerUserId(Long customerUserId);
    void deleteByCustomerUserIdAndCollectionId(Long customerUserId, Long collectionId);
}
