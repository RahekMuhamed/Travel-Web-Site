import { Component, OnInit } from '@angular/core';
import { Package } from '../../../src/app/models/packages';
import { PackagesService } from '../../../src/app/services/packages.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-packages-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './packages-list.component.html',
  styleUrl: './packages-list.component.css',
})
export class PackagesListComponent implements OnInit {
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
    this.router.navigate(['/SuperAdmin/packageDetail', packageId]);
  }
}
