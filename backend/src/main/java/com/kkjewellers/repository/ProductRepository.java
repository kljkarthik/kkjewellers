package com.kkjewellers.repository;

import com.kkjewellers.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findByProductCode(String productCode);
    List<Product> findByActiveTrue();
    List<Product> findByFeaturedTrueAndActiveTrue();
    List<Product> findByNewArrivalTrueAndActiveTrue();
    
    List<Product> findByCategoryIdAndActiveTrue(Long categoryId);
    List<Product> findByCollectionIdAndActiveTrue(Long collectionId);

    @Query("SELECT p FROM Product p WHERE p.active = true AND " +
           "(:query IS NULL OR :query = '' OR LOWER(p.name) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(p.productCode) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(p.shortDescription) LIKE LOWER(CONCAT('%', :query, '%'))) AND " +
           "(:categorySlug IS NULL OR :categorySlug = '' OR p.category.slug = :categorySlug) AND " +
           "(:collectionSlug IS NULL OR :collectionSlug = '' OR p.collection.slug = :collectionSlug) AND " +
           "(:material IS NULL OR :material = '' OR LOWER(p.material) = LOWER(:material)) AND " +
           "(:gender IS NULL OR :gender = '' OR LOWER(p.gender) = LOWER(:gender)) AND " +
           "(:occasion IS NULL OR :occasion = '' OR LOWER(p.occasion) = LOWER(:occasion)) " +
           "ORDER BY p.createdAt DESC")
    List<Product> filterProducts(
            @Param("query") String query,
            @Param("categorySlug") String categorySlug,
            @Param("collectionSlug") String collectionSlug,
            @Param("material") String material,
            @Param("gender") String gender,
            @Param("occasion") String occasion
    );
}
