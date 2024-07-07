import { Component, OnInit } from '@angular/core';
import { Serviceprovider } from '../../../src/app/models/serviceprovider';
import { ServiceProviderServiceService } from '../../../src/app/services/service-provider-service.service';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service-providerlist',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './service-providerlist.component.html',
  styleUrl: './service-providerlist.component.css',
})
export class ServiceProviderlistComponent implements OnInit {
  ServiceProvider: Serviceprovider[] | null = null;
  constructor(
    private serviceproviderservice: ServiceProviderServiceService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.serviceproviderservice.getAll().subscribe({
      next: (response: any) => {
        this.ServiceProvider = response.$values;
      },
    });
  }
  viewDetails(ServiceProviderId: number): void {
    this.router.navigate(['/profile/ServiceProviderDetail', ServiceProviderId]);
  }
  updateServiceProvider(ServiceProviderId: number): void {
    this.router.navigate(['/profile/updateServiceProvider', ServiceProviderId]);
  }

  removeServiceProvider(serviceProviderId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this Service Provider!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceproviderservice
          .deleteServiceProvider(serviceProviderId)
          .subscribe(
            () => {
              if (this.ServiceProvider) {
                this.ServiceProvider = this.ServiceProvider.filter(
                  (p) => p.id !== serviceProviderId
                );
                Swal.fire(
                  'Deleted!',
                  'Your Service Provider has been deleted.',
                  'success'
                );
              }
            },
            (error) => {
              console.error('Error removing Service Provider:', error);
              Swal.fire(
                'Error!',
                'Failed to delete Service Provider. Please try again later.',
                'error'
              );
            }
          );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your Service Provider is safe :)', 'info');
      }
    });
  }

  addServiceProvider(): void {
    this.router.navigate(['/profile/AddServiceProvider']);
  }
}
