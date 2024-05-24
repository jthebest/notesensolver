package com.ensolver.noteapp.services;


import com.ensolver.noteapp.models.Category;
import com.ensolver.noteapp.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category getCategoryById(Long categoryId) {
        return categoryRepository.findById(categoryId).orElse(null);
    }

    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    public Category updateCategory(Long categoryId, Category categoryDetails) {
        Category category = categoryRepository.findById(categoryId).orElse(null);
        if (category == null) {
            return null;
        }
        category.setName(categoryDetails.getName());
        return categoryRepository.save(category);
    }

    public void deleteCategory(Long categoryId) {
        categoryRepository.deleteById(categoryId);
    }

    // Additional custom method to find categories by name
    public List<Category> findCategoriesByName(String name) {
        return categoryRepository.findByName(name);
    }

    // Additional custom method to find categories by name containing keyword
    public List<Category> findCategoriesByNameContaining(String keyword) {
        return categoryRepository.findByNameContaining(keyword);
    }
}
