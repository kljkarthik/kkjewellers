package com.kkjewellers.repository;

import com.kkjewellers.entity.Appointment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AppointmentRepository extends MongoRepository<Appointment, String> {
    List<Appointment> findByCustomerUserIdOrderByCreatedAtDesc(String customerUserId);
    List<Appointment> findByStatusOrderByCreatedAtDesc(String status);
    List<Appointment> findAllByOrderByCreatedAtDesc();
    long countByStatus(String status);
    long countByCustomerUserId(String customerUserId);
}
