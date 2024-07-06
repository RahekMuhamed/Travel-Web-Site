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



  


}
