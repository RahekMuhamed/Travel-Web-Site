import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Package } from '../models/packages';

@Injectable({
  providedIn: 'root'
})
export class PackagesService {
  //private baseUrl: string = `${environment.apiUrl}/Packages/`;
  private baseUrl: string = "https://localhost:44331/api/Packages/";

  constructor(private http: HttpClient) {}

  getAll(): Observable<Package[]> {
    return this.http.get<Package[]>(this.baseUrl);
  }

  add(pack: Package): Observable<Package> {
    return this.http.post<Package>(this.baseUrl, pack);
  }

  uploadImage(formData: FormData): Observable<string> {
    const uploadUrl = `${this.baseUrl}upload`;
    return this.http.post<string>(uploadUrl, formData);
  }
  getPackageById(id: number): Observable<Package> {
    return this.http.get<Package>(`${this.baseUrl}${id}`);
  }

}
