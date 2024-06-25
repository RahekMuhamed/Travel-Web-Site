import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { Services } from '../models/services';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
    selector: 'app-travel-service',
    standalone: true,
    templateUrl: './travel-service.component.html',
    styleUrl: './travel-service.component.css',
    providers: [
        ServicesService,
        NavbarComponent,
        FooterComponent,
        RouterLink,
        CommonModule,
        RouterModule,
    ],
    imports: [HttpClientModule, NavbarComponent, FooterComponent]
})
export class TravelServiceComponent implements OnInit {
  services: Services[] | null = null;

  constructor(private servicesService: ServicesService) {}

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
  ngOnInit(): void {
    this.servicesService.getAll().subscribe({
      next: (response: any) => {
        this.services = response.$values;
      },
    });
  }
}
