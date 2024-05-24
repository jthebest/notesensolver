package com.ensolver.noteapp.services;


import com.ensolver.noteapp.models.Category;
import com.ensolver.noteapp.models.Note;
import com.ensolver.noteapp.repositories.CategoryRepository;
import com.ensolver.noteapp.repositories.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.NoSuchElementException;
@Service
public class NoteService {

    @Autowired
    private NoteRepository noteRepository;
    private final CategoryRepository categoryRepository = null;

    public List<Note> getAllNotes() {
        return noteRepository.findAll();
    }

    public Note getNoteById(Long noteId) {
        return noteRepository.findById(noteId).orElse(null);
    }

    public Note createNote(Note note) {
/*         // If the note has a category ID
         if (note.getCategory().getId() != null) {
            // Fetch the corresponding Category entity based on categoryId
            Category category = categoryRepository.findById(note.getCategory().getId())
                                                  .orElseThrow(() -> new NoSuchElementException("Category not found with id: " + note.getCategory().getId()));
            // Set the fetched category to the note
            note.setCategory(category);

        }
         */
        return noteRepository.save(note);
    }

    public Note updateNote(Long noteId, Note noteDetails) {
        Note note = noteRepository.findById(noteId).orElse(null);
        if (note == null) {
            return null;
        }
        note.setTitle(noteDetails.getTitle());
        note.setContent(noteDetails.getContent());
        note.setArchived(noteDetails.isArchived());
        return noteRepository.save(note);
    }

    public void deleteNote(Long noteId) {
        noteRepository.deleteById(noteId);
    }

    // Additional custom method to find notes by title
    public List<Note> findNotesByTitle(String title) {
        return noteRepository.findByTitle(title);
    }

    // Additional custom method to find notes by archived status
    public List<Note> findNotesByArchived(boolean archived) {
        return noteRepository.findByArchived(archived);
    }

    // Additional custom method to find notes by title containing keyword
    public List<Note> findNotesByTitleContaining(String keyword) {
        return noteRepository.findByTitleContaining(keyword);
    }


    public List<Note> getNotesByCategory(Long categoryId) {
        // Implement this method to fetch notes filtered by category ID
        return noteRepository.findByCategoryId(categoryId);
    }

    public List<Note> getNotesByCategoryName(String categoryName) {
        // Implement this method to fetch notes filtered by category name
        return noteRepository.findByCategoryName(categoryName);
    }

    public Note addCategoryToNote(Long noteId, Long categoryId) {
        // Implement this method to add a category to a note
        Note note = noteRepository.findById(noteId).orElse(null);
        if (note != null) {
            Category category = categoryRepository.findById(categoryId).orElse(null);
            if (category != null) {
                note.setCategory(category);
                return noteRepository.save(note);
            }
        }
        return null;
    }

    public Note removeCategoryFromNote(Long noteId) {
        // Implement this method to remove the category from a note
        Note note = noteRepository.findById(noteId).orElse(null);
        if (note != null) {
            note.setCategory(null);
            return noteRepository.save(note);
        }
        return null;
    }

}