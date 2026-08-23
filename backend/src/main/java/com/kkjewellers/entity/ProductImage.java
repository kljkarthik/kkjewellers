package com.kkjewellers.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "product_images")
public class ProductImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    @JsonIgnore
    private Product product;

    @Column(nullable = false, columnDefinition = "LONGTEXT")
    private String imageUrl;

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

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public Boolean getPrimaryImage() { return primaryImage; }
    public void setPrimaryImage(Boolean primaryImage) { this.primaryImage = primaryImage; }

    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }
}
