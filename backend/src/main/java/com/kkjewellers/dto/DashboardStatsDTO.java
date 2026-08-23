package com.kkjewellers.dto;

public class DashboardStatsDTO {
    private long totalProducts;
    private long totalCategories;
    private long totalCollections;
    private long newArrivalsCount;
    private long featuredCount;
    private long newEnquiriesCount;
    private long upcomingAppointmentsCount;

    public DashboardStatsDTO(long totalProducts, long totalCategories, long totalCollections, long newArrivalsCount, long featuredCount, long newEnquiriesCount, long upcomingAppointmentsCount) {
        this.totalProducts = totalProducts;
        this.totalCategories = totalCategories;
        this.totalCollections = totalCollections;
        this.newArrivalsCount = newArrivalsCount;
        this.featuredCount = featuredCount;
        this.newEnquiriesCount = newEnquiriesCount;
        this.upcomingAppointmentsCount = upcomingAppointmentsCount;
    }

    // Getters
    public long getTotalProducts() { return totalProducts; }
    public long getTotalCategories() { return totalCategories; }
    public long getTotalCollections() { return totalCollections; }
    public long getNewArrivalsCount() { return newArrivalsCount; }
    public long getFeaturedCount() { return featuredCount; }
    public long getNewEnquiriesCount() { return newEnquiriesCount; }
    public long getUpcomingAppointmentsCount() { return upcomingAppointmentsCount; }
}
