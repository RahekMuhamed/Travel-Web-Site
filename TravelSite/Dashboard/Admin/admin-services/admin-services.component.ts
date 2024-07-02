import { Component, OnInit } from '@angular/core';
import { Services } from '../../../src/app/models/services';
import { CommonModule } from '@angular/common';
import { ServicesService } from '../../../src/app/services/services.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-services.component.html',
  styleUrl: './admin-services.component.css',
})
export class AdminServicesComponent implements OnInit {
  service: Services[] | null = null;
  constructor(
    private serviceservice: ServicesService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.serviceservice.getAll().subscribe({
      next: (response: any) => {
        this.service = response.$values;
      },
    });
  }
  viewDetails(serviceId: number): void {
    this.router.navigate(['/Admin/serviceDetail', serviceId]);
  }
  addService(): void {
    this.router.navigate(['/Admin/AddService']);
  }
  updateService(serviceId: number): void {
    this.router.navigate(['/Admin/updateservice', serviceId]);
  }
  removeService(serviceId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this service!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceservice.deleteService(serviceId).subscribe(
          () => {
            if (this.service) {
              this.service = this.service.filter((p) => p.id !== serviceId);
              Swal.fire(
                'Deleted!',
                'Your service has been deleted.',
                'success'
              );
            }
          },
          (error) => {
            console.error('Error removing service:', error);
            Swal.fire(
              'Error!',
              'Failed to delete service. Please try again later.',
              'error'
            );
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your service is safe :)', 'info');
      }
    });
  }
}
