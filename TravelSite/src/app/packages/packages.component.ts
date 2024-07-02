import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { ServicesService } from '../services/services.service';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PackagesService } from '../services/packages.service';
import { Package } from '../models/packages';

@Component({
  selector: 'app-packages',
  standalone: true,
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css', '../home/home.component.css'],
  providers: [PackagesService, HttpClientModule],
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
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 100;
  constructor(
    private packageService: PackagesService,

    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData(this.currentPage, this.itemsPerPage);
  }
  loadData(
    page: number = this.currentPage,
    pageSize: number = this.itemsPerPage
  ): void {
    this.packageService.getAll(page, pageSize).subscribe(
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
  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadData(page, this.itemsPerPage);
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }
  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadData();
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalItems) {
      this.currentPage++;
      this.loadData();
    }
  }

  goToPage(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const page = target.value;
    const pageNumber = parseInt(page, 10);
    if (
      pageNumber &&
      pageNumber >= 1 &&
      pageNumber <= this.totalItems &&
      pageNumber !== this.currentPage
    ) {
      this.currentPage = pageNumber;
      this.loadData();
    }
  }
  get pageNumbers(): number[] {
    return Array.from({ length: this.totalItems }, (_, index) => index + 1);
  }
  trackByFn(index: number, item: any): any {
    return item.id; // Replace "id" with the unique identifier of your data item
  }

  // viewDetails(packageId: number): void {
  //   this.router.navigate(['/packageDetails', packageId]);
  // }
}
