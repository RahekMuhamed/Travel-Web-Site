import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookingPackage } from '../Models/booking-package';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingPackageService {

  private BaseUrl: string ="http://localhost:5141/api/BookingPackage";
  constructor( public http: HttpClient ) {  
  }
  AddBookingPackage(ClientId:string, packageId:number):Observable<BookingPackage>
  {
    //const bookingPack = { ClientId, packageId };
     const bookingPack = {packageId};

    return this.http.post<BookingPackage>(this.BaseUrl ,bookingPack);
  }


}
