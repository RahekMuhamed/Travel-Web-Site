import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { AuthServiceService } from '../services/auth-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterModule,FormsModule,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
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
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
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
            this.router.navigate(['/login']);
          },
          error => {
            console.error('Logout error:', error);
          }
        );
      }
    });
  }
}
