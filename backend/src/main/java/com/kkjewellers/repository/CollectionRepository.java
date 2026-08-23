package com.kkjewellers.repository;

import com.kkjewellers.entity.CollectionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface CollectionRepository extends JpaRepository<CollectionEntity, Long> {
    Optional<CollectionEntity> findBySlug(String slug);
    List<CollectionEntity> findByActiveTrueOrderByDisplayOrderAsc();
    List<CollectionEntity> findByFeaturedTrueAndActiveTrueOrderByDisplayOrderAsc();
    List<CollectionEntity> findAllByOrderByDisplayOrderAsc();
}
