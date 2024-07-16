import { Component, OnInit } from '@angular/core';
import { Wishlist } from '../models/wishlist';
import { WishlistService } from '../services/wishlist.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Package } from '../models/packages';
import { PackagesService } from '../services/packages.service';
@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit {
  lovedPackages: Package[] = [];

  constructor(
    private packagesService: PackagesService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    // this.wishlistService.getLovedPackages().subscribe(
    //   (packages) => {
    //     this.lovedPackages = packages;
    //   },
    //   (error) => {
    //     console.error('Error fetching loved packages:', error);
    //   }
    // );
  }

  
}
