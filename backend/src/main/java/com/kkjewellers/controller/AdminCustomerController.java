package com.kkjewellers.controller;

import com.kkjewellers.entity.*;
import com.kkjewellers.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin/customers")
public class AdminCustomerController {

    private final CustomerUserRepository customerUserRepository;
    private final WishlistItemRepository wishlistItemRepository;
    private final EnquiryRepository enquiryRepository;
    private final AppointmentRepository appointmentRepository;

    public AdminCustomerController(
            CustomerUserRepository customerUserRepository,
            WishlistItemRepository wishlistItemRepository,
            EnquiryRepository enquiryRepository,
            AppointmentRepository appointmentRepository
    ) {
        this.customerUserRepository = customerUserRepository;
        this.wishlistItemRepository = wishlistItemRepository;
        this.enquiryRepository = enquiryRepository;
        this.appointmentRepository = appointmentRepository;
    }

    @GetMapping
    public ResponseEntity<?> getAllCustomers(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String status
    ) {
        List<CustomerUser> customers = customerUserRepository.findAll();

        if (search != null && !search.isBlank()) {
            String q = search.trim().toLowerCase();
            customers = customers.stream().filter(c ->
                c.getFirstName().toLowerCase().contains(q) ||
                c.getLastName().toLowerCase().contains(q) ||
                c.getEmail().toLowerCase().contains(q) ||
                c.getMobile().contains(q)
            ).toList();
        }

        if (status != null && !status.isBlank() && !"ALL".equalsIgnoreCase(status)) {
            customers = customers.stream().filter(c -> c.getStatus().equalsIgnoreCase(status)).toList();
        }

        List<Map<String, Object>> result = customers.stream().map(c -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", c.getId());
            map.put("firstName", c.getFirstName());
            map.put("lastName", c.getLastName());
            map.put("email", c.getEmail());
            map.put("mobile", c.getMobile());
            map.put("status", c.getStatus());
            map.put("createdAt", c.getCreatedAt());
            map.put("wishlistCount", wishlistItemRepository.countByCustomerUserId(c.getId()));
            map.put("enquiryCount", enquiryRepository.countByCustomerUserId(c.getId()));
            map.put("appointmentCount", appointmentRepository.countByCustomerUserId(c.getId()));
            return map;
        }).toList();

        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCustomerDetail(@PathVariable Long id) {
        Optional<CustomerUser> userOpt = customerUserRepository.findById(id);
        if (userOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        CustomerUser customer = userOpt.get();
        List<WishlistItem> wishlist = wishlistItemRepository.findByCustomerUserIdOrderByCreatedAtDesc(id);
        List<Enquiry> enquiries = enquiryRepository.findByCustomerUserIdOrderByCreatedAtDesc(id);
        List<Appointment> appointments = appointmentRepository.findByCustomerUserIdOrderByPreferredDateAscCreatedAtDesc(id);

        Map<String, Object> response = new HashMap<>();
        response.put("customer", customer);
        response.put("wishlist", wishlist);
        response.put("enquiries", enquiries);
        response.put("appointments", appointments);

        return ResponseEntity.ok(response);
    }
}
