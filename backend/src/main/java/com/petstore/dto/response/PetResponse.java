package com.petstore.dto.response;

import java.math.BigDecimal;
import java.time.Instant;

public record PetResponse(
        Long id,
        String name,
        String breed,
        Integer ageMonths,
        BigDecimal price,
        String description,
        String imageUrl,
        String status,
        CategoryResponse category,
        Instant createdAt
) {}
