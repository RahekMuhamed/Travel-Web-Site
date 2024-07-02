import { Component } from '@angular/core';
import { AuthServiceService } from '../../src/app/services/auth-service.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
        // this.router.navigate(['/Aminlayout']);
        this.router.navigate(['/Admin']);
      },
      (error) => {
        console.error('Login Error:', error);
        this.errorMessage = 'Invalid credentials. Please try again.';
        this.submitting = false;
      }
    );
  }
}
