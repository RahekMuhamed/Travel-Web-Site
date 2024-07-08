import { Component } from '@angular/core';
import { AuthServiceService } from '../../src/app/services/auth-service.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  changePasswordForm: FormGroup;

  constructor(
    private authService: AuthServiceService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.changePasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup): any {
    const password = formGroup.get('password')!.value;
    const confirmPassword = formGroup.get('confirmPassword')!.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.changePasswordForm.valid) {
      const { password, confirmPassword } = this.changePasswordForm.value;
      this.authService.resetPassword({ password, confirmPassword }).subscribe(
        () => {
          alert('Password changed successfully!');
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error changing password:', error);
        }
      );
    } else {
      this.changePasswordForm.markAllAsTouched();
    }
  }
}
