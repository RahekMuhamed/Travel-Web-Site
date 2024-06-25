import { Component, OnInit } from '@angular/core';
import { Services } from '../models/services';
import { ActivatedRoute, Router } from '@angular/router';
import { PackagesService } from '../services/packages.service';
import { ServicesService } from '../services/services.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
    selector: 'app-service-details',
    standalone: true,
    templateUrl: './service-details.component.html',
    styleUrl: './service-details.component.css',
    providers: [ServicesService],
    imports: [CommonModule, NavbarComponent, FooterComponent]
})
export class ServiceDetailsComponent implements OnInit{
  serviceId: number | undefined;
  serviceDetails: Services = new Services(
    0,
    '',
    1,
    '',
    '',
    undefined,
    10000,
    false
  );

  constructor(
    private route: ActivatedRoute,
    private serviceService: ServicesService,
    private router: Router
  ) {}

  // ngOnInit(): void {
  //   const id = this.route.snapshot.paramMap.get('id');
  //   if (id) {
  //     this.serviceService.getServiceById(+id).subscribe({
  //       next: (response: Services) => {
  //         this.serviceDetails = response;
  //       },
  //       error: (err) => {
  //         console.error('Error fetching service details', err);
  //       },
  //     });
  //   }
  // }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const idParam = params['id'];
      this.serviceId = Number(idParam);
      if (!Number.isFinite(this.serviceId)) {
        console.error('Invalid serviceId:', idParam);
        // Redirect to a default page or show an error message
      } else {
        this.fetchServiceDetails();
      }
    });
  }

  fetchServiceDetails(): void {
    this.serviceService.getServiceById(this.serviceId!).subscribe({
      next : (data: Services) => {
        this.serviceDetails = data;
      },
      error: (error) => console.error('Error fetching service details:', error),
    });
  }

  redirectToPackageList(): void {
    this.router.navigate(['/services']);
  }
}
