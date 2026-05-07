package com.petstore.service;

import com.petstore.dto.request.CartRequest;
import com.petstore.dto.response.CartItemResponse;
import com.petstore.exception.DuplicateCartItemException;
import com.petstore.exception.PetUnavailableException;
import com.petstore.exception.ResourceNotFoundException;
import com.petstore.model.CartItem;
import com.petstore.model.Pet;
import com.petstore.model.User;
import com.petstore.model.enums.PetStatus;
import com.petstore.repository.CartItemRepository;
import com.petstore.repository.PetRepository;
import com.petstore.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartService {

    private final CartItemRepository cartItemRepository;
    private final PetRepository petRepository;
    private final UserRepository userRepository;

    public CartService(CartItemRepository cartItemRepository, PetRepository petRepository, UserRepository userRepository) {
        this.cartItemRepository = cartItemRepository;
        this.petRepository = petRepository;
        this.userRepository = userRepository;
    }

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    public List<CartItemResponse> getCart() {
        User user = getCurrentUser();
        return cartItemRepository.findByUser(user).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public List<CartItemResponse> addToCart(CartRequest request) {
        User user = getCurrentUser();
        Pet pet = petRepository.findById(request.getPetId())
                .orElseThrow(() -> new ResourceNotFoundException("Pet", request.getPetId()));

        if (pet.getStatus() != PetStatus.AVAILABLE) {
            throw new PetUnavailableException("This pet is no longer available.");
        }

        if (cartItemRepository.findByUserAndPet(user, pet).isPresent()) {
            throw new DuplicateCartItemException("This pet is already in your cart.");
        }

        CartItem item = new CartItem();
        item.setUser(user);
        item.setPet(pet);
        cartItemRepository.save(item);

        return getCart();
    }

    @Transactional
    public void removeFromCart(Long cartItemId) {
        User user = getCurrentUser();
        CartItem item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new ResourceNotFoundException("CartItem", cartItemId));

        if (!item.getUser().getId().equals(user.getId())) {
            throw new ResourceNotFoundException("CartItem", cartItemId); // Return 404 instead of 403 to not leak existance
        }

        cartItemRepository.delete(item);
    }

    @Transactional
    public void clearCart() {
        User user = getCurrentUser();
        cartItemRepository.deleteByUser(user);
    }

    private CartItemResponse mapToResponse(CartItem item) {
        Pet pet = item.getPet();
        return new CartItemResponse(
                item.getId(),
                pet.getId(),
                pet.getName(),
                pet.getImageUrl(),
                pet.getPrice(),
                pet.getStatus().name(),
                item.getCreatedAt()
        );
    }
}
