package com.kkjewellers.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "gallery")
public class GalleryItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String category; // Jewellery, Bridal, Showroom, Events, Collections

    @Column(nullable = false, columnDefinition = "LONGTEXT")
    private String imageUrl;

    private Integer displayOrder;
    private Boolean active;

    public GalleryItem() {
        this.active = true;
        this.displayOrder = 0;
    }

    public GalleryItem(String title, String category, String imageUrl, Integer displayOrder) {
        this.title = title;
        this.category = category;
        this.imageUrl = imageUrl;
        this.displayOrder = displayOrder;
        this.active = true;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }

    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }
}
