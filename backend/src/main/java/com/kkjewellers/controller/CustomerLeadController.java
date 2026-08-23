package com.kkjewellers.controller;

import com.kkjewellers.entity.Appointment;
import com.kkjewellers.entity.Enquiry;
import com.kkjewellers.repository.AppointmentRepository;
import com.kkjewellers.repository.EnquiryRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class CustomerLeadController {

    private final EnquiryRepository enquiryRepository;
    private final AppointmentRepository appointmentRepository;

    public CustomerLeadController(EnquiryRepository enquiryRepository, AppointmentRepository appointmentRepository) {
        this.enquiryRepository = enquiryRepository;
        this.appointmentRepository = appointmentRepository;
    }

    @PostMapping("/enquiries")
    public ResponseEntity<?> submitEnquiry(@RequestBody Enquiry enquiry) {
        if (enquiry.getCustomerName() == null || enquiry.getCustomerName().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Customer name is required"));
        }
        if (enquiry.getPhone() == null || enquiry.getPhone().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Mobile number is required"));
        }
        if (enquiry.getMessage() == null || enquiry.getMessage().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Message is required"));
        }

        Enquiry saved = enquiryRepository.save(enquiry);
        return ResponseEntity.ok(Map.of(
                "message", "Thank you! Your enquiry has been received. Our jewellery master will contact you shortly.",
                "enquiryId", saved.getId()
        ));
    }

    @PostMapping("/appointments")
    public ResponseEntity<?> bookAppointment(@RequestBody Appointment appointment) {
        if (appointment.getCustomerName() == null || appointment.getCustomerName().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Customer name is required"));
        }
        if (appointment.getPhone() == null || appointment.getPhone().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Mobile number is required"));
        }
        if (appointment.getPreferredDate() == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Preferred date is required"));
        }
        if (appointment.getPreferredDate().isBefore(LocalDate.now())) {
            return ResponseEntity.badRequest().body(Map.of("error", "Preferred date cannot be in the past"));
        }
        if (appointment.getPreferredTime() == null || appointment.getPreferredTime().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Preferred time is required"));
        }

        Appointment saved = appointmentRepository.save(appointment);
        return ResponseEntity.ok(Map.of(
                "message", "Your showroom visit appointment has been booked! We look forward to welcoming you to KK JEWELLERS.",
                "appointmentId", saved.getId()
        ));
    }
}
