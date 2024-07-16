import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { PackagesService } from '../services/packages.service';
import { Package } from '../models/packages';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-communication-data',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './communication-data.component.html',
  styleUrl: './communication-data.component.css'
})
export class CommunicationDataComponent implements OnInit{
  isSubmitting = false; 
  public id: string = '';// client ID
  public packageId: number = 1; 
  public package: Package | null = null;
  public updateForm: FormGroup;



  constructor(
    public fb: FormBuilder,
    public packagesService:PackagesService,
    public router: Router,
    private route: ActivatedRoute,
    private userService: UserServiceService ){
    // Initialize the form with controls and validators
    this.updateForm = this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern(/^(010|011|012|015)\d{8}$/)]],
      passportNumber: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      residenceCountry: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }
  // gets the params from home / packages / packageDetails pages 

  ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
      this.packageId = params['packageId'];
      this.id = params['clientId'];
      this.loadPackage(this.packageId);
    });
  }
    loadPackage(id: number) {
    this.packagesService.getPackageById(id).subscribe(
      packageObj => this.package = packageObj,
      error => console.log("Failed to fetch package", error)
    );
  }
    
 updateClientData(): void {
    this.isSubmitting = true;
   this.userService.clientData = {
     email:this.updateForm.value.email,
      passportNumber: this.updateForm.value.passportNumber,
      phoneNumber: this.updateForm.value.phoneNumber,
      residanceCountry: this.updateForm.value.residenceCountry
    };
   console.log(this.id);
    this.userService.updateUserData().subscribe(
      response => {
        console.log('User data updated successfully', response);
        this.isSubmitting = false;
        Swal.fire({
          title: 'Success!',
          text: 'User data updated successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/AddBookingPackage'], { queryParams: { packageId: this.packageId, clientId: this.id } });
        });
      },
      error => {
        console.error('Error updating user data', error);
        this.isSubmitting = false;
        Swal.fire({
          title: 'Error!',
          text: 'There was an error updating the user data.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  }


}
