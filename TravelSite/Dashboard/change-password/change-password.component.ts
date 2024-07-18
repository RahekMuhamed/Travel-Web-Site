import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../../src/app/services/auth-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {

  changePasswordForm: FormGroup;
  passwordMismatch: boolean = false;
  passwordChanged: boolean = false;

  constructor(
    private authService: AuthServiceService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, { validator: this.passwordsMatch });
  }

  passwordsMatch(group: FormGroup) {
    const newPassword = group.controls['newPassword']?.value;
    const confirmPassword = group.controls['confirmPassword']?.value;
    return newPassword === confirmPassword ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.changePasswordForm.valid) {
      const { currentPassword, newPassword, confirmPassword } = this.changePasswordForm.value;
      if (newPassword !== confirmPassword) {
        this.passwordMismatch = true;
      } else {
        this.passwordMismatch = false;
        this.authService.changePassword(currentPassword, newPassword).subscribe(
          () => {
            Swal.fire('Password changed successfully!');
            this.passwordChanged = true;
            this.router.navigate(['/profile/userinfo']);
          },
          (error) => {
            console.error('Error changing password:', error);
            Swal.fire('Password change failed. Please try again.');
          }
        );
      }
    } else {
      this.changePasswordForm.markAllAsTouched();
    }
  }
}
