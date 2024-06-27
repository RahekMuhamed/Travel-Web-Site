import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { PaymentComponent } from './payment/payment.component';
import { AddBookingPackageComponent } from './BookingPackage/add-booking-package/add-booking-package.component';

export const routes: Routes = [
    // /payment
    { path: "payment", component: PaymentComponent },
    { path: "AddBookingPackage", component: AddBookingPackageComponent,title:"Booking Package"},
    { path: "", redirectTo: "/payment", pathMatch: "full" } 
];
