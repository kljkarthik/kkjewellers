package com.kkjewellers.controller;

import com.kkjewellers.entity.*;
import com.kkjewellers.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PublicCatalogueController {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final CollectionRepository collectionRepository;
    private final GalleryItemRepository galleryItemRepository;
    private final WebsiteSettingsRepository websiteSettingsRepository;

    public PublicCatalogueController(
            ProductRepository productRepository,
            CategoryRepository categoryRepository,
            CollectionRepository collectionRepository,
            GalleryItemRepository galleryItemRepository,
            WebsiteSettingsRepository websiteSettingsRepository
    ) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.collectionRepository = collectionRepository;
        this.galleryItemRepository = galleryItemRepository;
        this.websiteSettingsRepository = websiteSettingsRepository;
    }

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getProducts(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String collection,
            @RequestParam(required = false) String material,
            @RequestParam(required = false) String gender,
            @RequestParam(required = false) String occasion
    ) {
        List<Product> products = productRepository.filterProducts(
                query, category, collection, material, gender, occasion
        );
        return ResponseEntity.ok(products);
    }

    @GetMapping("/products/featured")
    public ResponseEntity<List<Product>> getFeaturedProducts() {
        return ResponseEntity.ok(productRepository.findByFeaturedTrueAndActiveTrue());
    }

    @GetMapping("/products/new-arrivals")
    public ResponseEntity<List<Product>> getNewArrivals() {
        return ResponseEntity.ok(productRepository.findByNewArrivalTrueAndActiveTrue());
    }

    @GetMapping("/products/code/{code}")
    public ResponseEntity<Product> getProductByCode(@PathVariable String code) {
        return productRepository.findByProductCode(code)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return productRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getCategories() {
        return ResponseEntity.ok(categoryRepository.findByActiveTrueOrderByDisplayOrderAsc());
    }

    @GetMapping("/collections")
    public ResponseEntity<List<CollectionEntity>> getCollections() {
        return ResponseEntity.ok(collectionRepository.findByActiveTrueOrderByDisplayOrderAsc());
    }

    @GetMapping("/gallery")
    public ResponseEntity<List<GalleryItem>> getGallery(@RequestParam(required = false) String category) {
        if (category != null && !category.trim().isEmpty() && !category.equalsIgnoreCase("All")) {
            return ResponseEntity.ok(galleryItemRepository.findByCategoryAndActiveTrueOrderByDisplayOrderAsc(category));
        }
        return ResponseEntity.ok(galleryItemRepository.findByActiveTrueOrderByDisplayOrderAsc());
    }

    @GetMapping("/settings")
    public ResponseEntity<WebsiteSettings> getWebsiteSettings() {
        return websiteSettingsRepository.findAll().stream().findFirst()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
