import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Services } from '../models/services';
import { ServicesService } from '../services/services.service';
import { HttpClientModule } from '@angular/common/http';
import { TravelServiceComponent } from '../travel-service/travel-service.component';
import { Package } from '../models/packages';
import { PackagesService } from '../services/packages.service';
import { AuthServiceService } from '../services/auth-service.service';
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
  providers: [ServicesService, PackagesService],
})
export class HomeComponent {
  services: Services[] | null = null;
  packages: Package[] | null = null;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 100;
  constructor(
    private serviceservice: ServicesService,
    private packageService: PackagesService,
    public router: Router,
    public authService: AuthServiceService
  ) { }
  ngOnInit(): void {


    this.loadServiceData(this.currentPage, this.itemsPerPage);
    this.loadPackageData(this.currentPage, this.itemsPerPage);
    // this.serviceservice.getAll().subscribe({
    //   next: (response: Services[]) => {
    //     this.services = response;
    //   },
    //   error: (err) => {
    //     console.error('Error fetching services', err);
    //   },
    // });
    // this.packageService.getAll().subscribe({
    //   next: (response: Package[]) => {
    //     this.packages = response;
    //   },
    //   error: (err) => {
    //     console.error('Error fetching packages', err);
    //   },
    // });
  }
  loadServiceData(
    page: number = this.currentPage,
    pageSize: number = this.itemsPerPage
  ): void {
    this.serviceservice.getAllpag(page, pageSize).subscribe(
      (response) => {
        //
        this.services = response.data.$values;
        this.totalItems = response.totalCount;
        this.currentPage = response.pageNumber;
        this.itemsPerPage = response.pageSize; // Assuming the response contains the total number of pages
      },
      (error) => {
        console.error('Error loading data:', error);
      }
    );
  }
  loadPackageData(
    page: number = this.currentPage,
    pageSize: number = this.itemsPerPage
  ): void {
    this.packageService.getAllpag(page, pageSize).subscribe(
      (response) => {
        //
        this.packages = response.data.$values;
        this.totalItems = response.totalCount;
        this.currentPage = response.pageNumber;
        this.itemsPerPage = response.pageSize; // Assuming the response contains the total number of pages
      },
      (error) => {
        console.error('Error loading data:', error);
      }
    );
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
      this.router.navigate(['/login']);
    }
  }
  bookPackage(packageId: number): void {
    if (this.authService.isAuthenticated()) {
      const clientId = this.authService.getUserIdFromToken();
      if (clientId) {
        this.router.navigate(['/AddBookingPackage'], { queryParams: { packageId: packageId, clientId: clientId } });
      } else {
        console.error('Client ID not found.');
      }
    } else {
      this.router.navigate(['/login']);
    }
     
  }
}