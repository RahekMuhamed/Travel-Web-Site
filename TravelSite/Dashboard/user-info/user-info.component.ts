import { Component, OnInit } from '@angular/core';
import { User } from '../../src/app/models/user';
import { UserServiceService } from '../../src/app/services/user-service.service';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../src/app/services/auth-service.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'], // Fix typo: styleUrl -> styleUrls
})
export class UserInfoComponent implements OnInit {
  user: any;
  errorMessage: string = ''; // Initialize errorMessage to an empty string

  constructor(
    private userService: UserServiceService,
    private authService: AuthServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    const token = this.authService.getToken();

    if (token) {
      const decodedToken = this.authService.decodeToken();
      const userId = decodedToken
        ? decodedToken[
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
          ]
        : null;

      if (userId) {
        console.log(`Fetching user data for ID: ${userId}`);
        this.userService.getUserData(userId).subscribe(
          (data) => (this.user = data),
          (error) => (this.errorMessage = `Error fetching user data: ${error}`)
        );
      } else {
        this.errorMessage = 'User ID is undefined.';
      }
    } else {
      this.errorMessage = 'Token is null.';
    }
  }
  editUser() {
    this.router.navigate(['/profile/EditUserInfo']);
  }
  changepassword() {
    this.router.navigate(['/profile/changePassword']);
  }
}
