/*
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

@Component({
  selector: 'app-add-booking-package',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-booking-package.component.html',
  styleUrls: ['./add-booking-package.component.css']
})
export class AddBookingPackageComponent implements OnInit {

  clientId: string = '';
  packageId: number = 1010;
  isSubmitting = false;
  Package: Package | null = null;
  id: number = 1;// booking id
  updateForm: FormGroup; // Move initialization here
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
  continue() {
    const formdiv = document.getElementById("bookingFormdiv");
    const fillDiv = document.getElementById("fill");
    if (formdiv && fillDiv) {
      fillDiv.innerHTML = `<P> Please Fill This Form To Complete Booking </P>`
      formdiv.style.display = "block";
    }
  }
  /*
    booking() {
      if (this.updateForm.valid) {
        this.isSubmitting = true;
        // First, update the client data
        this.updateClientData().then(() => {
          // Then, complete the booking
          this.complteBooking().then(() => {
            // Finally, handle the booking package
            this.bookingPackageService.AddBookingPackage(this.clientId, this.packageId).subscribe(
              bookingPackagobj => {
                console.log("Booking added successfully", bookingPackagobj.price);
                if (bookingPackagobj.id !== undefined && bookingPackagobj.price !==undefined) {
                  this.id = bookingPackagobj.id;
                  this.price = bookingPackagobj.price;
                 console.log(`Navigating to payment with id: ${this.id} and amount: ${this.price}`); // Log to verify
                  this.router.navigate(['/payment'], { 
                      queryParams: { 
                        bookingPackageId:this.id, 
                        amount: this.price 
                      } 
                    });
                } else {
                  console.error("Booking package ID is undefined.");
                }
                this.isSubmitting = false;
              },
              error => {
                alert(`Error: ${error.message}`);
                console.log("Error adding booking", error);
                this.isSubmitting = false;
              }
            );
          }).catch(error => {
            console.error('Error completing booking', error);
            this.isSubmitting = false;
          });
        }).catch(error => {
          console.error('Error updating client data', error);
          this.isSubmitting = false;
        });
      } else {
        console.warn('Form is invalid');
      }
    }
  
    complteBooking(): Promise<void> {
      return new Promise((resolve, reject) => {
        // Assuming complete booking logic
        console.log('Completing booking...');
        // Simulate async operation
        setTimeout(() => {
          console.log('Booking completed');
          alert("Booking completed")
          resolve();
        }, 1000); // Adjust the timeout as needed for actual async operation
      });
    }
  
    updateClientData(): Promise<void> {
      return new Promise((resolve, reject) => {
        this.userService.clientData = {
          PhoneNumber: this.updateForm.value.phoneNumber,
          Passport: this.updateForm.value.passportNumber,
          ResidanceCountry: this.updateForm.value.residenceCountry
        };
  
        this.userService.updateUserData(this.clientId).subscribe(
          response => {
            console.log('User data updated successfully', response);
            resolve();
          },
          error => {
            console.error('Error updating user data', error);
            reject(error);
          }
        );
      });
    }*/
   /*
import { Component, OnInit } from '@angular/core';
import { BookingPackageService } from '../../services/booking-package.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PackagesService } from '../../services/packages.service';
import { Package } from '../../models/packages';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../../services/user-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-booking-package',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-booking-package.component.html',
  styleUrls: ['./add-booking-package.component.css']
})
export class AddBookingPackageComponent implements OnInit {

  clientId: string = '';
  packageId: number = 1010;
  isSubmitting = false;
  Package: Package | null = null;
  id: number = 1; // booking id
  updateForm: FormGroup;
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

  continue() {
    const formdiv = document.getElementById("bookingFormdiv");
    const fillDiv = document.getElementById("fill");
    if (formdiv && fillDiv) {
      fillDiv.innerHTML = `<p> Please Fill This Form To Complete Booking </p>`;
      formdiv.style.display = "block";
    }
  }

  booking() {
    if (this.updateForm.valid) {
      this.isSubmitting = true;

      // First, update the client data
      this.updateClientData().then(() => {
        // Then, complete the booking
        this.complteBooking().then(() => {
          // Finally, handle the booking package
          this.bookingPackageService.AddBookingPackage(this.clientId, this.packageId).subscribe(
            bookingPackagobj => {
              console.log("Booking added successfully", bookingPackagobj.price);

              if (bookingPackagobj.id !== undefined && bookingPackagobj.price !== undefined) {
                this.id = bookingPackagobj.id;
                this.price = bookingPackagobj.price;
                console.log(`Navigating to payment with id: ${this.id} and amount: ${this.price}`);

                // Navigate to payment only after successful booking
                this.router.navigate(['/payment'], {
                  queryParams: { bookingPackageId: this.id, amount: this.price }
                });
              } else {
                console.error("Booking package ID or price is undefined.");
                this.showError("Booking package ID or price is undefined.");
              }

              this.isSubmitting = false;
            },
            error => {
              console.log("Error adding booking", error);
              this.showError(`Error: ${error.message}`);
              this.isSubmitting = false;
            }
          );
        }).catch(error => {
          console.error('Error completing booking', error);
          this.showError(`Error completing booking: ${error.message}`);
          this.isSubmitting = false;
        });
      }).catch(error => {
        console.error('Error updating client data', error);
        this.showError(`Error updating client data: ${error.message}`);
        this.isSubmitting = false;
      });
    } else {
      console.warn('Form is invalid');
    }
  }

  complteBooking(): Promise<void> {
    return new Promise((resolve, reject) => {
      console.log('Completing booking...');
      // Simulate async operation
      setTimeout(() => {
        console.log('Booking preparation completed');
        resolve();
      }, 1000); // Adjust the timeout as needed for actual async operation
    });
  }

  updateClientData(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.userService.clientData = {
        PhoneNumber: this.updateForm.value.phoneNumber,
        Passport: this.updateForm.value.passportNumber,
        ResidanceCountry: this.updateForm.value.residenceCountry
      };

      this.userService.updateUserData(this.clientId).subscribe(
        response => {
          console.log('User data updated successfully', response);
          resolve();
        },
        error => {
          console.error('Error updating user data', error);
          reject(error);
        }
      );
    });
  }

  private showError(errorMessage: string) {
    // Use your preferred method to display error
    alert(errorMessage);
  }
  Back()
  {
    this.router.navigateByUrl("home");
  }
}*/
// add-booking-package.component.ts
import { Component, OnInit } from '@angular/core';
import { BookingPackageService } from '../../services/booking-package.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PackagesService } from '../../services/packages.service';
import { Package } from '../../models/packages';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../../services/user-service.service';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-add-booking-package',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-booking-package.component.html',
  styleUrls: ['./add-booking-package.component.css']
})
export class AddBookingPackageComponent implements OnInit {
  clientId: string = '';
  packageId: number = 1010;
  isSubmitting = false;
  Package: Package | null = null;
  id: number = 1; // booking id
  updateForm: FormGroup;
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
     phoneNumber: ['', [Validators.required, Validators.pattern(/^0\d{10}$/)]], // Phone number pattern updated
      passportNumber: ['', [Validators.required, Validators.pattern(/^[A-Z]\d{7}$/)]], // Egyptian passport number pattern
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

  continue() {
    const formdiv = document.getElementById("bookingFormdiv");
    const fillDiv = document.getElementById("fill");
    if (formdiv && fillDiv) {
      fillDiv.innerHTML = `<p> Please Fill This Form To Complete Booking </p>`;
      formdiv.style.display = "block";
    }
  }

  booking() {
    if (this.updateForm.valid) {
      this.isSubmitting = true;

      // First, update the client data
      this.updateClientData().then(() => {
        // Then, complete the booking
        this.complteBooking().then(() => {
          // Finally, handle the booking package
          this.bookingPackageService.AddBookingPackage(this.clientId, this.packageId).subscribe(
            bookingPackagobj => {
              console.log("Booking added successfully", bookingPackagobj.price);

              if (bookingPackagobj.id !== undefined && bookingPackagobj.price !== undefined) {
                this.id = bookingPackagobj.id;
                this.price = bookingPackagobj.price;
                console.log(`Navigating to payment with id: ${this.id} and amount: ${this.price}`);

                // Navigate to payment only after successful booking
                this.router.navigate(['/payment'], {
                  queryParams: { bookingPackageId: this.id, amount: this.price }
                });
              } else {
                console.error("Booking package ID or price is undefined.");
                this.showError("Booking package ID or price is undefined.");
              }

              this.isSubmitting = false;
            },
            error => {
              console.log("Error adding booking", error);
              this.showError(error.error.message || 'Server error');
              this.isSubmitting = false;
            }
          );
        }).catch(error => {
          console.error('Error completing booking', error);
          this.showError(error.message || 'Server error');
          this.isSubmitting = false;
        });
      }).catch(error => {
        console.error('Error updating client data', error);
        this.showError(error.message || 'Server error');
        this.isSubmitting = false;
      });
    } else {
      console.warn('Form is invalid');
    }
  }

  complteBooking(): Promise<void> {
    return new Promise((resolve, reject) => {
      console.log('Completing booking...');
      // Simulate async operation
      setTimeout(() => {
        console.log('Booking preparation completed');
        resolve();
      }, 1000); // Adjust the timeout as needed for actual async operation
    });
  }

  updateClientData(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.userService.clientData = {
        PhoneNumber: this.updateForm.value.phoneNumber,
        Passport: this.updateForm.value.passportNumber,
        ResidanceCountry: this.updateForm.value.residenceCountry
      };

      this.userService.updateUserData(this.clientId).subscribe(
        response => {
          console.log('User data updated successfully', response);
          resolve();
        },
        error => {
          console.error('Error updating user data', error);
          reject(error);
        }
      );
    });
  }

  private showError(errorMessage: string) {
    // Use your preferred method to display error
    alert(errorMessage);
  }
  
  Back() {
    this.router.navigateByUrl("home");
  }
}

