package com.kkjewellers.repository;

import com.kkjewellers.entity.ProductImage;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductImageRepository extends MongoRepository<ProductImage, String> {
}
