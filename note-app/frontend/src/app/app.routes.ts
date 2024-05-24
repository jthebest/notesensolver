//
import { Routes } from '@angular/router';
import { CompotestComponent } from './compotest/compotest.component';
import { NoteListComponent } from './components/note-list/note-list.component';
import { NoteDetailComponent } from './components/note-detail/note-detail.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { AppComponent } from './app.component';
import { FilterComponent } from './components/filter/filter.component';

export const routes: Routes = [

    { path: '**', redirectTo: '*', pathMatch: 'full' }, // Redirect to notes component by default
    { path: 'notes', component: NoteListComponent },
    { path: 'notes/new', component: NoteDetailComponent }, // Route for adding new note
    { path: 'notes/:id', component: NoteListComponent }, // Route for editing existing note
    { path: 'categories', component: CategoryListComponent },
    { path: 'categories/new', component: CategoryDetailComponent }, // Route for adding new category
    { path: 'categories/:id', component: CategoryDetailComponent }, // Route for editing existing category
    { path: 'filter', component: FilterComponent }, // Route for editing existing category
  
];


