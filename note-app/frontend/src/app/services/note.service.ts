//note.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private apiUrl = 'http://localhost:8080/notes';

  constructor(private http: HttpClient) {}

  getNoteById(id: number): Observable<Note> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Note>(url);
  }

  getNotes(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createNote(note: any): Observable<any> {
    return this.http.post(this.apiUrl, note);
  }

  updateNote(id: number, note: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, note);
  }

  deleteNote(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getNotesByCategory(categoryId: number): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.apiUrl}/byCategory/${categoryId}`);
  }

  archiveNote(id: number, archived: boolean): Observable<Note> {
    const url = `${this.apiUrl}/${id}/${archived}`;
    return this.http.patch<Note>(url,archived);
  }

  
}
