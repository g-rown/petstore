package com.petstore.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CartRequest {
    @NotNull(message = "Pet ID is required")
    private Long petId;
}
