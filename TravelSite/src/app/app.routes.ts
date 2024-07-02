
import { Routes } from '@angular/router';
//import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { BookingServiceComponent } from './booking-service/booking-service.component';
import { TravelServiceComponent } from './travel-service/travel-service.component';
import { PackagesComponent } from './packages/packages.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { PackageDetailsComponent } from './package-details/package-details.component';
import { Component } from '@angular/core';
import { PaymentComponent } from './payment/payment.component';
import { AddBookingPackageComponent } from './BookingPackage/add-booking-package/add-booking-package.component';
import { GetAllBookingPackageComponent } from './BookingPackage/get-all-booking-package/get-all-booking-package.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    title: 'home',
  },
  { path: 'booking', component: BookingServiceComponent },
  { path: 'services', component: TravelServiceComponent },
  { path: 'packages', component: PackagesComponent },
  { path: 'serviceDetails/:id', component: ServiceDetailsComponent },
  { path: 'serviceDetails/:id', component: PackageDetailsComponent },
  {
    path: 'SuperAdmin',
    loadChildren: () =>
      import('../../SuperAdmin/SuperAdmin.routes').then(
        (m) => m.SuperAdminroutes
      ),
    },
    {
        path: "payment",
        component: PaymentComponent,
        title:"checkout"
    },
  { path: "AddBookingPackage", component: AddBookingPackageComponent, title: "Booking Package" },
  { path: "GetAllPackageBooking", component: GetAllBookingPackageComponent, title: "All Booking" },
  { path: "SignUp", component: SignUpComponent, title: "Register" },
    {path:"login" ,component:LoginComponent,title:"login"},
      {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
    

