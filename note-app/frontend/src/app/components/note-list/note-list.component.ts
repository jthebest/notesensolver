// note-list.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Note } from '../../models/note.model';
import { NoteService } from '../../services/note.service';
import { CommonModule, NgFor } from '@angular/common';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css'],
  standalone: true,
  imports: [  CommonModule ]
})
export class NoteListComponent implements OnInit {
  
  nots:  Note | undefined;
  notes: Note[] = [];
  categories: Category[] = [];

  constructor(private router: Router, private noteService: NoteService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes() {
    this.noteService.getNotes().subscribe((notes: Note[]) => {
      this.notes = notes;
    });
  }

  deleteNote(id: number): void {
    this.noteService.deleteNote(id).subscribe(() => {
      // Remove the deleted note from the local array
      this.notes = this.notes.filter(note => note.id !== id);
    });
  }

  archiveNote(id: number): void {
    // Find the note with the given id
    const noteToUpdate = this.notes.find(note => note.id === id);
  
    if (noteToUpdate) {
      // Toggle the archived status
      noteToUpdate.archived = !noteToUpdate.archived;
  
      // Call the updateNote method with the updated note
      this.noteService.updateNote(id, noteToUpdate)
        .subscribe(() => {
          this.router.navigate(['/notes']);
        });
    }
  }
  

  unarchiveNote(id: number): void {
    this.noteService.archiveNote(id, false).subscribe(() => {
      // Update the archived status of the note in the local array
      this.notes = this.notes.filter(note => note.id !== id);
    });
  }

  private updateNoteStatus(id: number, archived: boolean): void {
    this.notes = this.notes.map((note: Note) => { // Specify the type of 'note' parameter as 'Note'
      if (note.id === id) {
        return { ...note, archived };
      }
      return note;
    });
  }

  goToEditNotePage(noteId: number) {
    this.router.navigate(['/edit-note', noteId]); // Assuming 'edit-note/:id' is the route for editing a note
  }

   filterNotesByCategory(categoryName: string) {
    const categoryId = this.categories.find(category => category.name === categoryName)?.id;
    if (categoryId) {
      // Filter notes by category ID
      this.noteService.getNotesByCategory(categoryId).subscribe((notes: Note[]) => {
        this.notes = notes;
      });
    } else {
      // If category not found, load all notes
      this.loadNotes();
    }
  }


  
}