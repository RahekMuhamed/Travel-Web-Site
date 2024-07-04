import { Component } from '@angular/core';
import { BookingPackageService } from '../../services/booking-package.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-add-booking-package',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-booking-package.component.html',
  styleUrls: ['./add-booking-package.component.css'],
})
export class AddBookingPackageComponent {
  clientId: string = '1';
  packageId: number = 1010;
  id: number = 10;
  price: number = 0.5;
  isSubmitting = false;

  constructor(
    public bookingPackageService: BookingPackageService,
    public router: Router
  ) {}

  booking() {
    this.isSubmitting = true;
    this.bookingPackageService
      .AddBookingPackage(this.clientId, this.packageId)
      .subscribe(
        (bookingPackagobj) => {
          // the result after adding booking package object
          console.log('Booking added successfully', bookingPackagobj);
          if (bookingPackagobj.id !== undefined) {
            this.id = bookingPackagobj.id;
          } else {
            console.error('Booking package ID is undefined.');
          }
          // Show the modal
          const modalElement = document.getElementById('bookingmodal');
          if (modalElement) {
            const modal = new bootstrap.Modal(modalElement);
            modal.show();
          }
          this.isSubmitting = false; // Re-enable button
        },
        (error) => {
          // if failed to make request
          alert(`Error: ${error.message}`);
          console.log('Error adding booking', error);
          this.isSubmitting = false; // Re-enable button
        }
      ); // end of subscribe
  } // end of booking

  checkout() {
    // Hide the modal before navigating
    const modalElement = document.getElementById('bookingmodal');
    const btnBook = document.getElementById('btn-book');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal?.hide();
    }
    // Navigate to the payment page
    this.router.navigate(['/payment'], {
      queryParams: {
        bookingPackageId: this.id,
        amount: this.price,
      },
    });
  } // end of checkout
}
