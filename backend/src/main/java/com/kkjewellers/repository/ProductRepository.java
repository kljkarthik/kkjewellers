package com.kkjewellers.repository;

import com.kkjewellers.entity.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends MongoRepository<Product, String>, ProductRepositoryCustom {
    Optional<Product> findByProductCode(String productCode);
    List<Product> findByActiveTrue();
    List<Product> findByFeaturedTrueAndActiveTrue();
    List<Product> findByNewArrivalTrueAndActiveTrue();
    
    List<Product> findByCategoryIdAndActiveTrue(String categoryId);
    List<Product> findByCollectionIdAndActiveTrue(String collectionId);
}
