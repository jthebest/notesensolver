package com.ensolver.noteapp.repositories;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ensolver.noteapp.models.Category;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    // Custom query to find categories by name
    List<Category> findByName(String name);

    // Custom query to find categories by name containing keyword
    List<Category> findByNameContaining(String keyword);
}
