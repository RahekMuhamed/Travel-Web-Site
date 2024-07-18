import { Component } from '@angular/core';
import { AuthServiceService } from '../../src/app/services/auth-service.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, [FormsModule], RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;
  submitting: boolean = false;

  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.submitting) {
      return;
    }

    this.submitting = true;
    this.errorMessage = null;

    // Prepare login data
    const loginData = {
      email: this.email,
      password: this.password,
    };

    this.authService.login(loginData).subscribe(
      () => {
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Login Error:', error);
        this.submitting = false;
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Invalid credentials. Please check your email and password and try again.',
        });
      }
    );
  }

}
