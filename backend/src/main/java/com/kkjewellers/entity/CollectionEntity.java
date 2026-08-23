package com.kkjewellers.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "collections")
public class CollectionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false, unique = true)
    private String slug;

    @Column(length = 1000)
    private String description;

    @Column(columnDefinition = "LONGTEXT")
    private String coverImage;
    private Boolean active;
    private Boolean featured;
    private Integer displayOrder;

    public CollectionEntity() {
        this.active = true;
        this.featured = false;
        this.displayOrder = 0;
    }

    public CollectionEntity(String name, String slug, String description, String coverImage, Boolean featured, Integer displayOrder) {
        this.name = name;
        this.slug = slug;
        this.description = description;
        this.coverImage = coverImage;
        this.featured = featured;
        this.displayOrder = displayOrder;
        this.active = true;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCoverImage() { return coverImage; }
    public void setCoverImage(String coverImage) { this.coverImage = coverImage; }

    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }

    public Boolean getFeatured() { return featured; }
    public void setFeatured(Boolean featured) { this.featured = featured; }

    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) { this.displayOrder = displayOrder; }
}
