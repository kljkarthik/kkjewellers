package com.kkjewellers.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "website_settings")
public class WebsiteSettings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String businessName;
    private String tagline;

    @Column(columnDefinition = "LONGTEXT")
    private String logoUrl;
    private String phone;
    private String whatsappNumber;
    private String email;

    @Column(length = 1000)
    private String address;

    @Column(length = 2000)
    private String googleMapsUrl;

    private String openingHours;
    private String instagram;
    private String facebook;
    private String youtube;

    @Column(length = 2000)
    private String footerDescription;

    public WebsiteSettings() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getBusinessName() { return businessName; }
    public void setBusinessName(String businessName) { this.businessName = businessName; }

    public String getTagline() { return tagline; }
    public void setTagline(String tagline) { this.tagline = tagline; }

    public String getLogoUrl() { return logoUrl; }
    public void setLogoUrl(String logoUrl) { this.logoUrl = logoUrl; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getWhatsappNumber() { return whatsappNumber; }
    public void setWhatsappNumber(String whatsappNumber) { this.whatsappNumber = whatsappNumber; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getGoogleMapsUrl() { return googleMapsUrl; }
    public void setGoogleMapsUrl(String googleMapsUrl) { this.googleMapsUrl = googleMapsUrl; }

    public String getOpeningHours() { return openingHours; }
    public void setOpeningHours(String openingHours) { this.openingHours = openingHours; }

    public String getInstagram() { return instagram; }
    public void setInstagram(String instagram) { this.instagram = instagram; }

    public String getFacebook() { return facebook; }
    public void setFacebook(String facebook) { this.facebook = facebook; }

    public String getYoutube() { return youtube; }
    public void setYoutube(String youtube) { this.youtube = youtube; }

    public String getFooterDescription() { return footerDescription; }
    public void setFooterDescription(String footerDescription) { this.footerDescription = footerDescription; }
}
