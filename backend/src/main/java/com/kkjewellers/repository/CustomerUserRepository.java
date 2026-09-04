package com.kkjewellers.repository;

import com.kkjewellers.entity.CustomerUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface CustomerUserRepository extends MongoRepository<CustomerUser, String> {
    Optional<CustomerUser> findByEmail(String email);
    Optional<CustomerUser> findByMobile(String mobile);

    @Query("{ '$or': [ { 'email': ?0 }, { 'mobile': ?1 } ] }")
    Optional<CustomerUser> findByEmailOrMobile(String email, String mobile);

    Boolean existsByEmail(String email);
    Boolean existsByMobile(String mobile);
}
