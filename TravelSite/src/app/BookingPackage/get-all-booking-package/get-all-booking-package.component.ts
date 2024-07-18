import { Component, NgModule, OnInit } from '@angular/core';
import { BookingPackageService } from '../../services/booking-package.service';
import { BookingPackage } from '../../models/booking-package';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-get-all-booking-package',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './get-all-booking-package.component.html',
  styleUrl: './get-all-booking-package.component.css'
})
export class GetAllBookingPackageComponent implements OnInit {
  AllBookingPackages: BookingPackage[] = [];
  clientId: string | null = "";  // Initialize with an empty string


  constructor(public bookingPackageService: BookingPackageService, public router: Router,
    public authServiceService: AuthServiceService
  ) { }
  ngOnInit(): void {
    // get the current client ID
    this.clientId = this.authServiceService.getUserIdFromToken();
    this.fetchBookings(this.clientId);
  }

  fetchBookings(clientId: string | null) {
    console.log("Fetching bookings for clientId:", this.clientId);

    if (this.clientId) {
      this.bookingPackageService.getAllBookingPackage(this.clientId).subscribe(
        (data: BookingPackage[]) => {//next function
          this.AllBookingPackages = data;
          console.log("Bookings fetched successfully:", this.AllBookingPackages);
        },
        error => {// error function
          console.error('Error fetching bookings:', error);
        }
      );
    } else {
      console.warn('Client ID is empty, cannot fetch bookings.');
    }
  }//end of fetch

  payment(id: number | undefined, price: number | undefined) {// i use undefined as price , id are optional in bookingPackage model 
    this.router.navigate(['/payment'], {
      queryParams: {
        bookingPackageId: id ?? null,
        amount: price ?? null
      }
    });
  }

  Remove(id: number | undefined) {
    if (id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.bookingPackageService.DeleteBooking(id).subscribe(
            response => {
              Swal.fire(
                'Deleted!',
                'Your booking has been deleted.',
                'success'
              );
               //After a booking is successfully deleted,
               // the method filters out the deleted booking from the AllBookingPackages array.This immediately updates the component's state and the UI.
              this.AllBookingPackages = this.AllBookingPackages.filter(
                  booking => booking.id !== id
                );

            },
            error => {
              Swal.fire(
                'Error!',
                'There was an error deleting the booking.',
                'error'
              );
            }
          );
        }
      });
    }
  }


}