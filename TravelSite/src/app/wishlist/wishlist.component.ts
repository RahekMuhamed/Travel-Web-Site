import { Component } from '@angular/core';
import { Favorite } from '../models/favorite';
import {FavoriteService} from '../services/favorite.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent {
  favorites: Favorite[] = [];
  newFavorite: Partial<Favorite> = {}; // Adjust based on your form inputs
  constructor(private favoritesService: FavoriteService) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.favoritesService.getFavorites().subscribe(
      (data) => {
        this.favorites = data;
      },
      (error) => {
        console.error('Error fetching favorites', error);
      }
    );
  }

  addFavorite(): void {
    this.favoritesService.addFavorite(this.newFavorite as Favorite).subscribe(
      (data) => {
        this.favorites.push(data);
      },
      (error) => {
        console.error('Error adding favorite', error);
      }
    );
  }
}
