package com.petstore.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class PetRequest {
    @NotBlank(message = "Name is required")
    private String name;

    private String breed;

    private Integer ageMonths;

    @NotNull(message = "Price is required")
    @Positive(message = "Price must be positive")
    private BigDecimal price;

    private String description;

    private String imageUrl;

    @NotNull(message = "Category ID is required")
    private Long categoryId;

    private String status;
}
