package com.kkjewellers.repository;

import com.kkjewellers.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findAllByOrderByPreferredDateAscCreatedAtDesc();
    long countByStatus(String status);
    List<Appointment> findByCustomerUserIdOrderByPreferredDateAscCreatedAtDesc(Long customerUserId);
    long countByCustomerUserId(Long customerUserId);
}
