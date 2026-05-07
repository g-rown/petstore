package com.petstore.service;

import com.petstore.dto.response.OrderItemResponse;
import com.petstore.dto.response.OrderResponse;
import com.petstore.exception.PetUnavailableException;
import com.petstore.exception.ResourceNotFoundException;
import com.petstore.model.*;
import com.petstore.model.enums.OrderStatus;
import com.petstore.model.enums.PetStatus;
import com.petstore.repository.*;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final CartItemRepository cartItemRepository;
    private final PetRepository petRepository;
    private final UserRepository userRepository;

    public OrderService(OrderRepository orderRepository, CartItemRepository cartItemRepository,
            PetRepository petRepository, UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.cartItemRepository = cartItemRepository;
        this.petRepository = petRepository;
        this.userRepository = userRepository;
    }

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    @Transactional
    public OrderResponse checkout() {
        User user = getCurrentUser();
        List<CartItem> cartItems = cartItemRepository.findByUser(user);

        if (cartItems.isEmpty()) {
            throw new IllegalStateException("Cart is empty. Add items before checking out.");
        }

        Order order = new Order();
        order.setUser(user);
        order.setStatus(OrderStatus.CONFIRMED);

        BigDecimal totalAmount = BigDecimal.ZERO;

        for (CartItem cartItem : cartItems) {
            Pet pet = cartItem.getPet();

            // Verify pet is still available
            if (pet.getStatus() != PetStatus.AVAILABLE) {
                throw new PetUnavailableException(
                        "Pet '" + pet.getName() + "' is no longer available. Please remove it from your cart.");
            }

            // Mark pet as SOLD (optimistic locking via @Version)
            try {
                pet.setStatus(PetStatus.SOLD);
                petRepository.save(pet);
            } catch (ObjectOptimisticLockingFailureException e) {
                throw new PetUnavailableException(
                        "Pet '" + pet.getName()
                                + "' was just purchased by another customer. Please remove it from your cart.");
            }

            // Create order item with snapshotted price
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setPet(pet);
            orderItem.setPriceAtPurchase(pet.getPrice());

            order.getItems().add(orderItem);
            totalAmount = totalAmount.add(pet.getPrice());
        }

        order.setTotalAmount(totalAmount);
        Order savedOrder = orderRepository.save(order);

        // Clear cart after successful checkout
        cartItemRepository.deleteByUser(user);

        return mapToResponse(savedOrder);
    }

    public List<OrderResponse> getOrderHistory() {
        User user = getCurrentUser();
        return orderRepository.findByUserOrderByOrderDateDesc(user).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public OrderResponse getOrderById(Long orderId) {
        User user = getCurrentUser();
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order", orderId));

        if (!order.getUser().getId().equals(user.getId())) {
            throw new ResourceNotFoundException("Order", orderId);
        }

        return mapToResponse(order);
    }

    private OrderResponse mapToResponse(Order order) {
        List<OrderItemResponse> items = order.getItems().stream()
                .map(item -> new OrderItemResponse(
                        item.getId(),
                        item.getPet().getId(),
                        item.getPet().getName(),
                        item.getPet().getImageUrl(),
                        item.getPriceAtPurchase()))
                .collect(Collectors.toList());

        return new OrderResponse(
                order.getId(),
                order.getTotalAmount(),
                order.getStatus().name(),
                order.getOrderDate(),
                items);
    }
}
