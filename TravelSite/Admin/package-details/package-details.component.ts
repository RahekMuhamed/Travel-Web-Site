import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PackagesService } from '../../src/app/services/packages.service';
import { Package } from '../../src/app/models/packages';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-package-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './package-details.component.html',
  styleUrls: ['./package-details.component.css']
})
export class PackageDetailsComponent implements OnInit {
  packageId: number | undefined;
  packageDetails: Package = new Package(0, "", false, "", "", 0, 0);

  constructor(private route: ActivatedRoute, private packagesService: PackagesService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
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
      error: (error) => console.error('Error fetching package details:', error)
    });
  }

  redirectToPackageList(): void {
    this.router.navigate(['/Admin/Packagelist']);
  }

  redirectToEditPackage(): void {
    this.router.navigate(['/Admin/EditPackage', this.packageId]);
  }
}
