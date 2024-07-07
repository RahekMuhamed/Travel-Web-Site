
import { Component, OnInit } from '@angular/core';
import { Payment } from '../models/payment';
import { FormsModule } from '@angular/forms';
import { PaymentService } from '../services/payment.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
  // for package paymnet 
export class PaymentComponent implements OnInit {
  payment: Payment = { amount: 0, currency: "USD", bookingPackageId: 0 };
  multipleBookingIds: number[] = [];

  constructor(private route: ActivatedRoute, private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['bookingPackageId']) {
        // Single booking payment scenario
        this.payment.bookingPackageId = +params['bookingPackageId'];
        this.payment.amount = +params['amount'];
      } else if (params['bookingPackageIds']) {
        // Multiple bookings payment scenario
        this.multipleBookingIds = params['bookingPackageIds'].split(',').map((id: number) => +id);
        this.payment.amount = +params['amount'];
      }
    });
  }
  /*pay() {
    if (this.multipleBookingIds.length > 0) {
      if (this.multipleBookingIds.length === 1) {
        this.processSingleBookingPayment();
      }
      else {
        this.processMultipleBookingsPayment();
      }
    }
    else {
      alert("there is no objectsb")
    }
  }*/
  pay() {
    if (this.multipleBookingIds.length > 0) {
      this.processMultipleBookingsPayment();
    } else {
      this.processSingleBookingPayment();
    }
  }
  private processSingleBookingPayment() {
    this.paymentService.AddPayment(this.payment).subscribe(
      response => {
        if (response.success && response.approvalUrl) {
          // Redirect to PayPal approval URL
          window.location.href = response.approvalUrl;
    Swal.fire({
            title: 'Payment Successful!',
            text: 'Redirecting to PayPal for approval...',
            icon: 'success'
          });
        } else {
          console.error("Payment failed", response);
          Swal.fire({
            title: 'Payment Failed',
            text: 'Please try again later.',
            icon: 'error'
          });
        }
      },
      error => {
        console.log("Payment error", error);
        Swal.fire({
          title: 'Payment Error',
          text: 'Please try again later.',
          icon: 'error'
        });
      }
    );
  }

  
  private processMultipleBookingsPayment() {
    const paymentRequest = {
      amount: this.payment.amount,
      currency: "USD",
      bookingPackageIds: this.multipleBookingIds
    };

    this.paymentService.AddMultiplePayments(paymentRequest).subscribe(
      response => {
        // Ensure response contains $values property
        if (response.$values && Array.isArray(response.$values)) {
          response.$values.forEach((item: any) => {
            if (item.success && item.approvalUrl) {
              // Open a new window for each approval URL
              window.open(item.approvalUrl, '_blank');
            } else {
              console.error("Payment failed for booking ID", item.bookingId, item);// payment not completed (created only)
              alert("Payment failed for booking ID " + item.bookingId + ". Please try again.");
            }
          });
        } else {
          console.error("Unexpected response format", response);
          alert("Payment failed. Unexpected response format.");
        }
      },
      error => {
        console.log("Payment error", error);
        alert("Payment error. Please try again.");
      }
    );
  }
}
/*
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
  }*/



 