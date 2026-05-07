package com.petstore.repository;

import com.petstore.model.Pet;
import com.petstore.model.enums.PetStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PetRepository extends JpaRepository<Pet, Long> {
    Page<Pet> findByStatus(PetStatus status, Pageable pageable);
    Page<Pet> findByCategoryNameAndStatus(String categoryName, PetStatus status, Pageable pageable);
}
