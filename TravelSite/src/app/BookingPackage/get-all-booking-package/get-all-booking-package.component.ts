import { Component, NgModule, OnInit } from '@angular/core';
import { BookingPackageService } from '../../services/booking-package.service';
import { BookingPackage } from '../../models/booking-package';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-all-booking-package',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './get-all-booking-package.component.html',
  styleUrl: './get-all-booking-package.component.css'
})
  /*
export class GetAllBookingPackageComponent  {
  book: BookingPackage = new BookingPackage(1, 1, "f9cd98fd-bebc-440e-9378-52a4b018d21e", 1);
  AllBookingPackages: BookingPackage[] = [this.book];
  clientId: string = "bdd79742-792d-4b4a-bbaa-0640cdd6bc58";
  constructor(public bookingPackageService: BookingPackageService) { }
  //ngOnInit(): void {
    // here i will get the clientId of the logindclient from token
    // when fetch clientId from token i will subscribe here 

  //}
  fetchBookings() {
    console.log("hi fetch");
    if (this.clientId) {
      this.bookingPackageService.getAllbookingPackage(this.clientId).subscribe(
        (data: BookingPackage[]) => {
          this.AllBookingPackages = data;
          console.log("hello");
        },
        error => {
          console.error('Error fetching bookings:', error);
        }
      );
    }
  }
}*/
export class GetAllBookingPackageComponent {
  AllBookingPackages: BookingPackage[] = [];
  clientId: string = "";  // Initialize with an empty string
  Total_Amount: number = 0;
  constructor(public bookingPackageService: BookingPackageService ,public router:Router) { }

  fetchBookings(clientId:string) {
    console.log("Fetching bookings for clientId:", this.clientId);

    if (this.clientId) {
      this.bookingPackageService.getAllbookingPackage(this.clientId).subscribe(
        (data: BookingPackage[]) => {//next function
          this.AllBookingPackages = data;
          console.log("Bookings fetched successfully:", this.AllBookingPackages);
          this.calculateTotalAmount();
        },
        error => {// error function
          console.error('Error fetching bookings:', error);
        }
      );
    } else {
      console.warn('Client ID is empty, cannot fetch bookings.');
    }
  }//end of fetch

  calculateTotalAmount() {
    // Ensure AllBookingPackages is not null or undefined
     if (this.AllBookingPackages && this.AllBookingPackages.length > 0) {
       this.Total_Amount = this.AllBookingPackages.reduce((total, booking) => {// reduce iterates on each booking object in all bookingpackage array
        // and sum(total) each bookingPrice to the total,(total==sum)
        // Check if price is defined before adding to total
        if (booking.price != undefined) {
          return total + booking.price;
        } else {
          return total; // Or handle the case where price is undefined
        }
      }, 0);
    } else {
      this.Total_Amount = 0; // Handle case where there are no bookings
    }
  }
 payment() {
  if (this.AllBookingPackages && this.AllBookingPackages.length > 0) {
    const bookingIds = this.AllBookingPackages.map(booking => booking.id).join(',');
    this.router.navigate(['/payment'], { 
      queryParams: { 
        bookingPackageIds: bookingIds, 
        amount: this.Total_Amount 
      } 
    });
  }
}

}