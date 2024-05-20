import { Component } from '@angular/core';

interface Note {
  title: string;
  content: string;
  categories: string[];
}

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {
  newNote: Note = {
    title: '',
    content: '',
    categories: []
  };

  activeNotes: Note[] = [
    {
      title: 'My first note',
      content: 'Lorem Ipsum...',
      categories: ['Personal']
    },
    {
      title: 'My second note',
      content: 'Lorem Ipsum...',
      categories: ['Work']
    },
    {
      title: 'My third note',
      content: 'Lorem Ipsum...',
      categories: ['Personal', 'Work']
    }
  ];

  archivedNotes: Note[] = [
    {
      title: 'My fourth note',
      content: 'Lorem Ipsum...',
      categories: ['Personal', 'Work']
    }
  ];

  categories: string[] = ['Personal', 'Work', 'Reminder', 'Ideas'];

  selectedCategory: string = '';

  editedNote: Note | null = null;

  deletedNote: Note | null = null;

  archiveNote: Note | null = null;

  addNote() {
    this.activeNotes.push({
      title: this.newNote.title,
      content: this.newNote.content,
      categories: this.newNote.categories
    });
    this.newNote = {
      title: '',
      content: '',
      categories: []
    };
  }

  editNoteModal(note: Note) {
    this.editedNote = note;
    this.editNoteTitle = note.title;
    this.editNoteContent = note.content;
    this.editNoteCategories = [...note.categories];
  }

  editNote() {
    if (this.editedNote) {
      this.editedNote.title = this.editNoteTitle;
      this.editedNote.content = this.editNoteContent;
      this.editedNote.categories = [...this.editNoteCategories];
      this.editedNote = null;
    }
  }

  archiveNoteModal(note: Note) {
    this.archiveNote = note;
  }

  archiveNote() {
    if (this.archiveNote) {
      this.archivedNotes.push(this.archiveNote);
      const activeIndex = this.activeNotes.findIndex(note => note === this.archiveNote);
      this.activeNotes.splice(activeIndex, 1);
      this.archiveNote = null;
    }
  }

  deleteNoteModal(note: Note) {
    this.deletedNote = note;
  }

  deleteNote() {
    if (this.deletedNote) {
      const activeIndex = this.activeNotes.findIndex(note => note === this.deletedNote);
      if (activeIndex !== -1) {
        this.activeNotes.splice(activeIndex, 1);
      }
      const archivedIndex = this.archivedNotes.findIndex(note => note === this.deletedNote);
      if (archivedIndex !== -1) {
        this.archivedNotes.splice(archivedIndex, 1);
      }
      this.deletedNote = null;
    }
  }

  get filteredActiveNotes() {
    if (this.selectedCategory === '') {
      return this.activeNotes;
    }
    return this.activeNotes.filter(note => note.categories.includes(this.selectedCategory));
  }

  get filteredArchivedNotes() {
    if (this.selectedCategory === '') {
      return this.archivedNotes;
    }
    return this.archivedNotes.filter(note => note.categories.includes(this.selectedCategory));
  }

  private editNoteTitle: string = '';

  private editNoteContent: string = '';

  private editNoteCategories: string[] = [];

}