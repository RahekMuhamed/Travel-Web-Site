import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

import { ApiServiceService } from '../services/api-service.service';
import { Service } from '../models/service.model';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Services } from '../models/services';
import { ServicesService } from '../services/services.service';
import { HttpClientModule } from '@angular/common/http';
import { TravelServiceComponent } from '../travel-service/travel-service.component';
import { Package } from '../models/packages';
import { PackagesService } from '../services/packages.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    CardModule,
    ButtonModule,
    CommonModule,
    RouterModule,
    HttpClientModule,
    TravelServiceComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [ServicesService,PackagesService],
})
export class HomeComponent {
  // services: Services[] | null = null;
  // constructor(private servicesService: ServicesService) {}
  // ngOnInit(): void {
  //   this.servicesService.getAll().subscribe({
  //     next: (response: any) => {
  //       this.services = response;
  //     },
  //     error: (err) => {
  //       console.error('Error fetching services', err);
  //     },
  //   });
  // }
  services: Services[] | null = null;
  packages: Package[] | null = null;
  constructor(private serviceservice: ServicesService, private packageService:PackagesService) {}
  ngOnInit(): void {
    this.serviceservice.getAll().subscribe({
      next: (response: any) => {
        this.services = response.$values;
      },
    });
    this.packageService.getAll().subscribe({
      next: (response: any) => {
        this.packages = response.$values;
      },
    });
  }
}
