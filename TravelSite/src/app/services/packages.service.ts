import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, finalize, map, tap, throwError } from 'rxjs';

import { Package } from '../models/packages';
import { Category } from '../models/category';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class PackagesService {
  private wishlistUrl: string = 'https://localhost:7062/api/LovePackage/';
  private lovedPackagesUrl: string =
    'https://localhost:7062/api/LovePackage/user-packages';
  private baseUrl: string = 'https://localhost:7062/api/Packages/';
  private loadingSubject = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private authService: AuthServiceService
  ) {}

  get loading$() {
    return this.loadingSubject.asObservable();
  }

  getAllpag(page?: number, pageSize?: number): Observable<any> {
    this.loadingSubject.next(true);
    return this.http
      .get<any>(`${this.baseUrl}?pageNumber=${page}&pageSize=${pageSize}`)
      .pipe(
        map((response) => response),
        catchError(this.handleError)
        // finalize(() => this.loadingSubject.next(false))
      );
  }

  getAll(): Observable<Package[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(this.baseUrl, { headers }).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getUserIdFromToken(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      return decodedToken
        ? decodedToken[
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
          ]
        : null;
    }
    return null;
  }

  private decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Failed to decode token', error);
      return null;
    }
  }

  add(packageData: Package): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<any>(this.baseUrl, packageData, { headers }).pipe(
      catchError((error) => {
        console.error('Package save failed:', error);
        throw error;
      })
    );
  }

  uploadImage(formData: FormData): Observable<string> {
    const uploadUrl = `${this.baseUrl}upload`;
    return this.http.post<string>(uploadUrl, formData);
  }
  getPackageById(id: number): Observable<Package> {
    return this.http.get<Package>(`${this.baseUrl}${id}`);
  }
  update(pack: Package): Observable<Package> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http
      .put<Package>(`${this.baseUrl}${pack.id}`, pack, { headers })
      .pipe(
        catchError((error) => {
          console.error('Package update failed:', error);
          throw error;
        })
      );
  }

  deletePackage(packageId: number): Observable<void> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const url = `${this.baseUrl}${packageId}`;
    return this.http.delete<void>(url, { headers }).pipe(
      catchError((error) => {
        console.error('Package delete failed:', error);
        throw error;
      })
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
