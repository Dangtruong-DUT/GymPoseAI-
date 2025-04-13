package com.pbl5.gympose.service.implement;

import com.pbl5.gympose.entity.Category;
import com.pbl5.gympose.exception.NotFoundException;
import com.pbl5.gympose.exception.message.ErrorMessage;
import com.pbl5.gympose.mapper.CategoryMapper;
import com.pbl5.gympose.payload.request.CategoryCreationRequest;
import com.pbl5.gympose.payload.request.CategoryUpdatingRequest;
import com.pbl5.gympose.payload.response.CategoryResponse;
import com.pbl5.gympose.repository.CategoryRepository;
import com.pbl5.gympose.service.CategoryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CategoryServiceImpl implements CategoryService {
    CategoryRepository categoryRepository;
    CategoryMapper categoryMapper;

    @PreAuthorize("hasRole('ADMIN')")
    @Override
    public CategoryResponse createCategory(CategoryCreationRequest categoryCreationRequest) {
        return categoryMapper
                .toCategoryResponse(categoryRepository.save(Category.builder()
                        .name(categoryCreationRequest.getName()).build()));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Override
    public CategoryResponse updateCategory(UUID categoryId, CategoryUpdatingRequest categoryUpdatingRequest) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.CATEGORY_NOT_FOUND));
        categoryMapper.updateCategory(categoryUpdatingRequest, category);
        return categoryMapper.toCategoryResponse(categoryRepository.save(category));
    }

    @Override
    public CategoryResponse getCategoryById(UUID categoryId) {
        return categoryMapper.toCategoryResponse(categoryRepository.findById(categoryId)
                .orElseThrow(() -> new NotFoundException(ErrorMessage.CATEGORY_NOT_FOUND)));
    }

    @Override
    public List<CategoryResponse> getAllCategories() {
        return categoryMapper.toCategoryResponses(categoryRepository.findAll());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Override
    public void deleteCategoryById(UUID categoryId) {
        categoryRepository.deleteById(categoryId);
    }
}
