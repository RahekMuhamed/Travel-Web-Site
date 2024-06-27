import { Injectable } from '@angular/core';
import { Payment } from '../Models/payment';
import { HttpClient } from '@angular/common/http';
import { BookingPackage } from '../Models/booking-package';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  currency: string = "USD";
  baseUrl:string ="http://localhost:5141/api/Payment";
  constructor(public http: HttpClient) { }
  AddPayment(payment:Payment):Observable<any>
  {
     return this.http.post<Payment>(this.baseUrl, payment);
  }
}
// angular,api
// medel===DTO
// Service === Interface(OR class implements Interface(Repo))
// componenet === controller (where uses model , service functions)