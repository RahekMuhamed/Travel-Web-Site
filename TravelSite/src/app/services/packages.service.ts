import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Package } from '../models/packages';

@Injectable({
  providedIn: 'root',
})
export class PackagesService {
  private baseUrl: string = 'https://localhost:7062/api/Packages/';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Package[]> {
    return this.http.get<any>(this.baseUrl).pipe(
      map(response => response.data)
    );
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
  update(pack: Package): Observable<Package> {
    return this.http.put<Package>(`${this.baseUrl}${pack.id}`, pack);
  }
  deletePackage(packageId: number): Observable<void> {
    const url = `${this.baseUrl}${packageId}`;
    return this.http.delete<void>(url);
  }
}
