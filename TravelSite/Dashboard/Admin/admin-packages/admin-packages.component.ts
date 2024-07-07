import { Component, OnInit } from '@angular/core';
import { Package } from '../../../src/app/models/packages';
import { PackagesService } from '../../../src/app/services/packages.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { SearchBarComponent } from '../../search-bar/search-bar.component';
import { PaginationService } from '../../../src/app/services/pagination.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-packages',
  standalone: true,
  imports: [CommonModule, RouterModule, SearchBarComponent,FormsModule],
  templateUrl: './admin-packages.component.html',
  styleUrls: ['./admin-packages.component.css']
})
export class AdminPackagesComponent implements OnInit {
  packages: Package[] = [];
  filteredPackages: Package[] = [];
  paginatedPackages: Package[] = [];
  rowsPerPage: number = 10;
  currentPage: number = 1;
  pageSizes: number[] = [5, 10, 20, 50];

  constructor(
    private packageservice: PackagesService,
    private router: Router,
    private paginationService: PaginationService
  ) {}

  ngOnInit(): void {
    this.packageservice.getAll().subscribe({
      next: (response: any) => {
        this.packages = response.$values;
        this.filteredPackages = response.$values;
      },
      error: (error) => {
        console.error('Error fetching packages:', error);
      }
    });
      

  }
   

  viewDetails(packageId: number): void {
    this.router.navigate(['/profile/packageDetail', packageId]);
  }

  updatePackage(packageId: number): void {
    this.router.navigate(['/profile/updatePackage', packageId]);
  }

  removePackage(packageId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this package!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.packageservice.deletePackage(packageId).subscribe(
          () => {
            this.packages = this.packages.filter((p) => p.id !== packageId);
            this.filteredPackages = this.filteredPackages.filter((p) => p.id !== packageId);
            Swal.fire('Deleted!', 'Your package has been deleted.', 'success');
          },
          (error) => {
            console.error('Error removing package:', error);
            Swal.fire('Error!', 'Failed to delete package. Please try again later.', 'error');
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your package is safe :)', 'info');
      }
    });
  }

  addPackage(): void {
    this.router.navigate(['/profile/AddPackage']);
  }
  onRowsPerPageChange(event: Event): void {
    this.rowsPerPage = +(event.target as HTMLSelectElement).value;
    this.updatePaginatedPackages();
  }

  updatePaginatedPackages(): void {
    this.paginatedPackages = this.paginationService.getPaginatedItems(this.filteredPackages, this.currentPage, this.rowsPerPage);
  }

  onSearch(query: string): void {
    this.filteredPackages = this.packages.filter(pkg =>
      pkg.name.toLowerCase().includes(query.toLowerCase())
    );
    this.currentPage = 1;
    this.updatePaginatedPackages();
  }


}
