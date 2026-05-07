package com.petstore.controller;

import com.petstore.dto.request.PetRequest;
import com.petstore.dto.response.ApiResponse;
import com.petstore.dto.response.PetResponse;
import com.petstore.service.AdminPetService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/admin/pets")
@PreAuthorize("hasRole('ADMIN')")
public class AdminPetController {

    private final AdminPetService adminPetService;

    public AdminPetController(AdminPetService adminPetService) {
        this.adminPetService = adminPetService;
    }

    @GetMapping
    public ApiResponse<Page<PetResponse>> getAllPets(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ApiResponse.success(adminPetService.findAllPets(
                PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"))));
    }

    @PostMapping
    public ApiResponse<PetResponse> createPet(@Valid @RequestBody PetRequest request) {
        return ApiResponse.success(adminPetService.createPet(request), "Pet created successfully");
    }

    @PutMapping("/{id}")
    public ApiResponse<PetResponse> updatePet(@PathVariable Long id, @Valid @RequestBody PetRequest request) {
        return ApiResponse.success(adminPetService.updatePet(id, request), "Pet updated successfully");
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deletePet(@PathVariable Long id) {
        adminPetService.deletePet(id);
        return ApiResponse.success(null, "Pet deleted successfully");
    }
}
