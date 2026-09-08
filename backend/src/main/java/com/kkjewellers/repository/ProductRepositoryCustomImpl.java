package com.kkjewellers.repository;

import com.kkjewellers.entity.Category;
import com.kkjewellers.entity.CollectionEntity;
import com.kkjewellers.entity.Product;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Repository
public class ProductRepositoryCustomImpl implements ProductRepositoryCustom {

    private final MongoTemplate mongoTemplate;
    private final CategoryRepository categoryRepository;
    private final CollectionRepository collectionRepository;

    public ProductRepositoryCustomImpl(
            MongoTemplate mongoTemplate,
            CategoryRepository categoryRepository,
            CollectionRepository collectionRepository
    ) {
        this.mongoTemplate = mongoTemplate;
        this.categoryRepository = categoryRepository;
        this.collectionRepository = collectionRepository;
    }

    private Object toMongoId(String idStr) {
        if (idStr != null && ObjectId.isValid(idStr)) {
            return new ObjectId(idStr);
        }
        return idStr;
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
            String val = categorySlug.trim();
            Optional<Category> cat = categoryRepository.findBySlug(val);
            if (!cat.isPresent()) {
                cat = categoryRepository.findById(val);
            }
            if (cat.isPresent()) {
                q.addCriteria(Criteria.where("category.$id").is(toMongoId(cat.get().getId())));
            } else {
                return Collections.emptyList();
            }
        }

        if (collectionSlug != null && !collectionSlug.trim().isEmpty()) {
            String val = collectionSlug.trim();
            Optional<CollectionEntity> col = collectionRepository.findBySlug(val);
            if (!col.isPresent()) {
                col = collectionRepository.findById(val);
            }
            if (col.isPresent()) {
                q.addCriteria(Criteria.where("collection.$id").is(toMongoId(col.get().getId())));
            } else {
                return Collections.emptyList();
            }
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
