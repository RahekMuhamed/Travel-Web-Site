import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookingPackage } from '../models/booking-package';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BookingPackageService {

  private BaseUrl: string ="http://localhost:7062/api/BookingPackage";
  constructor( public http: HttpClient ) {
  }
  AddBookingPackage(ClientId:string, packageId:number):Observable<BookingPackage>
  {
    const bookingPack = { ClientId, packageId };
     //const bookingPack = {packageId};

    return this.http.post<BookingPackage>(this.BaseUrl ,bookingPack);
  }
  getBookingPackage(id:number) :Observable<BookingPackage> // id:bookingpackage Id
  {
    return this.http.get<BookingPackage>(`${this.BaseUrl}/${id}`);
  }

  getAllbookingPackage(clientId:string):Observable<BookingPackage[]>
  {
       return this.http.get<any>(`${this.BaseUrl}/client/${clientId}`).pipe(
      map(response => {
        // Check if response has the $values property and return the array or an empty array
        return response.$values || [];
      })
    );
  }
}
