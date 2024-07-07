import { Component, OnInit } from '@angular/core';
import { Package } from '../../../src/app/models/packages';
import { PackagesService } from '../../../src/app/services/packages.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-packages',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-packages.component.html',
  styleUrl: './admin-packages.component.css',
})
export class AdminPackagesComponent implements OnInit {
  packages: Package[] | null = null;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 100;
  packageId: number = 1;
  constructor(
    private packageservice: PackagesService,
    private router: Router
  ) {}
  ngOnInit(): void {
        this.loadData(this.currentPage, this.itemsPerPage);

  }
    loadData(
    page: number = this.currentPage,
    pageSize: number = this.itemsPerPage
  ): void {
    this.packageservice.getAll(page, pageSize).subscribe(
      (response) => {
        //
        this.packages = response.data.$values;
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


  viewDetails(packageId: number): void {
    this.router.navigate(['/Admin/packageDetail', packageId]);
  }

  updatePackage(packageId: number): void {
    this.router.navigate(['/Admin/updatePackage', packageId]);
  }

  removePackage(packageId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this package!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.packageservice.deletePackage(packageId).subscribe(
          () => {
            if (this.packages) {
              this.packages = this.packages.filter((p) => p.id !== packageId);
              Swal.fire(
                'Deleted!',
                'Your package has been deleted.',
                'success'
              );
            }
          },
          (error) => {
            console.error('Error removing package:', error);
            Swal.fire(
              'Error!',
              'Failed to delete package. Please try again later.',
              'error'
            );
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your package is safe :)', 'info');
      }
    });
  }

  addPackage(): void {
    this.router.navigate(['/Admin/AddPackage']);
  }
}
