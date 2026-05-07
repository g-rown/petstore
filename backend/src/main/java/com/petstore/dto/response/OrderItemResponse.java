package com.petstore.dto.response;

import java.math.BigDecimal;

public record OrderItemResponse(
        Long id,
        Long petId,
        String petName,
        String petImageUrl,
        BigDecimal priceAtPurchase
) {}
