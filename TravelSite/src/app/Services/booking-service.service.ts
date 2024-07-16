import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient,HttpHeaders } from '@angular/common/http';
import { BookingPackage } from '../models/booking-package';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BookingService } from '../models/booking-service';
import { Services } from '../models/services';
import { AuthServiceService } from './auth-service.service';


@Injectable({
  providedIn: 'root'
})
export class BookingServiceService {

  private BaseUrl: string = "http://localhost:5141/api/BookingService";
  service: Services | null = null;
 
   constructor( public http: HttpClient,private authService: AuthServiceService) {  
  }
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
   AddBookingService(ClientId:string, serviceId:number):Observable<BookingService>
  {
    const bookingService = { ClientId, serviceId };
    
    return this.http.post<BookingService>(this.BaseUrl ,bookingService,this.getHttpOptions());
  }
 
  getBookingService(id:number) :Observable<BookingService> // id:bookingpackage Id
  {
    return this.http.get<BookingService>(`${this.BaseUrl}/${id}`);
  }

// return all paid bookings for a specific client
  getAllbookingServices(clientId:string):Observable<BookingService[]>
  {
       return this.http.get<any>(`${this.BaseUrl}/AllPaidBookings/${clientId}`).pipe(
      map(response => {
        // Check if response has the $values property and return the array or an empty array
        return response.$values || [];
      })
    );
  }
}

