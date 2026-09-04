package com.kkjewellers.repository;

import com.kkjewellers.entity.GalleryItem;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface GalleryItemRepository extends MongoRepository<GalleryItem, String> {
    List<GalleryItem> findByActiveTrueOrderByDisplayOrderAsc();
    List<GalleryItem> findByCategoryAndActiveTrueOrderByDisplayOrderAsc(String category);
}
