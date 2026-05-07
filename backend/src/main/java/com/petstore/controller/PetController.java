package com.petstore.controller;

import com.petstore.dto.response.ApiResponse;
import com.petstore.dto.response.PetResponse;
import com.petstore.service.PetService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/pets")
public class PetController {

    private final PetService petService;

    public PetController(PetService petService) {
        this.petService = petService;
    }

    @GetMapping
    public ApiResponse<Page<PetResponse>> getPets(
            @RequestParam(required = false) String category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(defaultValue = "price,asc") String sort) {
        
        String[] sortParams = sort.split(",");
        String sortBy = sortParams[0];
        Sort.Direction direction = sortParams.length > 1 && sortParams[1].equalsIgnoreCase("desc") 
                ? Sort.Direction.DESC 
                : Sort.Direction.ASC;
                
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));
        
        return ApiResponse.success(petService.findAll(pageable, category));
    }

    @GetMapping("/{id}")
    public ApiResponse<PetResponse> getPetById(@PathVariable Long id) {
        return ApiResponse.success(petService.findById(id));
    }
}
