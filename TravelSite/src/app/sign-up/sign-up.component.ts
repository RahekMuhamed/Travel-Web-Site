import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators ,ValidatorFn, ValidationErrors, AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, HttpClientModule,],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  errorMessage: string | null = null;
  validationErrors: any = {};
  successMessage: string | null = null;
  submitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]],
      confirmPassword: ['', Validators.required],
      agreeTerms: [false, Validators.requiredTrue]
    }, {
      validator: this.passwordMatchValidator 
    });
  }

  // Custom validator function to check if passwords match
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.submitting) {
      return;
    }

    this.submitting = true;
    this.errorMessage = null;
    this.successMessage = null;

    if (this.signUpForm.invalid) {
      this.markFormGroupTouched(this.signUpForm);
      this.submitting = false;
      return;
    }

    const formValue = this.signUpForm.value;

    const requestBody = {
      name: formValue.name,
      email: formValue.email,
      password: formValue.password,
      confirmPassword: formValue.confirmPassword,
      role: 'client'
    };

    this.authService.register(requestBody).subscribe(
      () => {
        this.successMessage = 'Registration successful! You can now log in.';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      (error) => {
        console.error('Error during sign up', error);

        if (error.status === 400 && error.error) {
          if (typeof error.error === 'string') {
            this.errorMessage = error.error; // Display general error message
          } else if (typeof error.error === 'object') {
            if (error.error.email) {
              this.errorMessage = error.error.email; // Display specific email error
            } else if (error.error.name) {
              this.errorMessage = error.error.name; // Display specific name error
            } else {
              this.errorMessage = 'Validation error. Please check your input.';
              this.validationErrors = error.error; // Display detailed validation errors
            }
          } else {
            this.errorMessage = 'Bad request. Please try again.';
          }
        } else {
          this.errorMessage = 'Error during sign up. Please try again later.';
        }

        this.submitting = false;
      }
    );
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
