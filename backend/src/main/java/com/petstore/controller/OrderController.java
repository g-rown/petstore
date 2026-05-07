package com.petstore.controller;

import com.petstore.dto.response.ApiResponse;
import com.petstore.dto.response.OrderResponse;
import com.petstore.service.OrderService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/checkout")
    public ApiResponse<OrderResponse> checkout() {
        return ApiResponse.success(orderService.checkout(), "Order placed successfully!");
    }

    @GetMapping
    public ApiResponse<List<OrderResponse>> getOrderHistory() {
        return ApiResponse.success(orderService.getOrderHistory());
    }

    @GetMapping("/{id}")
    public ApiResponse<OrderResponse> getOrderById(@PathVariable Long id) {
        return ApiResponse.success(orderService.getOrderById(id));
    }
}
