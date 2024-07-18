
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Package } from '../models/packages';
import { PackagesService } from '../services/packages.service';
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { DividerModule } from 'primeng/divider';
import { AuthServiceService } from '../services/auth-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-package-details',
  standalone: true,
  templateUrl: './package-details.component.html',
  styleUrl: './package-details.component.css',
  imports: [
    CommonModule,
    FooterComponent,
    NavbarComponent,
    RouterLink,
    DividerModule,
  ],
})
export class ClientPackageDetailsComponent implements OnInit {
  packageId: number | undefined;
  packageDetails: Package = new Package(0, '', 0, false, 0, 0, [],"","",'');

  constructor(
    private route: ActivatedRoute,
    private packagesService: PackagesService,
    private router: Router,
    private authService:AuthServiceService
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
  


  getServiceNamesIds(packageItem: any): number[] {
    if (packageItem.serviceNames && packageItem.serviceNames.$values) {
      return packageItem.serviceNames.$values.map((service: any) => service.id);
    }
    return [];
  }

  redirectToPackageList(): void {
    this.router.navigate(['/Admin/Packagelist']);
  }
   bookPackage(packageId: number): void {
    if (this.authService.isAuthenticated()) {
      const clientId = this.authService.getUserIdFromToken();
      if (clientId) {
        this.router.navigate(['/communicationData'], { queryParams: { packageId: packageId, clientId: clientId } });
      } else {
        console.error('Client ID not found.');
      }
    } else {
      Swal.fire({
      title: 'Not Logged In',
      text: 'You need to log in to book a package. Do you want to log in now?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, log in',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/login']);
      }
    });
    }
     
  }
}
