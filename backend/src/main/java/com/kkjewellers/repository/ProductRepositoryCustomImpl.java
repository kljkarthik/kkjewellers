package com.kkjewellers.repository;

import com.kkjewellers.entity.Product;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ProductRepositoryCustomImpl implements ProductRepositoryCustom {

    private final MongoTemplate mongoTemplate;

    public ProductRepositoryCustomImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public List<Product> filterProducts(
            String search,
            String categorySlug,
            String collectionSlug,
            String material,
            String gender,
            String occasion
    ) {
        Query q = new Query();
        q.addCriteria(Criteria.where("active").is(true));

        if (search != null && !search.trim().isEmpty()) {
            String regex = ".*" + search.trim() + ".*";
            Criteria searchCriteria = new Criteria().orOperator(
                    Criteria.where("name").regex(regex, "i"),
                    Criteria.where("productCode").regex(regex, "i"),
                    Criteria.where("shortDescription").regex(regex, "i")
            );
            q.addCriteria(searchCriteria);
        }

        if (categorySlug != null && !categorySlug.trim().isEmpty()) {
            q.addCriteria(Criteria.where("category.slug").is(categorySlug.trim()));
        }

        if (collectionSlug != null && !collectionSlug.trim().isEmpty()) {
            q.addCriteria(Criteria.where("collection.slug").is(collectionSlug.trim()));
        }

        if (material != null && !material.trim().isEmpty()) {
            q.addCriteria(Criteria.where("material").regex("^" + material.trim() + "$", "i"));
        }

        if (gender != null && !gender.trim().isEmpty()) {
            q.addCriteria(Criteria.where("gender").regex("^" + gender.trim() + "$", "i"));
        }

        if (occasion != null && !occasion.trim().isEmpty()) {
            q.addCriteria(Criteria.where("occasion").regex("^" + occasion.trim() + "$", "i"));
        }

        q.with(Sort.by(Sort.Direction.DESC, "createdAt"));
        return mongoTemplate.find(q, Product.class);
    }
}
