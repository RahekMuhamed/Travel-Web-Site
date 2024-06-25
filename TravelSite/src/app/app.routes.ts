
import { Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { BookingServiceComponent } from './booking-service/booking-service.component';
import { TravelServiceComponent } from './travel-service/travel-service.component';
import { PackagesComponent } from './packages/packages.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { PackageDetailsComponent } from './package-details/package-details.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'home',
  },
  { path: 'booking', component: BookingServiceComponent },
  { path: 'services', component: TravelServiceComponent },
  { path: 'packages', component: PackagesComponent },
  { path: 'serviceDetails/:id', component: ServiceDetailsComponent },
    { path: 'packageDetails/:id', component: PackageDetailsComponent },

  {
    path: 'SuperAdmin',
    loadChildren: () =>
      import('../../SuperAdmin/SuperAdmin.routes').then(
        (m) => m.SuperAdminroutes
      ),
  },
];
    


