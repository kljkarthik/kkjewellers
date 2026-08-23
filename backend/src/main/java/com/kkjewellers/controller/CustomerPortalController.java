package com.kkjewellers.controller;

import com.kkjewellers.dto.CustomerDTOs.*;
import com.kkjewellers.entity.*;
import com.kkjewellers.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/customer")
public class CustomerPortalController {

    private final CustomerUserRepository customerUserRepository;
    private final WishlistItemRepository wishlistItemRepository;
    private final SavedCollectionItemRepository savedCollectionItemRepository;
    private final CustomerNotificationRepository customerNotificationRepository;
    private final EnquiryRepository enquiryRepository;
    private final AppointmentRepository appointmentRepository;
    private final ProductRepository productRepository;
    private final CollectionRepository collectionRepository;

    public CustomerPortalController(
            CustomerUserRepository customerUserRepository,
            WishlistItemRepository wishlistItemRepository,
            SavedCollectionItemRepository savedCollectionItemRepository,
            CustomerNotificationRepository customerNotificationRepository,
            EnquiryRepository enquiryRepository,
            AppointmentRepository appointmentRepository,
            ProductRepository productRepository,
            CollectionRepository collectionRepository
    ) {
        this.customerUserRepository = customerUserRepository;
        this.wishlistItemRepository = wishlistItemRepository;
        this.savedCollectionItemRepository = savedCollectionItemRepository;
        this.customerNotificationRepository = customerNotificationRepository;
        this.enquiryRepository = enquiryRepository;
        this.appointmentRepository = appointmentRepository;
        this.productRepository = productRepository;
        this.collectionRepository = collectionRepository;
    }

    private CustomerUser getAuthenticatedCustomer() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof String email) {
            return customerUserRepository.findByEmail(email).orElse(null);
        } else if (principal instanceof CustomerUser customer) {
            return customer;
        }
        return null;
    }

    // PROFILE
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@RequestParam(required = false) Long customerId) {
        CustomerUser customer = getAuthenticatedCustomer();
        if (customer == null && customerId != null) {
            customer = customerUserRepository.findById(customerId).orElse(null);
        }
        if (customer == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthorized customer session"));
        }
        return ResponseEntity.ok(customer);
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestBody CustomerProfileUpdateRequest request) {
        CustomerUser customer = getAuthenticatedCustomer();
        if (customer == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthorized customer session"));
        }
        if (request.getFirstName() != null) customer.setFirstName(request.getFirstName().trim());
        if (request.getLastName() != null) customer.setLastName(request.getLastName().trim());
        if (request.getEmail() != null) customer.setEmail(request.getEmail().trim().toLowerCase());
        if (request.getMobile() != null) customer.setMobile(request.getMobile().trim());
        if (request.getDateOfBirth() != null) customer.setDateOfBirth(request.getDateOfBirth());
        if (request.getPreferredCategory() != null) customer.setPreferredCategory(request.getPreferredCategory());

        customerUserRepository.save(customer);
        return ResponseEntity.ok(customer);
    }

    // WISHLIST
    @GetMapping("/wishlist")
    public ResponseEntity<?> getWishlist(@RequestParam Long customerId) {
        List<WishlistItem> items = wishlistItemRepository.findByCustomerUserIdOrderByCreatedAtDesc(customerId);
        return ResponseEntity.ok(items);
    }

    @PostMapping("/wishlist/{productId}")
    public ResponseEntity<?> toggleWishlist(@PathVariable Long productId, @RequestParam Long customerId) {
        Optional<CustomerUser> customerOpt = customerUserRepository.findById(customerId);
        Optional<Product> productOpt = productRepository.findById(productId);

        if (customerOpt.isEmpty() || productOpt.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid customer or product"));
        }

        CustomerUser customer = customerOpt.get();
        Product product = productOpt.get();

        Optional<WishlistItem> existing = wishlistItemRepository.findByCustomerUserIdAndProductId(customerId, productId);

        if (existing.isPresent()) {
            wishlistItemRepository.delete(existing.get());
            return ResponseEntity.ok(Map.of("saved", false, "message", "Removed from wishlist"));
        } else {
            WishlistItem item = new WishlistItem(customer, product);
            wishlistItemRepository.save(item);
            return ResponseEntity.ok(Map.of("saved", true, "message", "Added to wishlist"));
        }
    }

    // SAVED COLLECTIONS
    @GetMapping("/collections")
    public ResponseEntity<?> getSavedCollections(@RequestParam Long customerId) {
        List<SavedCollectionItem> collections = savedCollectionItemRepository.findByCustomerUserIdOrderByCreatedAtDesc(customerId);
        return ResponseEntity.ok(collections);
    }

    @PostMapping("/collections/{collectionId}")
    public ResponseEntity<?> toggleSavedCollection(@PathVariable Long collectionId, @RequestParam Long customerId) {
        Optional<CustomerUser> customerOpt = customerUserRepository.findById(customerId);
        Optional<CollectionEntity> colOpt = collectionRepository.findById(collectionId);

        if (customerOpt.isEmpty() || colOpt.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid customer or collection"));
        }

        Optional<SavedCollectionItem> existing = savedCollectionItemRepository.findByCustomerUserIdAndCollectionId(customerId, collectionId);

        if (existing.isPresent()) {
            savedCollectionItemRepository.delete(existing.get());
            return ResponseEntity.ok(Map.of("saved", false, "message", "Removed from saved collections"));
        } else {
            SavedCollectionItem item = new SavedCollectionItem(customerOpt.get(), colOpt.get());
            savedCollectionItemRepository.save(item);
            return ResponseEntity.ok(Map.of("saved", true, "message", "Collection saved"));
        }
    }

    // ENQUIRIES
    @GetMapping("/enquiries")
    public ResponseEntity<?> getCustomerEnquiries(@RequestParam Long customerId) {
        List<Enquiry> enquiries = enquiryRepository.findByCustomerUserIdOrderByCreatedAtDesc(customerId);
        // Exclude internal notes for customer view
        enquiries.forEach(e -> e.setInternalNotes(null));
        return ResponseEntity.ok(enquiries);
    }

    @PostMapping("/enquiries")
    public ResponseEntity<?> createCustomerEnquiry(@RequestBody Enquiry enquiry, @RequestParam(required = false) Long customerId) {
        if (customerId != null) {
            customerUserRepository.findById(customerId).ifPresent(enquiry::setCustomerUser);
        }
        Enquiry saved = enquiryRepository.save(enquiry);
        return ResponseEntity.ok(saved);
    }

    // APPOINTMENTS
    @GetMapping("/appointments")
    public ResponseEntity<?> getCustomerAppointments(@RequestParam Long customerId) {
        List<Appointment> appointments = appointmentRepository.findByCustomerUserIdOrderByPreferredDateAscCreatedAtDesc(customerId);
        return ResponseEntity.ok(appointments);
    }

    @PostMapping("/appointments")
    public ResponseEntity<?> createCustomerAppointment(@RequestBody Appointment appointment, @RequestParam(required = false) Long customerId) {
        if (customerId != null) {
            customerUserRepository.findById(customerId).ifPresent(appointment::setCustomerUser);
        }
        Appointment saved = appointmentRepository.save(appointment);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/appointments/{id}/cancel")
    public ResponseEntity<?> cancelAppointment(@PathVariable Long id, @RequestParam Long customerId) {
        Optional<Appointment> appOpt = appointmentRepository.findById(id);
        if (appOpt.isPresent()) {
            Appointment app = appOpt.get();
            app.setStatus("CANCELLED");
            appointmentRepository.save(app);
            return ResponseEntity.ok(app);
        }
        return ResponseEntity.notFound().build();
    }

    // NOTIFICATIONS
    @GetMapping("/notifications")
    public ResponseEntity<?> getCustomerNotifications(@RequestParam Long customerId) {
        List<CustomerNotification> notifications = customerNotificationRepository.findByCustomerUserIdOrderByCreatedAtDesc(customerId);
        return ResponseEntity.ok(notifications);
    }

    @PutMapping("/notifications/{id}/read")
    public ResponseEntity<?> markNotificationRead(@PathVariable Long id) {
        customerNotificationRepository.findById(id).ifPresent(n -> {
            n.setRead(true);
            customerNotificationRepository.save(n);
        });
        return ResponseEntity.ok().build();
    }
}
