import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';
import { BookingPackage } from '../models/booking-package';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BookingPackageService {

  private BaseUrl: string ="http://localhost:5141/api/BookingPackage";

  constructor(private http: HttpClient, private authService: AuthServiceService) {}

  private getHttpOptions() {
    const token = this.authService.getToken();
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0'
      })
    };
  }

  AddBookingPackage(clientId: string, packageId: number): Observable<BookingPackage> {
    const bookingPack = { ClientId: clientId, packageId: packageId };

    return this.http.post<BookingPackage>(this.BaseUrl, bookingPack, this.getHttpOptions());
  }

  getBookingPackage(id: number): Observable<BookingPackage> {
    return this.http.get<BookingPackage>(`${this.BaseUrl}/${id}`, this.getHttpOptions());
  }

  DeleteBooking(id: number): Observable<any> {
    return this.http.delete<any>(`${this.BaseUrl}/${id}`, this.getHttpOptions());
  }
 getAllBookingPackage(clientId: string): Observable<BookingPackage[]> {
    return this.http.get<any>(`${this.BaseUrl}/client/${clientId}`, this.getHttpOptions()).pipe(
      map(response => {
        if (response && response.$values) {
          return response.$values;
        } else {
          console.warn('Unexpected response format:', response);
          return [];
        }
      }),
      catchError(error => {
        console.error('Error fetching all booking packages:', error);
        throw error;
      })
    );
  }
}

