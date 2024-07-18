import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserServiceService } from '../../src/app/services/user-service.service';
import { AuthServiceService } from '../../src/app/services/auth-service.service';
import { Router } from '@angular/router';
import { User } from '../../src/app/models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-user-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './edit-user-info.component.html',
  styleUrl: './edit-user-info.component.css',
})
export class EditUserInfoComponent implements OnInit {
  editForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserServiceService,
    private authService: AuthServiceService,
    private router: Router
  ) {
    this.editForm = this.fb.group({
      id: [0],
      fname: ['', Validators.required],
      email: [{ value: '', disabled: true }],
      gender: [''],
    });
  }

  ngOnInit() {
    const decodedToken = this.authService.decodeToken();
    const userId = decodedToken
      ? decodedToken[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
        ]
      : null;

    if (userId) {
      this.userService.getUserData(userId).subscribe(
        (data: User) => {
          this.editForm.patchValue({
            id: data.id,
            fname: data.fname,
            email: data.email,
            gender: data.gender,
          });
        },
        (error) => (this.errorMessage = `Error fetching user data: ${error}`)
      );
    } else {
      this.errorMessage = 'User ID is undefined.';
    }
  }

  updateUser() {
    if (this.editForm.valid) {
      const updatedUser = this.editForm.getRawValue();
      this.userService.updateUser(updatedUser).subscribe(
        () => this.router.navigate(['/profile/userinfo']),
        (error) => (this.errorMessage = `Error updating user data: ${error}`)
      );
    }
  }
}
