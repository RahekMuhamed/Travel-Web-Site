import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../../../src/app/models/user';
import { AuthServiceService } from '../../../src/app/services/auth-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-admin',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './add-admin.component.html',
  styleUrl: './add-admin.component.css',
})
export class AddAdminComponent {
  addAdminForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceService,
    private router: Router
  ) {
    this.addAdminForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['admin', Validators.required],
    });
  }

  addAdmin(): void {
    if (this.addAdminForm.valid) {
      this.authService.register(this.addAdminForm.value).subscribe(
        (response) => {
          console.log('Admin added successfully:', response);
          Swal.fire('Success', 'Admin added successfully!', 'success').then(
            () => {
              this.router.navigate(['/profile/adminslist']);
            }
          );
        },
        (error) => {
          console.error('Error adding admin:', error);
          if (
            error.error &&
            error.error.message &&
            error.error.message.includes('already taken')
          ) {
            this.errorMessage =
              'Email is already registered. Please use a different email.';
          } else {
            this.errorMessage = 'Failed to add admin. Please try again.';
          }
        }
      );
    }
  }
}
