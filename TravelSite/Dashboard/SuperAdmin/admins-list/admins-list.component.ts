import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { UserServiceService } from '../../../src/app/services/user-service.service';
import { User } from '../../../src/app/models/user';
import { AuthServiceService } from '../../../src/app/services/auth-service.service';

@Component({
  selector: 'app-admins-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admins-list.component.html',
  styleUrls: ['./admins-list.component.css'],
})
export class AdminsListComponent implements OnInit {
  admins: User[] | null = null;

  constructor(
    private userService: UserServiceService,
    private router: Router,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserIdFromToken();
    console.log('User ID:', userId);

    if (userId) {
      this.userService.getAllAdmins().subscribe({
        next: (admins: User[]) => {
          console.log('Fetched Admins:', admins);
          if (admins && admins.length > 0) {
            this.admins = admins;
          } else {
            console.log('No admins found.');
          }
        },
        error: (error) => {
          console.error('Error fetching admins:', error);
          if (error.status === 403) {
            Swal.fire(
              'Unauthorized!',
              'You do not have permission to view this data.',
              'error'
            );
          } else {
            Swal.fire(
              'Error!',
              'Failed to fetch admins. Please try again later.',
              'error'
            );
          }
        },
      });
    } else {
      Swal.fire(
        'Unauthorized!',
        'You do not have permission to view this data.',
        'error'
      );
    }
  }

  viewDetails(adminId: string): void {
    this.router.navigate(['/SuperAdmin/adminDetail', adminId]);
  }

  updateAdmin(adminId: string): void {
    this.router.navigate(['/SuperAdmin/updateAdmin', adminId]);
  }
  removeAdmin(adminId: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this admin!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(adminId).subscribe(
          () => {
            if (this.admins) {
              this.admins = this.admins.filter((admin) => admin.id !== adminId);
              localStorage.setItem('admins', JSON.stringify(this.admins));
              Swal.fire('Deleted!', 'Your admin has been deleted.', 'success');
            }
          },
          (error) => {
            console.error('Error removing admin:', error);
            if (error.status === 404) {
              Swal.fire('Not Found!', 'Admin not found.', 'error');
            } else {
              Swal.fire(
                'Error!',
                'Failed to delete admin. Please try again later.',
                'error'
              );
            }
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your admin is safe :)', 'info');
      }
    });
  }

  addAdmin(): void {
    this.router.navigate(['/Admin/AddAdmin']);
  }
}
