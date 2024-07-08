import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, finalize, map, tap, throwError } from 'rxjs';

import { Package } from '../models/packages';

@Injectable({
  providedIn: 'root',
})
export class PackagesService {
  private wishlistUrl: string = 'https://localhost:7062/api/LovePackage/';

  private wishlist: Package[] = [];
  private wishlistSubject = new BehaviorSubject<Package[]>(this.wishlist);
  private baseUrl: string = 'https://localhost:7062/api/Packages/';
  private loadingSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}
  get loading$() {
    return this.loadingSubject.asObservable();
  }

  getAll(page?: number, pageSize?: number): Observable<any> {
    this.loadingSubject.next(true);
    return this.http
      .get<any>(`${this.baseUrl}?pageNumber=${page}&pageSize=${pageSize}`)
      .pipe(
        map((response) => response),
        catchError(this.handleError),
        finalize(() => this.loadingSubject.next(false))
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

  get wishlist$(): Observable<Package[]> {
    return this.wishlistSubject.asObservable();
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
  fetchWishlist(): Observable<Package[]> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
      .get<Package[]>(`${this.wishlistUrl}user-packages`, { headers })
      .pipe(
        tap((packages) => {
          this.wishlist = packages;
          this.wishlistSubject.next(this.wishlist);
        })
      );
  }
  addToWishlist(pack: Package): Observable<any> {
    const clientId = this.getUserIdFromToken();
    if (!clientId) {
      return throwError('Client ID not found');
    }
    const body = {
      id: 0,
      date: new Date().toISOString(),
      isDeleted: false,
      clientId: clientId,
      packageId: pack.id,
    };
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<any>(this.wishlistUrl, body, { headers }).pipe(
      tap(() => {
        this.wishlist.push(pack);
        this.wishlistSubject.next(this.wishlist);
      })
    );
  }
  removeFromWishlist(pack: Package): Observable<any> {
    const lovePackageId = this.getLovePackageId(pack);
    const url = `${this.wishlistUrl}${lovePackageId}`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete<any>(url, { headers }).pipe(
      tap(() => {
        this.wishlist = this.wishlist.filter((p) => p.id !== pack.id);
        this.wishlistSubject.next(this.wishlist);
      })
    );
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

  isInWishlist(pack: Package): boolean {
    return this.wishlist.some((p) => p.id === pack.id);
  }

  private getLovePackageId(pack: Package): number {
    return this.wishlist.find((p) => p.id === pack.id)?.id || 0;
  }
}
