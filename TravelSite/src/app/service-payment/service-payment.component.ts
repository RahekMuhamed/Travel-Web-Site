import { Component, OnInit } from '@angular/core';
import { Payment } from '../models/payment';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../services/payment.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-service-payment',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './service-payment.component.html',
  styleUrl: './service-payment.component.css'
})
export class ServicePaymentComponent implements OnInit {
  payment: Payment = { amount: 0, currency: "USD", bookingServiceId: 0 };

  constructor(public route: ActivatedRoute, public paymentService: PaymentService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.payment.bookingServiceId = +params['bookingServiceId'];
      this.payment.amount = +params['amount'];
    } 
  )
}
  pay2(){
    console.log("hellohhh");
    this.paymentService.AddPayment(this.payment).subscribe(
      response => {
        if (response.success && response.approvalUrl) {
          // Redirect to PayPal approval URL
          window.location.href = response.approvalUrl;
        } else {
          console.error("Payment failed", response);
          alert("Payment failed. Please try again.");
        }
      },
      error => {
        console.log("Payment error", error);
        alert("Payment error. Please try again.");
      }
    );
  }


}
