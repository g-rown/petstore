package com.petstore.service;

import com.petstore.dto.response.CategoryResponse;
import com.petstore.exception.ResourceNotFoundException;
import com.petstore.model.Category;
import com.petstore.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<CategoryResponse> findAll() {
        return categoryRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public Category findByName(String name) {
        return categoryRepository.findByName(name.toUpperCase())
                .orElseThrow(() -> new ResourceNotFoundException("Category with name " + name + " not found"));
    }

    private CategoryResponse mapToResponse(Category category) {
        return new CategoryResponse(
                category.getId(),
                category.getName(),
                category.getDisplayName(),
                category.getDescription(),
                category.getImageUrl()
        );
    }
}
