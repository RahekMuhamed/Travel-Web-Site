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
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 100;
  packageId: number = 1;

  constructor(
    private serviceservice: ServicesService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
        this.loadData(this.currentPage, this.itemsPerPage);

  }
    loadData(
    page: number = this.currentPage,
    pageSize: number = this.itemsPerPage
  ): void {
    this.serviceservice.getAll(page, pageSize).subscribe(
      (response) => {
        //
        this.service = response.data.$values;
        this.totalItems = response.totalCount;
        this.currentPage = response.pageNumber;
        this.itemsPerPage = response.pageSize; // Assuming the response contains the total number of pages
      },
      (error) => {
        console.error('Error loading data:', error);
      }
    );
  }
  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadData(page, this.itemsPerPage);
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }
  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadData();
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalItems) {
      this.currentPage++;
      this.loadData();
    }
  }

  goToPage(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const page = target.value;
    const pageNumber = parseInt(page, 10);
    if (
      pageNumber &&
      pageNumber >= 1 &&
      pageNumber <= this.totalItems &&
      pageNumber !== this.currentPage
    ) {
      this.currentPage = pageNumber;
      this.loadData();
    }
  }
  get pageNumbers(): number[] {
    return Array.from({ length: this.totalItems }, (_, index) => index + 1);
  }
  trackByFn(index: number, item: any): any {
    return item.id; // Replace "id" with the unique identifier of your data item
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
