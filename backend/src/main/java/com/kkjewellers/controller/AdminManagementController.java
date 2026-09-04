package com.kkjewellers.controller;

import com.kkjewellers.dto.DashboardStatsDTO;
import com.kkjewellers.entity.*;
import com.kkjewellers.repository.*;
import com.kkjewellers.service.CloudinaryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminManagementController {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final CollectionRepository collectionRepository;
    private final EnquiryRepository enquiryRepository;
    private final AppointmentRepository appointmentRepository;
    private final GalleryItemRepository galleryItemRepository;
    private final WebsiteSettingsRepository websiteSettingsRepository;
    private final CloudinaryService cloudinaryService;

    public AdminManagementController(
            ProductRepository productRepository,
            CategoryRepository categoryRepository,
            CollectionRepository collectionRepository,
            EnquiryRepository enquiryRepository,
            AppointmentRepository appointmentRepository,
            GalleryItemRepository galleryItemRepository,
            WebsiteSettingsRepository websiteSettingsRepository,
            CloudinaryService cloudinaryService
    ) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.collectionRepository = collectionRepository;
        this.enquiryRepository = enquiryRepository;
        this.appointmentRepository = appointmentRepository;
        this.galleryItemRepository = galleryItemRepository;
        this.websiteSettingsRepository = websiteSettingsRepository;
        this.cloudinaryService = cloudinaryService;
    }

    // --- CLOUDINARY ADMIN IMAGE UPLOAD ---
    @PostMapping("/upload")
    public ResponseEntity<?> uploadImage(
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam(value = "base64", required = false) String base64Data,
            @RequestParam(value = "folder", defaultValue = "kk-jewellers/products") String folder
    ) {
        try {
            Object uploadSource = null;
            if (file != null && !file.isEmpty()) {
                uploadSource = file.getBytes();
            } else if (base64Data != null && !base64Data.trim().isEmpty()) {
                uploadSource = base64Data;
            }

            if (uploadSource == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "No image file or base64 data provided!"));
            }

            Map<String, String> uploadResult = cloudinaryService.uploadImage(uploadSource, folder);
            return ResponseEntity.ok(uploadResult);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", "Image upload failed: " + e.getMessage()));
        }
    }

    // --- DASHBOARD STATS ---
    @GetMapping("/dashboard/stats")
    public ResponseEntity<DashboardStatsDTO> getDashboardStats() {
        long totalProducts = productRepository.count();
        long totalCategories = categoryRepository.count();
        long totalCollections = collectionRepository.count();
        long newArrivals = productRepository.findByNewArrivalTrueAndActiveTrue().size();
        long featured = productRepository.findByFeaturedTrueAndActiveTrue().size();
        long newEnquiries = enquiryRepository.countByStatus("NEW");
        long pendingAppointments = appointmentRepository.countByStatus("PENDING");

        return ResponseEntity.ok(new DashboardStatsDTO(
                totalProducts, totalCategories, totalCollections, newArrivals, featured, newEnquiries, pendingAppointments
        ));
    }

    // --- PRODUCTS CRUD ---
    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProductsAdmin() {
        return ResponseEntity.ok(productRepository.findAll());
    }

    @PostMapping("/products")
    public ResponseEntity<?> createProduct(@RequestBody Product product) {
        if (product.getProductCode() != null && productRepository.findByProductCode(product.getProductCode()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Product Code / SKU already exists!"));
        }
        if (product.getImages() != null) {
            for (int i = 0; i < product.getImages().size(); i++) {
                ProductImage img = product.getImages().get(i);
                img.setProduct(product);
                if (img.getPrimaryImage() == null) img.setPrimaryImage(i == 0);
            }
        }
        Product saved = productRepository.save(product);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/products/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable String id, @RequestBody Product product) {
        return productRepository.findById(id).map(existing -> {
            existing.setName(product.getName());
            existing.setProductCode(product.getProductCode());
            existing.setCategory(product.getCategory());
            existing.setCollection(product.getCollection());
            existing.setMaterial(product.getMaterial());
            existing.setPurity(product.getPurity());
            existing.setWeight(product.getWeight());
            existing.setGender(product.getGender());
            existing.setOccasion(product.getOccasion());
            existing.setShortDescription(product.getShortDescription());
            existing.setFullDescription(product.getFullDescription());
            existing.setFeatured(product.getFeatured());
            existing.setNewArrival(product.getNewArrival());
            existing.setActive(product.getActive());

            if (product.getImages() != null) {
                existing.getImages().clear();
                for (int i = 0; i < product.getImages().size(); i++) {
                    ProductImage img = product.getImages().get(i);
                    img.setProduct(existing);
                    if (img.getPrimaryImage() == null) img.setPrimaryImage(i == 0);
                    existing.getImages().add(img);
                }
            }

            return ResponseEntity.ok(productRepository.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable String id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return ResponseEntity.ok(Map.of("message", "Product deleted successfully"));
        }
        return ResponseEntity.notFound().build();
    }

    // --- CATEGORIES CRUD ---
    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getAllCategoriesAdmin() {
        return ResponseEntity.ok(categoryRepository.findByActiveTrueOrderByDisplayOrderAsc());
    }

    @PostMapping("/categories")
    public ResponseEntity<Category> createCategory(@RequestBody Category category) {
        return ResponseEntity.ok(categoryRepository.save(category));
    }

    @PutMapping("/categories/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable String id, @RequestBody Category category) {
        return categoryRepository.findById(id).map(existing -> {
            existing.setName(category.getName());
            existing.setSlug(category.getSlug());
            existing.setDescription(category.getDescription());
            existing.setImageUrl(category.getImageUrl());
            existing.setCloudinaryPublicId(category.getCloudinaryPublicId());
            existing.setDisplayOrder(category.getDisplayOrder());
            existing.setActive(category.getActive());
            return ResponseEntity.ok(categoryRepository.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/categories/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable String id) {
        if (categoryRepository.existsById(id)) {
            categoryRepository.deleteById(id);
            return ResponseEntity.ok(Map.of("message", "Category deleted successfully"));
        }
        return ResponseEntity.notFound().build();
    }

    // --- COLLECTIONS CRUD ---
    @GetMapping("/collections")
    public ResponseEntity<List<CollectionEntity>> getAllCollectionsAdmin() {
        return ResponseEntity.ok(collectionRepository.findByActiveTrueOrderByDisplayOrderAsc());
    }

    @PostMapping("/collections")
    public ResponseEntity<CollectionEntity> createCollection(@RequestBody CollectionEntity collection) {
        return ResponseEntity.ok(collectionRepository.save(collection));
    }

    @PutMapping("/collections/{id}")
    public ResponseEntity<CollectionEntity> updateCollection(@PathVariable String id, @RequestBody CollectionEntity collection) {
        return collectionRepository.findById(id).map(existing -> {
            existing.setName(collection.getName());
            existing.setSlug(collection.getSlug());
            existing.setDescription(collection.getDescription());
            existing.setImageUrl(collection.getImageUrl());
            existing.setCloudinaryPublicId(collection.getCloudinaryPublicId());
            existing.setFeatured(collection.getFeatured());
            existing.setDisplayOrder(collection.getDisplayOrder());
            existing.setActive(collection.getActive());
            return ResponseEntity.ok(collectionRepository.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/collections/{id}")
    public ResponseEntity<?> deleteCollection(@PathVariable String id) {
        if (collectionRepository.existsById(id)) {
            collectionRepository.deleteById(id);
            return ResponseEntity.ok(Map.of("message", "Collection deleted successfully"));
        }
        return ResponseEntity.notFound().build();
    }

    // --- ENQUIRIES MANAGEMENT ---
    @GetMapping("/enquiries")
    public ResponseEntity<List<Enquiry>> getEnquiries() {
        return ResponseEntity.ok(enquiryRepository.findAllByOrderByCreatedAtDesc());
    }

    @PutMapping("/enquiries/{id}")
    public ResponseEntity<?> updateEnquiryStatus(@PathVariable String id, @RequestBody Map<String, String> body) {
        return enquiryRepository.findById(id).map(enquiry -> {
            if (body.containsKey("status")) enquiry.setStatus(body.get("status"));
            if (body.containsKey("internalNotes")) enquiry.setInternalNotes(body.get("internalNotes"));
            return ResponseEntity.ok(enquiryRepository.save(enquiry));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/enquiries/{id}")
    public ResponseEntity<?> deleteEnquiry(@PathVariable String id) {
        if (enquiryRepository.existsById(id)) {
            enquiryRepository.deleteById(id);
            return ResponseEntity.ok(Map.of("message", "Enquiry deleted"));
        }
        return ResponseEntity.notFound().build();
    }

    // --- APPOINTMENTS MANAGEMENT ---
    @GetMapping("/appointments")
    public ResponseEntity<List<Appointment>> getAppointments() {
        return ResponseEntity.ok(appointmentRepository.findAllByOrderByCreatedAtDesc());
    }

    @PutMapping("/appointments/{id}")
    public ResponseEntity<?> updateAppointmentStatus(@PathVariable String id, @RequestBody Map<String, String> body) {
        return appointmentRepository.findById(id).map(appointment -> {
            if (body.containsKey("status")) appointment.setStatus(body.get("status"));
            return ResponseEntity.ok(appointmentRepository.save(appointment));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/appointments/{id}")
    public ResponseEntity<?> deleteAppointment(@PathVariable String id) {
        if (appointmentRepository.existsById(id)) {
            appointmentRepository.deleteById(id);
            return ResponseEntity.ok(Map.of("message", "Appointment deleted"));
        }
        return ResponseEntity.notFound().build();
    }

    // --- GALLERY CRUD ---
    @GetMapping("/gallery")
    public ResponseEntity<List<GalleryItem>> getAdminGallery() {
        return ResponseEntity.ok(galleryItemRepository.findByActiveTrueOrderByDisplayOrderAsc());
    }

    @PostMapping("/gallery")
    public ResponseEntity<GalleryItem> createGalleryItem(@RequestBody GalleryItem item) {
        return ResponseEntity.ok(galleryItemRepository.save(item));
    }

    @PutMapping("/gallery/{id}")
    public ResponseEntity<GalleryItem> updateGalleryItem(@PathVariable String id, @RequestBody GalleryItem item) {
        return galleryItemRepository.findById(id).map(existing -> {
            existing.setTitle(item.getTitle());
            existing.setCategory(item.getCategory());
            existing.setImageUrl(item.getImageUrl());
            existing.setCloudinaryPublicId(item.getCloudinaryPublicId());
            existing.setDisplayOrder(item.getDisplayOrder());
            existing.setActive(item.getActive());
            return ResponseEntity.ok(galleryItemRepository.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/gallery/{id}")
    public ResponseEntity<?> deleteGalleryItem(@PathVariable String id) {
        if (galleryItemRepository.existsById(id)) {
            galleryItemRepository.deleteById(id);
            return ResponseEntity.ok(Map.of("message", "Gallery item deleted"));
        }
        return ResponseEntity.notFound().build();
    }

    // --- WEBSITE SETTINGS ---
    @GetMapping("/settings")
    public ResponseEntity<WebsiteSettings> getSettingsAdmin() {
        return websiteSettingsRepository.findAll().stream().findFirst()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/settings")
    public ResponseEntity<WebsiteSettings> updateSettingsAdmin(@RequestBody WebsiteSettings settings) {
        WebsiteSettings current = websiteSettingsRepository.findAll().stream().findFirst()
                .orElseGet(WebsiteSettings::new);

        current.setBusinessName(settings.getBusinessName());
        current.setTagline(settings.getTagline());
        current.setLogoUrl(settings.getLogoUrl());
        current.setLogoCloudinaryPublicId(settings.getLogoCloudinaryPublicId());
        current.setPhone(settings.getPhone());
        current.setWhatsappNumber(settings.getWhatsappNumber());
        current.setEmail(settings.getEmail());
        current.setAddress(settings.getAddress());
        current.setGoogleMapsUrl(settings.getGoogleMapsUrl());
        current.setOpeningHours(settings.getOpeningHours());
        current.setInstagram(settings.getInstagram());
        current.setFacebook(settings.getFacebook());
        current.setYoutube(settings.getYoutube());
        current.setFooterDescription(settings.getFooterDescription());

        return ResponseEntity.ok(websiteSettingsRepository.save(current));
    }
}
