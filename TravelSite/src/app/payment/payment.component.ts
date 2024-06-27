import { Component, OnInit } from '@angular/core';
import { Payment } from '../Models/payment';
import { FormsModule } from '@angular/forms';
import { PaymentService } from '../Services/payment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']  // Corrected to styleUrls
})
export class PaymentComponent implements OnInit {
  payment: Payment = { amount: 0, currency: "USD", bookingPackageId: 0 };

  constructor(private route: ActivatedRoute, private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.payment.bookingPackageId = +params['bookingPackageId'];
      this.payment.amount = +params['amount'];
    });
  }

  pay() {
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
