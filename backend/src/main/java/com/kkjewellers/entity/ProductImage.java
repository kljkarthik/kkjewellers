package com.kkjewellers.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.Id;

public class ProductImage {
    @Id
    private String id;

    @JsonIgnore
    private Product product;

    private String imageUrl;
    private String cloudinaryPublicId;
    private Boolean primaryImage;
    private Integer displayOrder;

    public ProductImage() {
        this.primaryImage = false;
        this.displayOrder = 0;
    }

    public ProductImage(String imageUrl, Boolean primaryImage, Integer displayOrder) {
        this.imageUrl = imageUrl;
        this.primaryImage = primaryImage;
        this.displayOrder = displayOrder;
    }

    public ProductImage(String imageUrl, String cloudinaryPublicId, Boolean primaryImage, Integer displayOrder) {
        this.imageUrl = imageUrl;
        this.cloudinaryPublicId = cloudinaryPublicId;
        this.primaryImage = primaryImage;
        this.displayOrder = displayOrder;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getCloudinaryPublicId() { return cloudinaryPublicId; }
    public void setCloudinaryPublicId(String cloudinaryPublicId) { this.cloudinaryPublicId = cloudinaryPublicId; }

    public Boolean getPrimaryImage() { return primaryImage; }
    public void setPrimaryImage(Boolean primaryImage) { this.primaryImage = primaryImage; }

    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }
}
