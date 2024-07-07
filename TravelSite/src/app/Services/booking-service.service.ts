import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { BookingPackage } from '../models/booking-package';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BookingService } from '../models/booking-service';
import { Services } from '../models/services';


@Injectable({
  providedIn: 'root'
})
export class BookingServiceService {

  private BaseUrl: string = "http://localhost:5141/api/BookingService";
  service: Services | null = null;
 
   constructor( public http: HttpClient ) {  
  }
   AddBookingService(ClientId:string, serviceId:number):Observable<BookingService>
  {
    const bookingService = { ClientId, serviceId };
    
    return this.http.post<BookingService>(this.BaseUrl ,bookingService);
  }
  /*prepareAndAddBooking(clientId: string, serviceId: number, startDate: Date, endDate: Date, duration: number, numberOfPersons: number): Observable<BookingService> {
    const bookingDetails = {
      clientId,
      serviceId,
      startDate,
      endDate,
      duration,
      numberOfPersons
    };

    return this.http.post<any>(`${this.BaseUrl}`, bookingDetails);
  }*/
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

