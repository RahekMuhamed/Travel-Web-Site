import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

import { Package } from '../models/packages';

@Injectable({
  providedIn: 'root',
})
export class PackagesService {
  private baseUrl: string = 'https://localhost:7062/api/Packages/';

  constructor(private http: HttpClient) {}

  getAll(page?: number, pageSize?: number): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}?pageNumber=${page}&pageSize=${pageSize}`)
      .pipe(
        map((response) => response),
        catchError(this.handleError)
      );
  }
 

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
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
