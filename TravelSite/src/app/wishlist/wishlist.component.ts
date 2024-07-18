import { Component, OnInit } from '@angular/core';
import { Wishlist } from '../models/wishlist';
import { WishlistService } from '../services/wishlist.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Package } from '../models/packages';
import { PackagesService } from '../services/packages.service';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { Observable } from 'rxjs';
import { AuthServiceService } from '../services/auth-service.service';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { SelectItem } from 'primeng/api';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, FooterComponent,RouterLink,RouterModule],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css', '../home/home.component.css']
})
export class WishlistComponent implements OnInit {
  lovedPackages: Wishlist[] = [];
  packages: Package[] = [];

  wishlistPackageIds: number[] = [];
  sortOptions!: SelectItem[];

  sortOrder!: number;

  sortField!: string;

  isLoading = false;

  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalItems: number = 100;

  wishlist: Wishlist[] = [];
  isInWishlist: boolean = false;
  packageId: number = 1;

  wishlist$!: Observable<Wishlist[]>;

  constructor(
    private wishlistService: WishlistService,
    private packageService: PackagesService,

    private route: ActivatedRoute,
    private router: Router,

    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.wishlist$ = this.wishlistService.getWishlist();
    this.wishlist$.subscribe(
      (data) => console.log('Wishlist data:', data),
      (error) => console.error('Error fetching wishlist:', error)
    );
  }
  loadWishlist(): void {
    this.wishlistService.getWishlist().subscribe(
      (wishlist) => {
        this.packages.forEach((pkg) => {
          const wishlistItem = wishlist.find(
            (item) => item.packageId === pkg.id
          );
          if (wishlistItem) {
            pkg.isInWishlist = true;
            pkg.wishlistItemId = wishlistItem.id;
          } else {
            pkg.isInWishlist = false;
            pkg.wishlistItemId = null;
          }
        });
      },
      (error) => {
        console.error('Error loading wishlist:', error);
      }
    );
  }
  updatePackagesWishlistStatus(): void {
    this.packages.forEach((pkg) => {
      pkg.isInWishlist = this.wishlistPackageIds.includes(pkg.id);
    });
  }
  toggleWishlist(pkg: Package): void {
    if (pkg.isInWishlist) {
      // Remove from wishlist
      this.wishlistService.unlikePackage(pkg.wishlistItemId!).subscribe(
        () => {
          pkg.isInWishlist = false;
          pkg.wishlistItemId = null;
          console.log('Package removed from wishlist:', pkg);
        },
        (error) => {
          console.error('Error removing package from wishlist:', error);
        }
      );
    } else {
      // Add to wishlist
      this.wishlistService.likePackage(pkg).subscribe(
        (response) => {
          pkg.isInWishlist = true;
          pkg.wishlistItemId = response.id; // Assuming response contains the new wishlist item ID
          console.log('Package added to wishlist:', pkg);
        },
        (error) => {
          console.error('Error adding package to wishlist:', error);
        }
      );
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