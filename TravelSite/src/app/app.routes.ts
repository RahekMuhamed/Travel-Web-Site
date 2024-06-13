import { Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path:'', redirectTo: 'search', pathMatch:'full'
  },
  {
    path:'home', component:HomeComponent, title:'home'
  }
];
