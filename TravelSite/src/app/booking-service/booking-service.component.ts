
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { BookingService } from '../models/bookingService.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-booking-service',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './booking-service.component.html',
  styleUrl: './booking-service.component.css',
})
export class BookingServiceComponent  {
  bookingForm: FormGroup;
  serviceId: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
   
    private router: Router
  ) {
    this.bookingForm = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      passengers: ['', Validators.required],
    });
  }

  // ngOnInit(): void {
  //   this.serviceId = + this.route.snapshot.paramMap.get('id');
  // }
  // ngOnInit(): void {
  //   const id = this.route.snapshot.paramMap.get('id');
  //   if (id) {
  //     this.serviceId = +id;
  //   } else {
  //     this.router.navigate(['/home']);
  //   }
  // }

  // onSubmit(): void {
  //   if (this.bookingForm.valid) {
  //     const bookingDetails: BookingService = {
  //       ...this.bookingForm.value,
  //       serviceId: this.serviceId,
  //     };
  //     this.apiService.bookService(bookingDetails).subscribe((response) => {
  //       console.log('Booking successful', response);
  //       this.router.navigate(['/payment']);
  //     });
  //   }
  // }
}
