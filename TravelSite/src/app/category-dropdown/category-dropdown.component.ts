import { Component, EventEmitter, NgModule, Output } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-dropdown',
  standalone: true,
  imports: [  CommonModule, FormsModule],
  providers: [CategoryService],
  templateUrl: './category-dropdown.component.html',
  styleUrl: './category-dropdown.component.css',
})
export class CategoryDropdownComponent {
  categories: any[] = [];
  @Output() categorySelected = new EventEmitter<string>();

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  onCategoryChange(categoryId: string): void {
    this.categorySelected.emit(categoryId);
  }
}
