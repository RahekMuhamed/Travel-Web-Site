import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { Services } from '../models/services';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { PaginationComponent } from "../pagination/pagination.component";

@Component({
  selector: 'app-travel-service',
  standalone: true,
  templateUrl: './travel-service.component.html',
  styleUrls: ['./travel-service.component.css', '../home/home.component.css'],
  providers: [ServicesService,HttpClientModule],
  imports: [
    HttpClientModule,
    NavbarComponent,
    FooterComponent,
    RouterLink,
    CommonModule,
    RouterModule,
    PaginationComponent,
  ],
})
export class TravelServiceComponent implements OnInit {
  services: any[] = [];


  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 100;

  constructor(
    private servicesService: ServicesService,
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
    this.servicesService.getAll(page, pageSize).subscribe(
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

  // onPageSizeChange(event: Event): void {
  //   const target = event.target as HTMLSelectElement;
  //   const size = target.value;

  //   if (size) {
  //     this.pageSize = Number(size);
  //     this.currentPage = 1; // Reset to first page on page size change
  //     this.updateRoute();
  //     this.loadData(this.currentPage, this.pageSize);
  //   } else {
  //     console.error('Page size is null or undefined');
  //   }
  // }

  // private updateRoute(): void {
  //   this.router.navigate([], {
  //     relativeTo: this.route,
  //     queryParams: { page: this.currentPage, pageSize: this.pageSize },
  //     queryParamsHandling: 'merge',
  //   });
  // }
  // onPageSizeChange(size: string | null | undefined): void {
  //   if (size) {
  //     this.pageSize = Number(size);
  //     this.loadData(this.currentPage, this.pageSize);
  //   } else {
  //     // Handle the case where size is null or undefined
  //     console.error('Page size is null or undefined');
  //   }
  // }

  // constructor(
  //   private servicesService: ServicesService,
  //   private router: Router
  // ) {}

  // ngOnInit(): void {
  //   this.servicesService.getAll().subscribe({
  //     next: (response: Services[]) => {
  //       this.services = response;
  //     },
  //     error: (err) => {
  //       console.error('Error fetching services', err);
  //     },
  //   });
  // }

  // viewDetails(serviceId: number): void {
  //   this.router.navigate(['/serviceDetails', serviceId]);
  // }
}
