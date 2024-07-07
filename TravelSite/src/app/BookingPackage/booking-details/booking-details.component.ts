import { Component, OnInit } from '@angular/core';
import { BookingPackageService } from '../../services/booking-package.service';
import { ActivatedRoute } from '@angular/router';
import { BookingPackage } from '../../models/booking-package';

@Component({
  selector: 'app-booking-details',
  standalone: true,
  imports: [],
  templateUrl: './booking-details.component.html',
  styleUrl: './booking-details.component.css'
})
export class BookingDetailsComponent implements OnInit{
  bookingPackage: BookingPackage | null = null;
  // when the component have attribute(id) in route we use ActivatedRoute
  constructor(public bookingPackageService: BookingPackageService, public route: ActivatedRoute) { }
  ngOnInit(): void {
        // Get the bookingPackageId from the route
    const bookingPackageId = +this.route.snapshot.paramMap.get('id')!;
    this.bookingPackageService.getBookingPackage(bookingPackageId).subscribe(
      BookingPackgeobj => this.bookingPackage = BookingPackgeobj,// next function (if success response)
      error=>console.error('Error fetching booking package details', error)
    );
  }
}
