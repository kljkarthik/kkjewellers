package com.kkjewellers.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "products")
public class Product {
    @Id
    private String id;

    private String name;

    @Indexed(unique = true)
    private String productCode; // SKU, e.g., KK-NK-001

    @DBRef
    private Category category;

    @DBRef
    private CollectionEntity collection;

    private String material; // Gold, Diamond, Silver
    private String purity;   // 22K, 18K, 14K, 925
    private String weight;   // e.g. "45.5 gms"
    private String gender;   // Women, Men, Kids
    private String occasion; // Wedding, Engagement, Festival, Party, Daily Wear

    private String shortDescription;
    private String fullDescription;

    @Indexed
    private Boolean featured;

    @Indexed
    private Boolean newArrival;

    @Indexed
    private Boolean active;

    private LocalDateTime createdAt;

    private List<ProductImage> images = new ArrayList<>();

    public Product() {
        this.featured = false;
        this.newArrival = false;
        this.active = true;
        this.createdAt = LocalDateTime.now();
    }

    public void addImage(ProductImage image) {
        images.add(image);
        image.setProduct(this);
    }

    public void removeImage(ProductImage image) {
        images.remove(image);
        image.setProduct(null);
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getProductCode() { return productCode; }
    public void setProductCode(String productCode) { this.productCode = productCode; }

    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }

    public CollectionEntity getCollection() { return collection; }
    public void setCollection(CollectionEntity collection) { this.collection = collection; }

    public String getMaterial() { return material; }
    public void setMaterial(String material) { this.material = material; }

    public String getPurity() { return purity; }
    public void setPurity(String purity) { this.purity = purity; }

    public String getWeight() { return weight; }
    public void setWeight(String weight) { this.weight = weight; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getOccasion() { return occasion; }
    public void setOccasion(String occasion) { this.occasion = occasion; }

    public String getShortDescription() { return shortDescription; }
    public void setShortDescription(String shortDescription) { this.shortDescription = shortDescription; }

    public String getFullDescription() { return fullDescription; }
    public void setFullDescription(String fullDescription) { this.fullDescription = fullDescription; }

    public Boolean getFeatured() { return featured; }
    public void setFeatured(Boolean featured) { this.featured = featured; }

    public Boolean getNewArrival() { return newArrival; }
    public void setNewArrival(Boolean newArrival) { this.newArrival = newArrival; }

    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public List<ProductImage> getImages() { return images; }
    public void setImages(List<ProductImage> images) { this.images = images; }
}
