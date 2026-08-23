package com.kkjewellers.repository;

import com.kkjewellers.entity.Enquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EnquiryRepository extends JpaRepository<Enquiry, Long> {
    List<Enquiry> findAllByOrderByCreatedAtDesc();
    long countByStatus(String status);
    List<Enquiry> findByCustomerUserIdOrderByCreatedAtDesc(Long customerUserId);
    long countByCustomerUserId(Long customerUserId);
}
