import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { ServicesService } from '../services/services.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PackagesService } from '../services/packages.service';
import { Package } from '../models/packages';

@Component({
  selector: 'app-packages',
  standalone: true,
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css', '../home/home.component.css'],
  providers: [
    PackagesService,
    NavbarComponent,
    FooterComponent,
    RouterLink,
    CommonModule,
    RouterModule,
  ],
  imports: [
    HttpClientModule,
    NavbarComponent,
    FooterComponent,
    RouterLink,
    CommonModule,
    RouterModule,
  ],
})
export class PackagesComponent implements OnInit {
  packages: Package[] | null = null;

  constructor(
    private packageService: PackagesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.packageService.getAll().subscribe({
      next: (response: any) => {
        this.packages = response.$values;
      },
    });
  }
  viewDetails(packageId: number): void {
    this.router.navigate(['/packageDetails', packageId]);
  }
}
