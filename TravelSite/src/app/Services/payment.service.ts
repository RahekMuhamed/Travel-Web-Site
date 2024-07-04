import { Injectable } from '@angular/core';
import { Payment } from '../models/payment';
import { HttpClient } from '@angular/common/http';
import { BookingPackage } from '../models/booking-package';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  currency: string = "USD";
  baseUrl:string ="http://localhost:7062/api/Payment";
  constructor(public http: HttpClient) { }
  AddPayment(payment:Payment):Observable<any>
  {
     return this.http.post<Payment>(this.baseUrl, payment);
  }
  
   // AddMultiplePayments(paymentRequest: { amount: number; currency: string; bookingPackageIds: number[] }): Observable<any> {
   // return this.http.post<any>(`${this.baseUrl}/multiple`, paymentRequest);
  //}
   AddMultiplePayments(paymentRequest: { amount: number; currency: string; bookingPackageIds: number[] }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/multiple`, paymentRequest).pipe(
    map((response:any) => {
      // Return the full response including $values
      return response;
    })
  );
}
}
// angular,api
// medel===DTO
// Service === Interface(OR class implements Interface(Repo))
// componenet === controller (where uses model , service functions)