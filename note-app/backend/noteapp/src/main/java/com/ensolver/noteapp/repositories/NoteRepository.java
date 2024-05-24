package com.ensolver.noteapp.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ensolver.noteapp.models.Note;

import java.util.List;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {

    // Custom query to find notes by title
    List<Note> findByTitle(String title);

    // Custom query to find notes by archived status
    List<Note> findByArchived(boolean archived);

    // Custom query to find notes by title and archived status
    List<Note> findByTitleAndArchived(String title, boolean archived);

    // Custom query with JPQL
    @Query("SELECT n FROM Note n WHERE n.title LIKE %?1%")
    List<Note> findByTitleContaining(String keyword);

    // Custom query with native SQL
    @Query(value = "SELECT * FROM notes WHERE content LIKE %:keyword%", nativeQuery = true)
    List<Note> findByContentContaining(String keyword);

    List<Note> findByCategoryId(Long categoryId);

    List<Note> findByCategoryName(String categoryName);
}
