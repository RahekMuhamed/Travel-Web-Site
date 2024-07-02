import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Package } from '../../src/app/models/packages';
import { PackagesService } from '../../src/app/services/packages.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-superpackage-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './superpackage-details.component.html',
  styleUrl: './superpackage-details.component.css'
})
export class SuperpackageDetailsComponent implements OnInit {
  packageId: number | undefined;
  packageDetails: Package = new Package(0, "", false, "", "", 0, 0);

  constructor(private route: ActivatedRoute, private packagesService: PackagesService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const idParam = params['id'];
      this.packageId = Number(idParam);
      if (!Number.isFinite(this.packageId)) {
        console.error('Invalid packageId:', idParam);
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
    this.router.navigate(['/SuperAdmin/Packagelist']);
  }


}
