import { Component, OnInit } from '@angular/core';
import { Services } from '../../../src/app/models/services';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ServicesService } from '../../../src/app/services/services.service';
@Component({
  selector: 'app-superservice-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './superservice-details.component.html',
  styleUrl: './superservice-details.component.css'
})
export class SuperserviceDetailsComponent implements OnInit {
  serviceId: number | undefined;
  serviceDetails: Services = new Services(0, '', 0, '', '');

  constructor(
    private route: ActivatedRoute,
    private servicesService: ServicesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const idParam = params['id'];
      this.serviceId = Number(idParam);
      if (!Number.isFinite(this.serviceId)) {
        console.error('Invalid serviceId:', idParam);
      } else {
        this.fetchserviceDetails();
      }
    });
  }

  fetchserviceDetails(): void {
    this.servicesService.getserviceById(this.serviceId!).subscribe({
      next: (data: Services) => {
        this.serviceDetails = data;
      },
      error: (error) => console.error('Error fetching service details:', error),
    });
  }

  redirectToserviceList(): void {
    this.router.navigate(['/Admin/superservicelist']);
  }

}
