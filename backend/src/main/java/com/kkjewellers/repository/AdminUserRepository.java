package com.kkjewellers.repository;

import com.kkjewellers.entity.AdminUser;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface AdminUserRepository extends MongoRepository<AdminUser, String> {
    Optional<AdminUser> findByUsername(String username);
    Boolean existsByUsername(String username);
}
