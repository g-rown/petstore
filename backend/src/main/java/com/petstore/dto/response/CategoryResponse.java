package com.petstore.dto.response;

public record CategoryResponse(
        Long id,
        String name,
        String displayName,
        String description,
        String imageUrl
) {}
