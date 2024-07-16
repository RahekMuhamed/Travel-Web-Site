import { Component, OnInit } from '@angular/core';
import { Services } from '../../../src/app/models/services';
import { CommonModule } from '@angular/common';
import { ServicesService } from '../../../src/app/services/services.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SearchBarComponent } from '../../search-bar/search-bar.component';
import { PaginationService } from '../../../src/app/services/pagination.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-services',
  standalone: true,
  imports: [SearchBarComponent,
    CommonModule,FormsModule

  ],
  templateUrl: './admin-services.component.html',
  styleUrl: './admin-services.component.css',
})
export class AdminServicesComponent implements OnInit {
  service: Services[]=[];
  filteredservices: Services[] = [];
  paginatedServices: Services[] = [];
  rowsPerPage: number = 10;
  currentPage: number = 1;
  pageSizes: number[] = [5, 10, 20, 50];



  constructor(
    private serviceservice: ServicesService,
    private router: Router,
    private paginationService: PaginationService

  ) {}
  
ngOnInit(): void {
    this.serviceservice.getAll().subscribe({
      next: (response: any) => {
        this.service = response.$values;
        this.filteredservices = response.$values;

      },
    });
  }
  

  viewDetails(serviceId: number): void {
    this.router.navigate(['/profile/serviceDetail', serviceId]);
  }
  addService(): void {
    this.router.navigate(['/profile/AddService']);
  }
  updateService(serviceId: number): void {
    this.router.navigate(['/profile/updateservice', serviceId]);
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
  onSearch(query: string): void {
    if (this.service) {
      this.filteredservices = this.service.filter((ser) =>
        ser.name && ser.name.toLowerCase().includes(query.toLowerCase())
      );
      this.currentPage = 1; // Reset to the first page on search
      this.updatePaginatedServices();
    }
  }

  onRowsPerPageChange(event: Event): void {
    this.rowsPerPage = +(event.target as HTMLSelectElement).value;
    this.updatePaginatedServices();
  }

  updatePaginatedServices(): void {
    this.paginatedServices = this.paginationService.getPaginatedItems(
      this.filteredservices,
      this.currentPage,
      this.rowsPerPage
    );
  }

}
