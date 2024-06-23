import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

import { ApiServiceService } from '../services/api-service.service';
import { Service } from '../models/service.model';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
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
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  services: Service[] = [];

  constructor(private apiService: ApiServiceService) {}

  ngOnInit(): void {
    // this.apiService.getServices().subscribe((data) => {
    //   this.services = data;
    // });
  }
}
