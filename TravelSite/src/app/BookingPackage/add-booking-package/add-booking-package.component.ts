
import { Component, OnInit } from '@angular/core';
import { BookingPackageService } from '../../services/booking-package.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, Route } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { ActivatedRoute } from '@angular/router';
import { PackagesService } from '../../services/packages.service';
import { Package } from '../../models/packages';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../../services/user-service.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { FooterComponent } from "../../footer/footer.component";
import { NavbarComponent } from "../../navbar/navbar.component";

@Component({
  selector: 'app-add-booking-package',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, FooterComponent, NavbarComponent],
  templateUrl: './add-booking-package.component.html',
  styleUrls: ['./add-booking-package.component.css']
})
export class AddBookingPackageComponent implements OnInit {

  clientId: string = '';
  packageId: number = 1010;
  isSubmitting = false;
  updateForm: FormGroup; // Move initialization here
  Package: Package | null = null;
  id: number = 1;// booking id
  price: number = 1;


  constructor(
    public fb: FormBuilder,
    private bookingPackageService: BookingPackageService,
    private router: Router,
    private route: ActivatedRoute,
    private packagesService: PackagesService,
    private userService: UserServiceService,
  ) {
    // Initialize the form with controls and validators
    this.updateForm = this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)]],
      passportNumber: ['', Validators.required],
      residenceCountry: ['', Validators.required]
    });
  }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.packageId = params['packageId'];
      this.clientId = params['clientId'];
      this.loadPackage(this.packageId);
    });
  }

  loadPackage(id: number) {
    this.packagesService.getPackageById(id).subscribe(
      packageObj => this.Package = packageObj,
      error => console.log("Failed to fetch package", error)
    );
  }
 
  booking() {
    this.bookingPackageService.AddBookingPackage(this.clientId, this.packageId).subscribe(
      bookingPackagobj => {
        console.log("Booking added successfully", bookingPackagobj.price);
        if (bookingPackagobj.id !== undefined && bookingPackagobj.price !== undefined) {
          this.id = bookingPackagobj.id;
          this.price = bookingPackagobj.price;
          console.log(`Navigating to payment with id: ${this.id} and amount: ${this.price}`); // Log to verify
              this.id = bookingPackagobj.id;
          this.price = bookingPackagobj.price;
          Swal.fire({
            title: 'Booking Added Successfully',
            text: 'Do you want to proceed to payment or cancel?',
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: 'Proceed to Pay',
            cancelButtonText: 'Cancel'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/payment'], {
                queryParams: {
                  bookingPackageId: this.id,
                  amount: this.price
                }
              });
            } else {
              this.router.navigate(['/home']);
            }
          }); 
        } else {// error in price or ID
          console.error("Booking package ID is undefined.");
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Booking package ID or price is undefined.',
          });
        }
      },
      error => { // Error in request
        const errorMessage = error.error?.message || error.message || 'Unknown error';
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Error adding booking: ${errorMessage}`,
        });
        console.log("Error adding booking", error);
      }
    );
  }

  Back()
  {
    this.router.navigateByUrl("home");

  }
}
