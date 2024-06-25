import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from '../models/service.model';
import { BookingService } from '../models/bookingService.model';
import { Payment } from '../models/payment.model';
@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  // private baseUrl = 'https://localhost:7062/api/';

  // constructor(private http: HttpClient) {}

  // getServices(): Observable<Service[]> {
  //   return this.http.get<Service[]>(`${this.baseUrl}/service`);
  // }

  // bookService(bookingDetails: BookingService): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/booking`, bookingDetails);
  // }

  // processPayment(paymentDetails: Payment): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/payment`, paymentDetails);
  // }
}
