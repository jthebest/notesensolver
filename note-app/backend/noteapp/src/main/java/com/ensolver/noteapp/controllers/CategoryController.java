package com.ensolver.noteapp.controllers;


import com.ensolver.noteapp.models.Category;
import com.ensolver.noteapp.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
@CrossOrigin(origins = "http://localhost:4200")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = categoryService.getAllCategories();
        return ResponseEntity.ok().body(categories);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable(value = "id") Long categoryId) {
        Category category = categoryService.getCategoryById(categoryId);
        if (category == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(category);
    }

    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody Category category) {
        Category createdCategory = categoryService.createCategory(category);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCategory);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable(value = "id") Long categoryId,
                                                    @RequestBody Category categoryDetails) {
        Category updatedCategory = categoryService.updateCategory(categoryId, categoryDetails);
        if (updatedCategory == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(updatedCategory);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable(value = "id") Long categoryId) {
        categoryService.deleteCategory(categoryId);
        return ResponseEntity.noContent().build();
    }

    // Additional endpoint to find categories by name
    @GetMapping("/search")
    public ResponseEntity<List<Category>> findCategoriesByName(@RequestParam String name) {
        List<Category> categories = categoryService.findCategoriesByName(name);
        return ResponseEntity.ok().body(categories);
    }

    // Additional endpoint to find categories by name containing keyword
    @GetMapping("/search/keyword")
    public ResponseEntity<List<Category>> findCategoriesByNameContaining(@RequestParam String keyword) {
        List<Category> categories = categoryService.findCategoriesByNameContaining(keyword);
        return ResponseEntity.ok().body(categories);
    }
}
