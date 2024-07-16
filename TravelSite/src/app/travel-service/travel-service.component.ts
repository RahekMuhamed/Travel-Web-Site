import { Component, Input, NgModule, OnChanges, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { Services } from '../models/services';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { PaginationComponent } from "../pagination/pagination.component";
import { AuthServiceService } from '../services/auth-service.service';
import Swal from 'sweetalert2';
import { CategoryService } from '../services/category.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { FavoriteService } from '../services/favorite.service';
import { SelectItem } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { CategoryDropdownComponent } from '../category-dropdown/category-dropdown.component';

@Component({
  selector: 'app-travel-service',
  standalone: true,
  templateUrl: './travel-service.component.html',
  styleUrls: ['./travel-service.component.css', '../home/home.component.css'],
  providers: [ServicesService, HttpClientModule, CategoryService],
  imports: [
    DataViewModule,
    ButtonModule,
    TagModule,
    CommonModule,
    DropdownModule,
    ReactiveFormsModule,
    DropdownModule,
    HttpClientModule,
    NavbarComponent,
    FooterComponent,
    RouterLink,
    CommonModule,
    RouterModule,
    PaginationComponent,
    SpinnerComponent,
    FormsModule,
    CategoryDropdownComponent,

  ],
})
export class TravelServiceComponent implements OnInit {
  services: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 100;
  sortOrder: number | undefined;
  sortField: any;
  categoryId: any;
  selectedCategoryId: string | undefined;
  isLoading: any;
  sortOptions: { label: string; value: string; }[] | undefined;

  constructor(
    private servicesService: ServicesService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthServiceService

  ) { }

  ngOnInit(): void {
    this.servicesService.loading$.subscribe(
      (isLoading: any) => (this.isLoading = isLoading)
    );
    this.loadData(this.currentPage, this.itemsPerPage);

    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' },
    ];
  }

  loadData(
    page: number = this.currentPage,
    pageSize: number = this.itemsPerPage
  ): void {
    this.servicesService.getAllpag(page, pageSize).subscribe(
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
  
    this.servicesService.getAllHotels(page, pageSize).subscribe(
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
  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }
  /*
ngOnChanges(): void {
    if (this.categoryId) {
      this.servicesService
        .getServicesByCategory(this.categoryId)
        .subscribe((data: any[]) => {
          this.services = data;
        });
    }
  }*/

  onCategorySelected(categoryId: string): void {
    this.selectedCategoryId = categoryId;
  }

  // loadCategories(): void {
  //   this.categoryService.getCategories().subscribe((data) => {
  //     this.categories = data;
  //   });
  // }
  // }


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

  booking(serviceId: number): void {
    if (this.authService.isAuthenticated()) {
      const clientId = this.authService.getUserIdFromToken();
      if (clientId) {
        this.router.navigate(['/AddBookingService'], { queryParams: { serviceId: serviceId, clientId: clientId } });
      } else {
        console.error('Client ID not found.');
      }
    } 
    else {
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

