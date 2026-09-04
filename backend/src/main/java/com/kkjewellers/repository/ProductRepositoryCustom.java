package com.kkjewellers.repository;

import com.kkjewellers.entity.Product;
import java.util.List;

public interface ProductRepositoryCustom {
    List<Product> filterProducts(
            String query,
            String categorySlug,
            String collectionSlug,
            String material,
            String gender,
            String occasion
    );
}
