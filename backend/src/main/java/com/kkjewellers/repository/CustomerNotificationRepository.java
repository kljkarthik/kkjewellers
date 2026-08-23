package com.kkjewellers.repository;

import com.kkjewellers.entity.CustomerNotification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomerNotificationRepository extends JpaRepository<CustomerNotification, Long> {
    List<CustomerNotification> findByCustomerUserIdOrderByCreatedAtDesc(Long customerUserId);
    long countByCustomerUserIdAndIsReadFalse(Long customerUserId);
}
