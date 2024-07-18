import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { ServicesService } from '../services/services.service';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PackagesService } from '../services/packages.service';
import { Package } from '../models/packages';
import { AuthServiceService } from '../services/auth-service.service';
import Swal from 'sweetalert2';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ButtonModule } from 'primeng/button';
import { SelectItem } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WishlistService } from '../services/wishlist.service';
import { Category } from '../models/category';
import { PickListModule } from 'primeng/picklist';
import { OrderListModule } from 'primeng/orderlist';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { DecodedToken } from '../models/decoded-token';
import { jwtDecode } from 'jwt-decode';
import { HomeComponent } from '../home/home.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
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
    SpinnerComponent,
    FormsModule,
    DataViewModule,
    ButtonModule,
    TagModule,
    DropdownModule,
    ReactiveFormsModule,
    PickListModule,
    OrderListModule,
    InputTextModule,
    RatingModule,
    OrderListModule
  ],
})
export class PackagesComponent implements OnInit {
  packages: Package[] = [];
  searchText!: string;

  wishlistPackageIds: number[] = [];
  sortOptions!: SelectItem[];

  sortOrder!: number;

  sortField!: string;

  isLoading = false;

  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalItems: number = 100;

  wishlist: number[] = [];
  isInWishlist: boolean = false;
  packageId: number = 1;
  searchTerm: string = '';
  constructor(
    private packageService: PackagesService,

    private route: ActivatedRoute,
    private router: Router,
    private wishlistService: WishlistService,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.packageService.loading$.subscribe(
      (isLoading) => (this.isLoading = isLoading)
    );

    this.loadData(this.currentPage, this.itemsPerPage);
    this.loadWishlist();

    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' },
    ];
  }
  loadWishlist(): void {
    this.wishlistService.getWishlist().subscribe(
      (wishlist) => {
        this.wishlistPackageIds = wishlist.map((item) => item.packageId);
        this.updatePackagesWishlistStatus();
      },
      (error) => {
        console.error('Error loading wishlist:', error);
      }
    );
  }

  loadData(
    page: number = this.currentPage,
    pageSize: number = this.itemsPerPage
  ): void {
    this.packageService.getAllpag(page, pageSize).subscribe(
      (response) => {
        //
        this.packages = response.data.$values;
        this.totalItems = response.totalCount;
        this.currentPage = response.pageNumber;
        this.itemsPerPage = response.pageSize;
        this.updatePackagesWishlistStatus();
      },
      (error) => {
        console.error('Error loading data:', error);
      }
    );
  }
  updatePackagesWishlistStatus(): void {
    this.packages.forEach((pkg) => {
      pkg.isInWishlist = this.wishlistPackageIds.includes(pkg.id);
    });
  }

  toggleWishlist(item: Package): void {
    if (item.isInWishlist) {
      // Remove from wishlist
      if (item.wishlistItemId) {
        this.wishlistService
          .unlikePackage(item.wishlistItemId, item.id)
          .subscribe(
            () => {
              item.isInWishlist = false;
              item.wishlistItemId = null;
              this.removeFromWishlist(item.id); // Update local wishlist tracking
              console.log('Package removed from wishlist:', item);
            },
            (error) => {
              console.error('Error removing package from wishlist:', error);
            }
          );
      }
    } else {
      // Add to wishlist
      this.wishlistService.likePackage(item).subscribe(
        (response) => {
          item.isInWishlist = true;
          item.wishlistItemId = response.id; // Assuming response contains the new wishlist item ID
          this.addToWishlist(item.id); // Update local wishlist tracking
          console.log('Package added to wishlist:', item);
        },
        (error) => {
          console.error('Error adding package to wishlist:', error);
        }
      );
    }
  }

  private addToWishlist(packageId: number): void {
    this.wishlistPackageIds.push(packageId);
    // this.updatePackagesWishlistStatus();
  }

  private removeFromWishlist(packageId: number): void {
    const index = this.wishlistPackageIds.indexOf(packageId);
    if (index !== -1) {
      this.wishlistPackageIds.splice(index, 1);
      // this.updatePackagesWishlistStatus();
    }
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
  // onFilter(dv: DataView, event: Event) {
  //    dv.filter((event.target as HTMLInputElement).value);
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

  booking(packageId: number): void {
    if (this.authService.isAuthenticated()) {
      const clientId = this.authService.getUserIdFromToken();
      if (clientId) {
        this.router.navigate(['/communicationData'], {
          queryParams: { packageId: packageId, clientId: clientId },
        });
      } else {
        console.error('Client ID not found.');
      }
    } else {
      Swal.fire({
        title: 'Not Logged In',
        text: 'You need to log in to book a package. Do you want to log in now?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, log in',
        cancelButtonText: 'No, cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/login']);
        }
      });
    }
  }
  bookPackage(packageId: number): void {
    if (this.authService.isAuthenticated()) {
      const clientId = this.authService.getUserIdFromToken();
      if (clientId) {
        this.router.navigate(['/communicationData'], {
          queryParams: { packageId: packageId, clientId: clientId },
        });
      } else {
        console.error('Client ID not found.');
      }
    } else {
      Swal.fire({
        title: 'Not Logged In',
        text: 'You need to log in to book a package. Do you want to log in now?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, log in',
        cancelButtonText: 'No, cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/login']);
        }
      });
    }
  }
}


  // viewDetails(packageId: number): void {
  //   this.router.navigate(['/packageDetails', packageId]);
  // }

