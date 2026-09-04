package com.kkjewellers.repository;

import com.kkjewellers.entity.CollectionEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface CollectionRepository extends MongoRepository<CollectionEntity, String> {
    Optional<CollectionEntity> findBySlug(String slug);
    List<CollectionEntity> findByActiveTrueOrderByDisplayOrderAsc();
    List<CollectionEntity> findByFeaturedTrueAndActiveTrueOrderByDisplayOrderAsc();
}
