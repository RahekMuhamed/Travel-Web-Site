import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route, Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserServiceService } from '../../src/app/services/user-service.service';
import { AuthServiceService } from '../../src/app/services/auth-service.service';
import Swal from 'sweetalert2';
import { NavbarComponent } from '../../src/app/navbar/navbar.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet,RouterLink,FormsModule,CommonModule,NavbarComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent implements OnInit {
  user: any;
  errorMessage: string = '';
  userRole: string| null;

  constructor(private userService: UserServiceService, private authService: AuthServiceService, private router: Router) {
    this.userRole = this.authService.getRole();
  }
  ngOnInit() {
    const token = this.authService.getToken();

    if (token) {
      const decodedToken = this.authService.decodeToken();
    const userId = decodedToken ? decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] : null;

      if (userId) {
        console.log(`Fetching user data for ID: ${userId}`);
        this.userService.getUserData(userId).subscribe(
          data => this.user = data,
          error => this.errorMessage = `Error fetching user data: ${error}`
        );
      } else {
        this.errorMessage = 'User ID is undefined.';
      }
    } else {
      this.errorMessage = 'Token is null.';
    }
  }

  onLogoutClick(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout().subscribe(
          () => {
            console.log('Logged out successfully');
            this.router.navigate(['/home']);
          },
          error => {
            console.error('Logout error:', error);
            // Handle logout error
          }
        );
      }
    });
  }
}
