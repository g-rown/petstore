package com.petstore.repository;

import com.petstore.model.CartItem;
import com.petstore.model.Pet;
import com.petstore.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByUser(User user);
    Optional<CartItem> findByUserAndPet(User user, Pet pet);
    void deleteByUser(User user);
}
