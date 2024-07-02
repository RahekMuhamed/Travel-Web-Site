import { Component, OnInit } from '@angular/core';
import { User } from '../../../src/app/models/user';
import { UserServiceService } from '../../../src/app/services/user-service.service';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../../src/app/services/auth-service.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customers-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customers-list.component.html',
  styleUrl: './customers-list.component.css',
})
export class CustomersListComponent implements OnInit {
  clients: User[] | null = null;

  constructor(
    private userService: UserServiceService,
    private router: Router,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserIdFromToken();
    console.log('User ID:', userId);

    if (userId) {
      this.userService.getAllClients().subscribe({
        next: (clients: User[]) => {
          console.log('Fetched Clients:', clients);
          this.clients = clients;
        },
        error: (error) => {
          console.error('Error fetching clients:', error);
          if (error.status === 403) {
            Swal.fire(
              'Unauthorized!',
              'You do not have permission to view this data.',
              'error'
            );
          } else {
            Swal.fire(
              'Error!',
              'Failed to fetch clients. Please try again later.',
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

  removeClient(clientId: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this client!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(clientId).subscribe(
          () => {
            if (this.clients) {
              this.clients = this.clients.filter(
                (client) => client.id !== clientId
              );
              Swal.fire('Deleted!', 'Your client has been deleted.', 'success');
            }
          },
          (error) => {
            console.error('Error removing client:', error);
            Swal.fire(
              'Error!',
              'Failed to delete client. Please try again later.',
              'error'
            );
          },
          () => {
            // Update clients list after deletion
            this.userService.getAllClients().subscribe({
              next: (clients: User[]) => {
                this.clients = clients;
              },
              error: (error) => {
                console.error('Error fetching clients:', error);
                Swal.fire(
                  'Error!',
                  'Failed to fetch clients. Please try again later.',
                  'error'
                );
              },
            });
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your client is safe :)', 'info');
      }
    });
  }
}
