
import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../models/booking-service';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingServiceService } from '../../services/booking-service.service';
import { UserServiceService } from '../../services/user-service.service';
import { ServicesService } from '../../services/services.service';
import { Services } from '../../models/services';
import Swal from 'sweetalert2';
import { CalendarModule } from 'primeng/calendar';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Ensure FormsModule is imported
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-booking-service',
  standalone: true,
  imports: [CommonModule, FormsModule, CalendarModule],
  templateUrl: './add-booking-service.component.html',
  styleUrls: ['./add-booking-service.component.css']
})
export class AddBookingServiceComponent implements OnInit {
  bookingService: BookingService | null = null;
  serviceId: number = 0;
  clientId: string = '';
  service: Services | null = null;
  id: number = 0; // bookingServiceId
  numberOFAvailableRooms: number = 0;
  price: number = 0; // service price
  endDate: Date  = new Date();
  startDate: Date  = new Date;
  numberOFPersons: number = 2;
  totalServicePrice: number = 0; // Calculated service price
  duration: number = 0;

  constructor(
    private route: ActivatedRoute,
    private bookingServiceService: BookingServiceService,
    private userService: UserServiceService,
    private servicesService: ServicesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.serviceId = params['serviceId'];
      this.clientId = params['clientId'];
      this.loadPackage(this.serviceId);
    });
  }

  loadPackage(id: number) {
    this.servicesService.getserviceById(id).subscribe(
      serviceObj => {
        this.service = serviceObj;
        if (this.service?.price) {
          this.price = this.service.price;
        } else {
          this.price = 0;
        }
        this.calculateTotalServicePrice();
      },
      error => console.log("Failed to fetch service", error)
    );
  }

  onStartDateChange() {
    this.calculateTotalServicePrice();
  }

  onEndDateChange() {
    this.calculateTotalServicePrice();
  }

  onPersonCountChange(change: number) {
    this.numberOFPersons += change;
    if (this.numberOFPersons < 1) this.numberOFPersons = 1; // Minimum of 1 person
    this.calculateTotalServicePrice();
  }

 calculateNights(): number {
    if (this.startDate && this.endDate) {
        const start = new Date(this.startDate).setHours(0, 0, 0, 0);
        const end = new Date(this.endDate).setHours(0, 0, 0, 0);
        const days = Math.ceil((end - start) / (1000 * 3600 * 24));
        return Math.max(0, days); // For hotel bookings, number of nights equals days
    }
    return 0;
}
  calculateTotalServicePrice() {
    const nights = this.calculateNights();
    if (nights > 0) {
        let extraRooms = Math.max(0, Math.ceil((this.numberOFPersons - 2) / 2)); // Calculate extra rooms needed
        this.totalServicePrice = (this.price * nights) + (extraRooms * this.price * nights); // Calculate total price for all rooms
    } else {
        this.totalServicePrice = 0; // If no nights, the total price is 0
    }
}
  continue() {
    // Use totalServicePrice instead of price for payment
    this.bookingServiceService.AddBookingService(this.clientId,this.serviceId).subscribe(
      bookingserviceobj => {
        this.bookingService = bookingserviceobj;
        if (bookingserviceobj.id !== undefined) {
          this.id = bookingserviceobj.id;
        } else { 
          console.log("The Booking ID is undefined"); 
        }
        Swal.fire({
          title: 'Booking Added!',
          text: 'What would you like to do next?',
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'Go to Payment',
          cancelButtonText: 'Back'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/ServicePayment'], { queryParams: {bookingServiceId: this.id, amount: this.totalServicePrice } });
          } else {
            this.router.navigate(['/services']); // this will be aftrt adding before payment
          }
        });
      },
      error => {
        Swal.fire('Error', 'Failed to add booking.', 'error');
        console.error("Error adding booking", error);
      }
    );
  }
  // this before add booking
  goBack() {
    this.router.navigateByUrl("/services");
  }
}

