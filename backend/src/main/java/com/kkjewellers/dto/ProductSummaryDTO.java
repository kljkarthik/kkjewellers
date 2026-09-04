package com.kkjewellers.dto;

import com.kkjewellers.entity.Category;
import com.kkjewellers.entity.CollectionEntity;
import com.kkjewellers.entity.Product;
import com.kkjewellers.entity.ProductImage;

public class ProductSummaryDTO {
    private String id;
    private String name;
    private String productCode;
    private String material;
    private String purity;
    private String weight;
    private String gender;
    private String occasion;
    private String shortDescription;
    private Boolean featured;
    private Boolean newArrival;
    private Boolean active;
    private Category category;
    private CollectionEntity collection;
    private String primaryImageUrl;

    public ProductSummaryDTO() {}

    public ProductSummaryDTO(Product product) {
        this.id = product.getId();
        this.name = product.getName();
        this.productCode = product.getProductCode();
        this.material = product.getMaterial();
        this.purity = product.getPurity();
        this.weight = product.getWeight();
        this.gender = product.getGender();
        this.occasion = product.getOccasion();
        this.shortDescription = product.getShortDescription();
        this.featured = product.getFeatured();
        this.newArrival = product.getNewArrival();
        this.active = product.getActive();
        this.category = product.getCategory();
        this.collection = product.getCollection();

        // Extract primary image or first available image URL
        if (product.getImages() != null && !product.getImages().isEmpty()) {
            this.primaryImageUrl = product.getImages().stream()
                    .filter(img -> Boolean.TRUE.equals(img.getPrimaryImage()))
                    .map(ProductImage::getImageUrl)
                    .findFirst()
                    .orElse(product.getImages().get(0).getImageUrl());
        }
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getProductCode() { return productCode; }
    public void setProductCode(String productCode) { this.productCode = productCode; }

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

    public Boolean getFeatured() { return featured; }
    public void setFeatured(Boolean featured) { this.featured = featured; }

    public Boolean getNewArrival() { return newArrival; }
    public void setNewArrival(Boolean newArrival) { this.newArrival = newArrival; }

    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }

    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }

    public CollectionEntity getCollection() { return collection; }
    public void setCollection(CollectionEntity collection) { this.collection = collection; }

    public String getPrimaryImageUrl() { return primaryImageUrl; }
    public void setPrimaryImageUrl(String primaryImageUrl) { this.primaryImageUrl = primaryImageUrl; }
}
