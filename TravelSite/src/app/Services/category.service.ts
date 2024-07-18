import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Category } from '../models/category';
import { Services } from '../models/services';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'https://localhost:7062/api/';

  constructor(private http: HttpClient) {}

  // getCategories(): Observable<Category[]> {
  //   return this.http
  //     .get<any[]>(`${this.apiUrl}/Category`)
  //     .pipe(
  //       map((response) => response.$values.map((item) => new Category(item)))
  //     );
  // }
  getCategories(): Observable<Category[]> {
    return this.http.get<any>(`${this.apiUrl}/Category`)
     
    
  }


}