package com.petstore.service;

import com.petstore.dto.response.CategoryResponse;
import com.petstore.dto.response.PetResponse;
import com.petstore.exception.ResourceNotFoundException;
import com.petstore.model.Pet;
import com.petstore.model.enums.PetStatus;
import com.petstore.repository.PetRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class PetService {

    private final PetRepository petRepository;

    public PetService(PetRepository petRepository) {
        this.petRepository = petRepository;
    }

    public Page<PetResponse> findAll(Pageable pageable, String category) {
        Page<Pet> pets;
        if (category != null && !category.isEmpty()) {
            pets = petRepository.findByCategoryNameAndStatus(category.toUpperCase(), PetStatus.AVAILABLE, pageable);
        } else {
            pets = petRepository.findByStatus(PetStatus.AVAILABLE, pageable);
        }
        return pets.map(this::mapToResponse);
    }

    public PetResponse findById(Long id) {
        Pet pet = petRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pet", id));
        return mapToResponse(pet);
    }

    private PetResponse mapToResponse(Pet pet) {
        CategoryResponse categoryResponse = new CategoryResponse(
                pet.getCategory().getId(),
                pet.getCategory().getName(),
                pet.getCategory().getDisplayName(),
                pet.getCategory().getDescription(),
                pet.getCategory().getImageUrl()
        );

        return new PetResponse(
                pet.getId(),
                pet.getName(),
                pet.getBreed(),
                pet.getAgeMonths(),
                pet.getPrice(),
                pet.getDescription(),
                pet.getImageUrl(),
                pet.getStatus().name(),
                categoryResponse,
                pet.getCreatedAt()
        );
    }
}
