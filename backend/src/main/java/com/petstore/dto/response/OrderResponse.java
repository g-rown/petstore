package com.petstore.dto.response;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

public record OrderResponse(
        Long id,
        BigDecimal totalAmount,
        String status,
        Instant orderDate,
        List<OrderItemResponse> items
) {}
