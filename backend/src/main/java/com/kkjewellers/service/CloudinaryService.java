package com.kkjewellers.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
public class CloudinaryService {

    private static final Logger logger = LoggerFactory.getLogger(CloudinaryService.class);
    private final Cloudinary cloudinary;

    public CloudinaryService(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    /**
     * Upload binary image byte array or Base64 data string to Cloudinary.
     */
    @SuppressWarnings("unchecked")
    public Map<String, String> uploadImage(Object imageFile, String folderName) {
        Map<String, String> result = new HashMap<>();
        try {
            Map<?, ?> uploadResult = cloudinary.uploader().upload(
                    imageFile,
                    ObjectUtils.asMap(
                            "folder", folderName,
                            "overwrite", true,
                            "resource_type", "auto"
                    )
            );

            String secureUrl = (String) uploadResult.get("secure_url");
            String publicId = (String) uploadResult.get("public_id");

            result.put("imageUrl", secureUrl);
            result.put("publicId", publicId);
            logger.info("Successfully uploaded image to Cloudinary folder '{}': {}", folderName, secureUrl);
        } catch (IOException e) {
            logger.error("Cloudinary upload failed for folder '{}': {}", folderName, e.getMessage());
            result.put("imageUrl", imageFile instanceof String ? (String) imageFile : "");
            result.put("publicId", "");
        }
        return result;
    }

    /**
     * Upload remote URL directly to Cloudinary if accessible.
     */
    @SuppressWarnings("unchecked")
    public Map<String, String> uploadRemoteUrl(String remoteUrl, String folderName) {
        Map<String, String> result = new HashMap<>();
        if (remoteUrl == null || remoteUrl.isEmpty() || remoteUrl.contains("cloudinary.com")) {
            result.put("imageUrl", remoteUrl);
            result.put("publicId", "");
            return result;
        }

        try {
            Map<?, ?> uploadResult = cloudinary.uploader().upload(
                    remoteUrl,
                    ObjectUtils.asMap(
                            "folder", folderName,
                            "resource_type", "image"
                    )
            );

            String secureUrl = (String) uploadResult.get("secure_url");
            String publicId = (String) uploadResult.get("public_id");

            result.put("imageUrl", secureUrl);
            result.put("publicId", publicId);
            logger.info("Successfully migrated remote URL to Cloudinary: {}", secureUrl);
        } catch (Exception e) {
            logger.warn("Could not migrate remote image URL '{}' to Cloudinary (using fallback): {}", remoteUrl, e.getMessage());
            result.put("imageUrl", remoteUrl);
            result.put("publicId", "");
        }
        return result;
    }
}
