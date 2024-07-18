import { Component, OnInit } from '@angular/core';
import { Services } from '../models/services';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PackagesService } from '../services/packages.service';
import { ServicesService } from '../services/services.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import Swal from 'sweetalert2';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
    selector: 'app-service-details',
    standalone: true,
    templateUrl: './service-details.component.html',
    styleUrl: './service-details.component.css',
    providers: [ServicesService],
    imports: [CommonModule, NavbarComponent, FooterComponent,RouterLink,CommonModule]
})
export class ClientServiceDetailsComponent implements OnInit{
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
    private router: Router,
    private authService:AuthServiceService
  ) {}

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
    this.serviceService.getserviceById(this.serviceId!).subscribe({
      next : (data: Services) => {
        this.serviceDetails = data;
      },
      error: (error) => console.error('Error fetching service details:', error),
    });
  }

  redirectToPackageList(): void {
    this.router.navigate(['/services']);
  }

   bookservice(serviceId: number): void {
    if (this.authService.isAuthenticated()) {
      const clientId = this.authService.getUserIdFromToken();
      if (clientId) {
        this.router.navigate(['/AddBookingService'], { queryParams: { serviceId: serviceId, clientId: clientId } });
      } else {
        console.error('Client ID not found.');
      }
    } else {
        Swal.fire({
        title: 'Not Logged In',
        text: 'You need to log in to book a Service. Do you want to log in now?',
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
