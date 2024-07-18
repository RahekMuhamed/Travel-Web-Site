import { Injectable } from '@angular/core';
import { Payment } from '../models/payment';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BookingPackage } from '../models/booking-package';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { map } from 'rxjs';
import { AuthServiceService } from './auth-service.service';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  currency: string = "USD";
  baseUrl:string ="http://localhost:5141/api/Payment";
  constructor(public http: HttpClient ,private authService: AuthServiceService) { }
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
  // i use only single payment , pay for one single booking
  AddPayment(payment:Payment):Observable<any>
  {
     return this.http.post<Payment>(this.baseUrl, payment,this.getHttpOptions());
  }
  
  
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
