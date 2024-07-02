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
  constructor(
    private packageservice: PackagesService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.packageservice.getAll().subscribe({
      next: (response: any) => {
        this.packages = response.$values;
      },
    });
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
