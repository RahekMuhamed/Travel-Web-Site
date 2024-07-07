import { Component } from '@angular/core';
import { AuthServiceService } from '../../src/app/services/auth-service.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  forgetPasswordForm: FormGroup;
  emailNotFound: boolean = false;

  constructor(
    private authService: AuthServiceService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.forgetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.forgetPasswordForm.valid) {
      const email = this.forgetPasswordForm.value.email;
      this.authService.sendResetPasswordEmail(email).subscribe(
        () => {
          alert('Password reset email sent successfully!');
          this.router.navigate(['/login']);
        },
        (error) => {
          if (error.status === 404) {
            this.emailNotFound = true;
          } else {
            console.error('Error sending reset email:', error);
          }
        }
      );
    } else {
      this.forgetPasswordForm.markAllAsTouched();
    }
  }
}
