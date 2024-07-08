import { Component, OnInit } from '@angular/core';
import { Wishlist } from '../models/wishlist';
import { WishlistService } from '../services/wishlist.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Package } from '../models/packages';
import { SpinnerService } from '../services/spinner.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit {
 // wishlist: Package[] = [];

   wishlistPackages: any[] = [];
  loading: boolean = true;

  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.wishlistService.getWishlistPackages().subscribe(
      (data) => {
        this.wishlistPackages = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching wishlist packages', error);
        this.loading = false;
      }
    );
  }
  // loadWishlist(): void {
  //   this.wishlistService.fetchLikedPackages().subscribe((packages) => {
  //     this.wishlist = packages;
  //   });
  // }

//   removeFromWishlist(pack: Package): void {
//     this.wishlistService.removeFromWishlist(pack).subscribe(() => {
//       this.loadWishlist();
//     });
//   }
// }

}
