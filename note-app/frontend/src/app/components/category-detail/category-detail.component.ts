import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  standalone: true,
  styleUrls: ['./category-detail.component.css'],
  imports: [  FormsModule ]
})
export class CategoryDetailComponent implements OnInit {
  currentCategory: Category = { name: '' };
  isNew = true;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    // Implement initialization logic if editing existing category
  }

  saveCategory(): void {
    if (this.isNew) {
      this.createCategory();
    } else {
      this.updateCategory();
    }
  }

  createCategory(): void {
    this.categoryService.createCategory(this.currentCategory)
      .subscribe(() => {
        // Handle success
      });
  }

  updateCategory(): void {
    // Implement update logic
  }
}
