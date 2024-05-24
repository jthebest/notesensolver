import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Note } from '../../models/note.model';
import { Category } from '../../models/category.model';
import { NoteService } from '../../services/note.service';
import { CategoryService } from '../../services/category.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css'],
  standalone: true,
  imports: [  FormsModule, CommonModule ]
})
export class NoteDetailComponent implements OnInit {

note: Note = { title: '', content: '', archived: false, category: null };

categories: Category[] = [];
isNewNote = true;

constructor(
  private noteService: NoteService,
  private categoryService: CategoryService,
  private route: ActivatedRoute,
  private router: Router
) {}

  ngOnInit(): void {
    this.loadCategories();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isNewNote = false;
      this.loadNote(parseInt(id, 10));
    }
  }

  loadCategories(): void {
    this.categoryService['getCategories']().subscribe((categories: Category[]) => { // Use ['getAllCategories'] to access method
      this.categories = categories;
    });
  }

  loadNote(id: number): void {
    this.noteService.getNoteById(id).subscribe((note: Note) => { // Ensure to use the correct type for the parameter
      this.note = note;
    });
  }


  updateCategory(categoryId: number | null): void {
    if (categoryId !== null) {
      if (!this.note.category) {
        this.note.category = { id: categoryId, name: '' };
      } else {
        this.note.category.id = categoryId;
      }
    } else {
      this.note.category = null;
    }
  }

  saveNote(): void {
    if (this.isNewNote) {
      this.noteService.createNote(this.note).subscribe(() => {
        this.router.navigate(['/notes']);
      });
    } else {
      if (this.note.id != null) { // Check if id is not null or undefined
        this.noteService.updateNote(this.note.id, this.note).subscribe(() => {
          this.router.navigate(['/notes']);
        });
      } else {
        console.error('Note id is null or undefined.'); // Handle the case when id is null or undefined
      }
    }
  }
  
  deleteNote(): void {
    const id = this.note.id;
    if (id != null) { // Check if id is not null or undefined
      if (confirm('Are you sure you want to delete this note?')) {
        this.noteService.deleteNote(id).subscribe(() => {
          this.router.navigate(['/notes']);
        });
      }
    } else {
      console.error('Note id is null or undefined.'); // Handle the case when id is null or undefined
    }
  }
  cancel() {
    this.router.navigate(['/notes']);
    }



}

