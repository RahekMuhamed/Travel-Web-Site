import { Component } from '@angular/core';
import { BookingPackageService } from '../../services/booking-package.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delete-booking',
  standalone: true,
  imports: [],
  templateUrl: './delete-booking.component.html',
  styleUrl: './delete-booking.component.css'
})
export class DeleteBookingComponent {
  id: number = 0;

  constructor(public BookingPackageService: BookingPackageService, public router:ActivatedRoute)
  {

  }

}
