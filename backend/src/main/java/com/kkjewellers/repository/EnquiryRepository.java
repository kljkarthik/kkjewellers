package com.kkjewellers.repository;

import com.kkjewellers.entity.Enquiry;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface EnquiryRepository extends MongoRepository<Enquiry, String> {
    List<Enquiry> findByCustomerUserIdOrderByCreatedAtDesc(String customerUserId);
    List<Enquiry> findByStatusOrderByCreatedAtDesc(String status);
    List<Enquiry> findAllByOrderByCreatedAtDesc();
    long countByStatus(String status);
    long countByCustomerUserId(String customerUserId);
}
