package com.kkjewellers.repository;

import com.kkjewellers.entity.WebsiteSettings;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface WebsiteSettingsRepository extends MongoRepository<WebsiteSettings, String> {
}
