
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { CommonModule } from '@angular/common';
import { Package } from '../models/packages';
import { PackagesService } from '../services/packages.service';
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
    selector: 'app-package-details',
    standalone: true,
    templateUrl: './package-details.component.html',
    styleUrl: './package-details.component.css',
    imports: [CommonModule, FooterComponent, NavbarComponent,RouterLink]
})
export class PackageDetailsComponent implements OnInit {
  packageId: number | undefined;
  packageDetails: Package = new Package(0, '', false, '', '', 0, 0);

  constructor(
    private route: ActivatedRoute,
    private packagesService: PackagesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const idParam = params['id'];
      this.packageId = Number(idParam);
      if (!Number.isFinite(this.packageId)) {
        console.error('Invalid packageId:', idParam);
        // Redirect to a default page or show an error message
      } else {
        this.fetchPackageDetails();
      }
    });
  }

  fetchPackageDetails(): void {
    this.packagesService.getPackageById(this.packageId!).subscribe({
      next: (data: Package) => {
        this.packageDetails = data;
      },
      error: (error) => console.error('Error fetching package details:', error),
    });
  }

  redirectToPackageList(): void {
    this.router.navigate(['/Admin/Packagelist']);
  }

 
}
