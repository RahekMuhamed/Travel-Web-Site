import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Favorite } from '../models/favorite';
import { Package } from '../models/packages';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private baseUrl: string = 'https://localhost:7062/api/LovePackage/';
  private wishlist: Package[] = [];
  private wishlistSubject = new BehaviorSubject<Package[]>(this.wishlist);
  constructor(private http: HttpClient) {}

  get wishlist$() {
    return this.wishlistSubject.asObservable();
  }
  addToWishlist(pack: Package, clientId: string): Observable<any> {
    const body = {
      id: 0,
      date: new Date().toISOString(),
      isDeleted: false,
      clientId: clientId,
      packageId: pack.id,
    };
    return this.http.post<any>(this.baseUrl, body).pipe(
      tap(() => {
        this.wishlist.push(pack);
        this.wishlistSubject.next(this.wishlist);
      })
    );
  }
  removeFromWishlist(pack: Package): Observable<any> {
    const lovePackageId = this.getLovePackageId(pack); // Implement this method
    const url = `${this.baseUrl}${lovePackageId}`;
    return this.http.delete<any>(url).pipe(
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
    return 2; // Placeholder, replace with actual logic
  }

  // fetchWishlist(clientId: string): void {
  //   // Implement fetch logic if you have an endpoint for getting the wishlist
  // }

  updateWishlist(newWishlist: Package[]): void {
    this.wishlist = newWishlist;
    this.wishlistSubject.next(this.wishlist);
  }
}
