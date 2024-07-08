import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Wishlist } from '../models/wishlist';
import { Package } from '../models/packages';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private baseUrl: string = 'https://localhost:7062/api/LovePackage/';
  private wishlist: Package[] = [];
  private wishlistSubject = new BehaviorSubject<Package[]>(this.wishlist);

  constructor(private http: HttpClient) {}

  get wishlist$(): Observable<Package[]> {
    return this.wishlistSubject.asObservable();
  }
  getWishlistPackages(): Observable<any> {
    const token = localStorage.getItem('authToken'); // Get the auth token from localStorage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(this.baseUrl, { headers });
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  fetchLikedPackages(): Observable<Package[]> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http
      .get<Package[]>(`${this.baseUrl}user-packages`, { headers })
      .pipe(
        tap((packages) => {
          this.wishlist = packages;
          this.wishlistSubject.next(this.wishlist);
        })
      );
  }

  addToWishlist(pack: Package, clientId: string): Observable<any> {
    const body = {
      id: 0,
      date: new Date().toISOString(),
      isDeleted: false,
      clientId: clientId,
      packageId: pack.id,
    };
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<any>(this.baseUrl, body, { headers }).pipe(
      tap(() => {
        this.wishlist.push(pack);
        this.wishlistSubject.next(this.wishlist);
      })
    );
  }

  removeFromWishlist(pack: Package): Observable<any> {
    const lovePackageId = this.getLovePackageId(pack); // Implement this method
    const url = `${this.baseUrl}${lovePackageId}`;
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete<any>(url, { headers }).pipe(
      tap(() => {
        this.wishlist = this.wishlist.filter((p) => p.id !== pack.id);
        this.wishlistSubject.next(this.wishlist);
      })
    );
  }

  isInWishlist(pack: Package): boolean {
    return this.wishlist.some((p) => p.id === pack.id);
  }

  private getLovePackageId(pack: Package): number {
    // Implement logic to get the lovePackageId for the given package
    return 0; // Placeholder, replace with actual logic
  }
}
