import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Package } from '../models/packages';

@Injectable({
  providedIn: 'root'
})
export class PackagesService {
  private baseUrl: string = "https://localhost:44331/api/Packages/";

  constructor(private http: HttpClient) {}

  getAll(): Observable<Package[]> {
    return this.http.get<Package[]>(this.baseUrl);
  }
}
