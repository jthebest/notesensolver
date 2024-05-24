import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { Note } from '../../models/note.model';
import { NoteService } from '../../services/note.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class FilterComponent implements OnInit {
  categories: Category[] = [];
  selectedCategory: Category | null = null;
  filteredNotes: Note[] = []; // Array to hold filtered notes

  @Output() filterChanged = new EventEmitter<Note[]>(); // Emit filtered notes array

  constructor(private categoryService: CategoryService, private noteService: NoteService) { }

  ngOnInit(): void {
    this.getCategories();
    this.getAllNotes();

  }

  getCategories(): void {
    this.categoryService.getCategories()
      .subscribe(categories => this.categories = categories);
  }

  getAllNotes(): void {
    this.noteService.getNotes()
      .subscribe(notes => {
        this.filteredNotes = notes;
        this.filterChanged.emit(this.filteredNotes);
      });
  }

  filterNotesByCategory(): void {
    // Check if selectedCategory is not null before accessing its id property
    const categoryId = this.selectedCategory?.id;

    if (categoryId) {
      this.noteService.getNotesByCategory(categoryId)
        .subscribe(filteredNotes => {
          this.filteredNotes = filteredNotes;
          this.filterChanged.emit(this.filteredNotes); // Emit filtered notes array
        });
    } else {
      this.getAllNotes(); // If selectedCategory is null, show all notes
    }
  }
}
