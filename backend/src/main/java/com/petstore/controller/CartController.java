package com.petstore.controller;

import com.petstore.dto.request.CartRequest;
import com.petstore.dto.response.ApiResponse;
import com.petstore.dto.response.CartItemResponse;
import com.petstore.service.CartService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping
    public ApiResponse<List<CartItemResponse>> getCart() {
        return ApiResponse.success(cartService.getCart());
    }

    @PostMapping("/items")
    public ApiResponse<List<CartItemResponse>> addToCart(@Valid @RequestBody CartRequest request) {
        return ApiResponse.success(cartService.addToCart(request));
    }

    @DeleteMapping("/items/{itemId}")
    public ApiResponse<Void> removeFromCart(@PathVariable Long itemId) {
        cartService.removeFromCart(itemId);
        return ApiResponse.success(null, "Item removed successfully");
    }

    @DeleteMapping
    public ApiResponse<Void> clearCart() {
        cartService.clearCart();
        return ApiResponse.success(null, "Cart cleared successfully");
    }
}
