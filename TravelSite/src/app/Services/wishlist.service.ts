import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { Wishlist } from '../models/wishlist';
import { Package } from '../models/packages';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  //private baseUrl: string = 'https://localhost:7062/api/LovePackage/';
  private baseUrl: string = 'https://localhost:7062/api/LovePackage/';
  private userWishlistUrl: string =
    'https://localhost:7062/api/LovePackage/user-packages';

  private wishlist: Package[] = [];
  private wishlistSubject = new BehaviorSubject<Package[]>(this.wishlist);
  productIds: any[] = [];
  constructor(
    private http: HttpClient,
    private authService: AuthServiceService
  ) {}

  getWishlist(): Observable<Package[]> {
    const headers = this.getAuthHeaders();
    return this.http
      .get<Package[]>(`${this.baseUrl}user-packages`, { headers })
      .pipe(catchError(this.handleError));
  }

  likePackage(pkg: Package): Observable<any> {
    const headers = this.getAuthHeaders();
    const data = {
      id: 0,
      date: new Date().toISOString(),
      isDeleted: false,
      clientId: this.authService.getUserIdFromToken(),
      packageId: pkg.id,
      packageName: pkg.name,
      packageDescription: pkg.description,
      packagePrice: pkg.price,
    };
    return this.http
      .post<any>(this.baseUrl, data, { headers })
      .pipe(catchError(this.handleError));
  }
  unlikePackage(pkgId: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http
      .delete<void>(`${this.baseUrl}${pkgId}`, { headers })
      .pipe(catchError(this.handleError));
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  // getLovedPackages(): Observable<Package[]> {
  //   const headers = this.getAuthHeaders();
  //   return this.http
  //     .get<Package[]>(this.baseUrl, { headers })
  //     .pipe(catchError(this.handleError));
  // }
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

  // fetchLikedPackages(): Observable<Package[]> {
  //   const token = this.authService.getToken();
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  //   return this.http
  //     .get<Package[]>(`${this.baseUrl}user-packages`, { headers })
  //     .pipe(
  //       tap((packages) => {
  //         this.wishlist = packages;
  //         this.wishlistSubject.next(this.wishlist);
  //       })
  //     );
  // }

  // addToWishlist(pack: Package): Observable<any> {
  //   const body = {
  //     id: 0,
  //     date: new Date().toISOString(),
  //     isDeleted: false,

  //     packageId: pack.id,
  //   };
  //   const token = this.authService.getToken();
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  //   return this.http.post<any>(this.baseUrl, body, { headers }).pipe(
  //     tap(() => {
  //       this.wishlist.push(pack);
  //       this.wishlistSubject.next(this.wishlist);
  //     })
  //   );
  // }

  // removeFromWishlist(pack: Package): Observable<any> {
  //   const lovePackageId = this.getLovePackageId(pack); // Implement this method
  //   const url = `${this.baseUrl}${lovePackageId}`;
  //   const token = this.authService.getToken();
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  //   return this.http.delete<any>(url, { headers }).pipe(
  //     tap(() => {
  //       this.wishlist = this.wishlist.filter((p) => p.id !== pack.id);
  //       this.wishlistSubject.next(this.wishlist);
  //     })
  //   );
  // }

  // isInWishlist(pack: Package): boolean {
  //   return this.wishlist.some((p) => p.id === pack.id);
  // }
}
