package com.petstore.service;

import com.petstore.dto.request.PetRequest;
import com.petstore.dto.response.CategoryResponse;
import com.petstore.dto.response.PetResponse;
import com.petstore.exception.ResourceNotFoundException;
import com.petstore.model.Category;
import com.petstore.model.Pet;
import com.petstore.model.enums.PetStatus;
import com.petstore.repository.CategoryRepository;
import com.petstore.repository.PetRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminPetService {

    private final PetRepository petRepository;
    private final CategoryRepository categoryRepository;

    public AdminPetService(PetRepository petRepository, CategoryRepository categoryRepository) {
        this.petRepository = petRepository;
        this.categoryRepository = categoryRepository;
    }

    public Page<PetResponse> findAllPets(Pageable pageable) {
        return petRepository.findAll(pageable).map(this::mapToResponse);
    }

    @Transactional
    public PetResponse createPet(PetRequest request) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category", request.getCategoryId()));

        Pet pet = new Pet();
        pet.setName(request.getName());
        pet.setBreed(request.getBreed());
        pet.setAgeMonths(request.getAgeMonths());
        pet.setPrice(request.getPrice());
        pet.setDescription(request.getDescription());
        pet.setImageUrl(request.getImageUrl());
        pet.setCategory(category);
        pet.setStatus(PetStatus.AVAILABLE);

        return mapToResponse(petRepository.save(pet));
    }

    @Transactional
    public PetResponse updatePet(Long id, PetRequest request) {
        Pet pet = petRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pet", id));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category", request.getCategoryId()));

        pet.setName(request.getName());
        pet.setBreed(request.getBreed());
        pet.setAgeMonths(request.getAgeMonths());
        pet.setPrice(request.getPrice());
        pet.setDescription(request.getDescription());
        pet.setImageUrl(request.getImageUrl());
        pet.setCategory(category);

        if (request.getStatus() != null) {
            pet.setStatus(PetStatus.valueOf(request.getStatus()));
        }

        return mapToResponse(petRepository.save(pet));
    }

    @Transactional
    public void deletePet(Long id) {
        Pet pet = petRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pet", id));
        petRepository.delete(pet);
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
