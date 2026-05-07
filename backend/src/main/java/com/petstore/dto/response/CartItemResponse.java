package com.petstore.dto.response;

import java.math.BigDecimal;
import java.time.Instant;

public record CartItemResponse(
        Long id,
        Long petId,
        String petName,
        String petImageUrl,
        BigDecimal price,
        String status,
        Instant addedAt
) {}
