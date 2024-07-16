import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../../src/app/services/auth-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-email-verification',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule,],
  templateUrl: './email-verification.component.html',
  styleUrl: './email-verification.component.css'
})
export class EmailVerificationComponent implements OnInit {
  verificationForm!: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  submitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.verificationForm = this.fb.group({
      verificationCode: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.submitting) {
      return;
    }
  
    this.submitting = true;
    this.errorMessage = null;
    this.successMessage = null;
  
    if (this.verificationForm.invalid) {
      this.markFormGroupTouched(this.verificationForm);
      this.submitting = false;
      return;
    }
  
    const formValue = this.verificationForm.value;
  
    this.authService.verifyEmail(formValue.verificationCode).subscribe(
      (response) => {
        this.successMessage = 'Email verified successfully! You can now log in.';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      (error) => {
        console.error('Error during email verification', error);
        this.errorMessage = 'Invalid verification code. Please try again.';
        this.submitting = false;
      }
    );
  }
  

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
}

