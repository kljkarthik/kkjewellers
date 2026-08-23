package com.kkjewellers.repository;

import com.kkjewellers.entity.CustomerUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerUserRepository extends JpaRepository<CustomerUser, Long> {
    Optional<CustomerUser> findByEmail(String email);
    Optional<CustomerUser> findByMobile(String mobile);
    Optional<CustomerUser> findByEmailOrMobile(String email, String mobile);
    boolean existsByEmail(String email);
    boolean existsByMobile(String mobile);
}
