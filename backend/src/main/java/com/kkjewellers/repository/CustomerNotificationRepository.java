package com.kkjewellers.repository;

import com.kkjewellers.entity.CustomerNotification;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CustomerNotificationRepository extends MongoRepository<CustomerNotification, String> {
    List<CustomerNotification> findByCustomerUserIdOrderByCreatedAtDesc(String customerUserId);
    long countByCustomerUserIdAndIsReadFalse(String customerUserId);
}
