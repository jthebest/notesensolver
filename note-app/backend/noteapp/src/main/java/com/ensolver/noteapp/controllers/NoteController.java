package com.ensolver.noteapp.controllers;


import com.ensolver.noteapp.models.Note;
import com.ensolver.noteapp.services.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notes")
@CrossOrigin(origins = "http://localhost:4200")
public class NoteController {

    @Autowired
    private NoteService noteService;

    @GetMapping
    public ResponseEntity<List<Note>> getAllNotes() {
        List<Note> notes = noteService.getAllNotes();
        return ResponseEntity.ok().body(notes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Note> getNoteById(@PathVariable(value = "id") Long noteId) {
        Note note = noteService.getNoteById(noteId);
        if (note == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(note);
    }

    @PostMapping
    public ResponseEntity<Note> createNote(@RequestBody Note note) {
        Note createdNote = noteService.createNote(note);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdNote);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Note> updateNote(@PathVariable(value = "id") Long noteId,
                                           @RequestBody Note noteDetails) {
        Note updatedNote = noteService.updateNote(noteId, noteDetails);
        if (updatedNote == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(updatedNote);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable(value = "id") Long noteId) {
        noteService.deleteNote(noteId);
        return ResponseEntity.noContent().build();
    }

    // Additional endpoint to find notes by title
    @GetMapping("/search")
    public ResponseEntity<List<Note>> findNotesByTitle(@RequestParam String title) {
        List<Note> notes = noteService.findNotesByTitle(title);
        return ResponseEntity.ok().body(notes);
    }

    // Additional endpoint to find notes by archived status
    @GetMapping("/archived")
    public ResponseEntity<List<Note>> findNotesByArchived(@RequestParam boolean archived) {
        List<Note> notes = noteService.findNotesByArchived(archived);
        return ResponseEntity.ok().body(notes);
    }

    @SuppressWarnings("unused")
    @PatchMapping("/{id}/{archived}")
    public ResponseEntity<Note> archiveNote(@PathVariable(value = "id") Long noteId, @PathVariable(value = "archived") boolean archived) {
        Note note = noteService.getNoteById(noteId);
        note.setArchived(archived);
        if (note == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(note);
    }

    // Additional endpoint to find notes by title containing keyword
    @GetMapping("/search/keyword")
    public ResponseEntity<List<Note>> findNotesByTitleContaining(@RequestParam String keyword) {
        List<Note> notes = noteService.findNotesByTitleContaining(keyword);
        return ResponseEntity.ok().body(notes);
    }

    @GetMapping("/byCategory/{categoryId}")
    public ResponseEntity<List<Note>> getNotesByCategoryId(@PathVariable Long categoryId) {
        List<Note> notes = noteService.getNotesByCategory(categoryId);
        return new ResponseEntity<>(notes, HttpStatus.OK);
    }
}
