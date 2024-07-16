
/*import { NavbarComponent } from './navbar/navbar.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AddServiceProviderComponent } from '../../Dashboard/SuperAdmin/add-service-provider/add-service-provider.component';
import { EditServiceProviderComponent } from '../../Dashboard/SuperAdmin/edit-service-provider/edit-service-provider.component';
import { ServiceProviderDetailComponent } from '../../Dashboard/SuperAdmin/service-provider-detail/service-provider-detail.component';
import { PackageDetailsComponent } from '../../Dashboard/Admin/package-details/package-details.component';
import { AddAdminComponent } from '../../Dashboard/SuperAdmin/add-admin/add-admin.component';
import { ServiceProviderlistComponent } from '../../Dashboard/SuperAdmin/service-providerlist/service-providerlist.component';
import { CustomersListComponent } from '../../Dashboard/SuperAdmin/customers-list/customers-list.component';
import { AdminsListComponent } from '../../Dashboard/SuperAdmin/admins-list/admins-list.component';
import { ServiceDetailsComponent } from '../../Dashboard/Admin/service-details/service-details.component';
import { SuperpackageDetailsComponent } from '../../Dashboard/SuperAdmin/superpackage-details/superpackage-details.component';
import { PackagesListComponent } from '../../Dashboard/SuperAdmin/SuperPackages-list/packages-list.component';
import { SuperserviceDetailsComponent } from '../../Dashboard/SuperAdmin/superservice-details/superservice-details.component';
import { AdminPackagesComponent } from '../../Dashboard/Admin/admin-packages/admin-packages.component';
import { AdminServicesComponent } from '../../Dashboard/Admin/admin-services/admin-services.component';
import { EditUserInfoComponent } from '../../Dashboard/edit-user-info/edit-user-info.component';
import { UserInfoComponent } from '../../Dashboard/user-info/user-info.component';
import { AdminLayoutComponent } from '../../Dashboard/layout/admin-layout.component';
import { SignUpComponent } from '../../Authenticaion/sign-up/sign-up.component';
import { LoginComponent } from '../../Authenticaion/login/login.component';
import { TravelServiceComponent } from '../travel-service/travel-service.component';
import { ServicesListComponent } from '../../Dashboard/SuperAdmin/SuperServices-list/services-list.component';
import { PackagesComponent } from './packages/packages.component';
import { AddServiceComponent } from '../../Dashboard/Admin/add-service/add-service.component';
import { EditServiceComponent } from '../../Dashboard/Admin/edit-service/edit-service.component';
import { EditPackageComponent } from '../../Dashboard/Admin/edit-package/edit-package.component';
import { AddPackageComponent } from '../../Dashboard/Admin/add-package/add-package.component';
import { ForgetPasswordComponent } from '../../Authenticaion/forget-password/forget-password.component';
import { ChangePasswordComponent } from '../../Dashboard/change-password/change-password.component';
import { UnauthorizedComponent } from '../../Authenticaion/unauthorized/unauthorized.component';


export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    title: 'home',
    },
     { path: '', redirectTo: '/login', pathMatch: 'full' },
     { path: 'services', component: TravelServiceComponent },
     { path: 'packages', component: PackagesComponent },

  { path: 'serviceDetails/:id', component: ServiceDetailsComponent },
  { path: 'serviceDetails/:id', component: PackageDetailsComponent },
  /*{
    path: 'SuperAdmin',
    loadChildren: () =>
      import('../../SuperAdmin/SuperAdmin.routes').then(
        (m) => m.SuperAdminroutes
      ),
    },*//*
    {
        path: "payment",
        component: PaymentComponent,
        title:"checkout"
  },
  { path:"ServicePayment", component: ServicePaymentComponent, title: "Hotels Checkout" },
  { path:"AddBookingPackage", component: AddBookingPackageComponent, title: "Booking Package" },
  {path:"AddBookingService" ,component:AddBookingServiceComponent , title :"Booking Hotel"},
  { path:"GetAllPackageBooking", component: GetAllBookingPackageComponent, title: "All Booking" },
  {path :"BookingDetails/:id",component:BookingDetailsComponent ,title:"Booking Package"},
  { path:"SignUp", component: SignUpComponent, title: "Register" },
  {path:"login" ,component:LoginComponent,title:"login"},
      {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  { path: 'SuperAdmin/Packagelist', component: PackagesListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'forgetpassword', component: ForgetPasswordComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  {
    path: 'profile',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'userinfo',
        component: UserInfoComponent,
        canActivate: [AuthGuardService],
        data: { roles: ['customerService', 'client', 'admin', 'superAdmin'] },
      },
      {
        path: 'changePassword',
        component: ChangePasswordComponent,
        canActivate: [AuthGuardService],
        data: { roles: ['customerService', 'client', 'admin', 'superAdmin'] },
      },
      {
        path: 'EditUserInfo',
        component: EditUserInfoComponent,
        canActivate: [AuthGuardService],
        data: { roles: ['customerService', 'client', 'admin', 'superAdmin'] },
      },
      {
        path: 'servicelist',
        component: AdminServicesComponent,
        canActivate: [AuthGuardService],
        data: { roles: ['admin'] },
      },
      {
        path: 'serviceDetail/:id',
        component: ServiceDetailsComponent,
        canActivate: [AuthGuardService],
        data: { roles: ['admin'] },
      },
      {
        path: 'AddService',
        component: AddServiceComponent,
        canActivate: [AuthGuardService],
        data: { roles: ['admin'] },
      },
      {
        path: 'Packagelist',
        component: AdminPackagesComponent,

        canActivate: [AuthGuardService],
        data: { roles: ['admin'] },
      },
      {
        path: 'AddService',
        component: AddServiceComponent,
        canActivate: [AuthGuardService],
        data: { roles: ['admin'] },
      },
      {
        path: 'Packagelist',
        component: AdminPackagesComponent,
        canActivate: [AuthGuardService],
        data: { roles: ['admin'] },
      },

{
        path: 'packageDetail/:id',
        component: PackageDetailsComponent,
        canActivate: [AuthGuardService],
        data: { roles: ['admin'] },
      },
        path: 'AddPackage',
        component:AddPackageComponent,
        canActivate: [AuthGuardService],
        data: { roles: ['admin'] },
      },
      {
        path: 'superpackageDetail/:id',
        component: SuperpackageDetailsComponent,
        canActivate: [AuthGuardService],
        data: { roles: ['admin'] },
      },
      {
        path: 'updatePackage/:id',
        component: EditPackageComponent,
        canActivate: [AuthGuardService],
        data: { roles: ['admin'] },
      },
      {
        path: 'AddPackage',
        component: AddPackageComponent,
        canActivate: [AuthGuardService],
        data: { roles: ['admin'] },
      },
      {
        path: 'adminslist',
        component: AdminsListComponent,
        canActivate: [AuthGuardService],
        data: { roles: ['superAdmin'] },
      },
      {
        path: 'Customers',
        component: CustomersListComponent,
        canActivate: [AuthGuardService],
        data: { roles: ['superAdmin'] },
      },
      {
        path: 'ServiceProvider',
        component: ServiceProviderlistComponent,
        canActivate: [AuthGuardService],
        data: { roles: ['superAdmin'] },
      },
      {
        path: 'AddAdmin',
        component: AddAdminComponent,
        canActivate: [AuthGuardService],
        data: { roles: ['superAdmin'] },
      },

      {
        path: 'ServiceProviderDetail/:id',
        component: ServiceProviderDetailComponent,
        canActivate: [AuthGuardService],
        data: { roles: ['superAdmin'] },
      },
      {
        path: 'updateServiceProvider/:id',
        component: EditServiceProviderComponent,
        canActivate: [AuthGuardService],
        data: { roles: ['superAdmin'] },
      },
      {
        path: 'AddServiceProvider',
        component: AddServiceProviderComponent,
        canActivate: [AuthGuardService],
        data: { roles: ['superAdmin'] },
      },
      {
        path: 'superservicelist',
        component: ServicesListComponent ,
        canActivate: [AuthGuardService],
        data: { roles: ['superAdmin'] },
      },
      {
        path: 'serviceDetail/:id',
        component: SuperserviceDetailsComponent,
        canActivate: [AuthGuardService],
        data: { roles: ['superAdmin'] },
      },
      {
        path: 'superPackagelist',
        component: PackagesListComponent,
        canActivate: [AuthGuardService],
        data: { roles: ['superAdmin'] },
      },
      {
        path: 'superpackageDetail/:id',
        component: SuperpackageDetailsComponent,
        canActivate: [AuthGuardService],
        data: { roles: ['superAdmin'] },
      },
    ],
  },
];

*/

import { NavbarComponent } from './navbar/navbar.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AddServiceProviderComponent } from '../../Dashboard/SuperAdmin/add-service-provider/add-service-provider.component';
import { EditServiceProviderComponent } from '../../Dashboard/SuperAdmin/edit-service-provider/edit-service-provider.component';
import { ServiceProviderDetailComponent } from '../../Dashboard/SuperAdmin/service-provider-detail/service-provider-detail.component';
import { PackageDetailsComponent } from '../../Dashboard/Admin/package-details/package-details.component';
import { AddAdminComponent } from '../../Dashboard/SuperAdmin/add-admin/add-admin.component';
import { ServiceProviderlistComponent } from '../../Dashboard/SuperAdmin/service-providerlist/service-providerlist.component';
import { CustomersListComponent } from '../../Dashboard/SuperAdmin/customers-list/customers-list.component';
import { AdminsListComponent } from '../../Dashboard/SuperAdmin/admins-list/admins-list.component';
import { ServiceDetailsComponent } from '../../Dashboard/Admin/service-details/service-details.component';
import { SuperpackageDetailsComponent } from '../../Dashboard/SuperAdmin/superpackage-details/superpackage-details.component';
import { PackagesListComponent } from '../../Dashboard/SuperAdmin/SuperPackages-list/packages-list.component';
import { SuperserviceDetailsComponent } from '../../Dashboard/SuperAdmin/superservice-details/superservice-details.component';
import { AdminPackagesComponent } from '../../Dashboard/Admin/admin-packages/admin-packages.component';
import { AdminServicesComponent } from '../../Dashboard/Admin/admin-services/admin-services.component';
import { EditUserInfoComponent } from '../../Dashboard/edit-user-info/edit-user-info.component';
import { UserInfoComponent } from '../../Dashboard/user-info/user-info.component';
import { AdminLayoutComponent } from '../../Dashboard/layout/admin-layout.component';
import { SignUpComponent } from '../../Authenticaion/sign-up/sign-up.component';
import { LoginComponent } from '../../Authenticaion/login/login.component';
import { TravelServiceComponent } from '../app/travel-service/travel-service.component';
import { ServicesListComponent } from '../../Dashboard/SuperAdmin/SuperServices-list/services-list.component';
import { PackagesComponent } from './packages/packages.component';
import { AddServiceComponent } from '../../Dashboard/Admin/add-service/add-service.component';
import { EditServiceComponent } from '../../Dashboard/Admin/edit-service/edit-service.component';
import { EditPackageComponent } from '../../Dashboard/Admin/edit-package/edit-package.component';
//import { AddPackageComponent } from '../../Dashboard/Admin/add-package/add-package.component';
import { ForgetPasswordComponent } from '../../Authenticaion/forget-password/forget-password.component';
import { ChangePasswordComponent } from '../../Dashboard/change-password/change-password.component';
import { UnauthorizedComponent } from '../../Authenticaion/unauthorized/unauthorized.component';
import { ServicePaymentComponent } from './service-payment/service-payment.component';
import { PaymentComponent } from './payment/payment.component';

import { AddBookingPackageComponent
  
} from './BookingPackage/add-booking-package/add-booking-package.component';
import {
  AddBookingServiceComponent
   
  } from './BookingService/add-booking-service/add-booking-service.component';
import { PaymentSuccessComponent } from './PaymentStatusComponents/payment-success/payment-success.component';
import { PaymnetFailureComponent } from './PaymentStatusComponents/paymnet-failure/paymnet-failure.component';
import { PaymentCancellComponent } from './PaymentStatusComponents/payment-cancell/payment-cancell.component';
import { CommonModule } from '@angular/common';
import { CommunicationDataComponent } from './communication-data/communication-data.component';
import { GetAllBookingPackageComponent } from './BookingPackage/get-all-booking-package/get-all-booking-package.component';


export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    title: 'home',
    },
     { path: '', redirectTo: '/login', pathMatch: 'full' },
     { path: 'services', component: TravelServiceComponent },
     { path: 'packages', component: PackagesComponent },

  { path: 'serviceDetails/:id', component: ServiceDetailsComponent },
  { path: 'serviceDetails/:id', component: PackageDetailsComponent },
  /*{
    path: 'SuperAdmin',
    loadChildren: () =>
      import('../../SuperAdmin/SuperAdmin.routes').then(
        (m) => m.SuperAdminroutes
      ),
    },*/
    {
        path: "payment",
        component: PaymentComponent,
        title:"checkout"
  },
  { path:"ServicePayment", component: ServicePaymentComponent, title: "Hotels Checkout" },
  { path:"AddBookingPackage", component: AddBookingPackageComponent, title: "Booking Package" },
  { path: "AddBookingService", component: AddBookingServiceComponent, title: "Booking Hotel" },
   { path: 'payment-success', component: PaymentSuccessComponent },
  { path: 'payment-failure', component: PaymnetFailureComponent },
  { path: 'payment-cancel', component: PaymentCancellComponent },
  { path: 'communicationData', component: CommunicationDataComponent, title: "communication Form" },
  { path:"GetAllPackageBooking", component: GetAllBookingPackageComponent, title: "All Booking" },
  //{path :"BookingDetails/:id",component:BookingDetailsComponent ,title:"Booking Package"},
  { path:"SignUp", component: SignUpComponent, title: "Register" },
  {path:"login" ,component:LoginComponent,title:"login"},
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  { path: 'SuperAdmin/Packagelist', component: PackagesListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'forgetpassword', component: ForgetPasswordComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  {
    path: 'profile',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'userinfo',
        component: UserInfoComponent,
        canActivate: [AuthGuardService],
        data: { roles: ['customerService', 'client', 'admin', 'superAdmin'] },
      },
      {
        path: 'changePassword',
        component: ChangePasswordComponent,
        canActivate: [AuthGuardService],
        data: { roles: ['customerService', 'client', 'admin', 'superAdmin'] },
      },
      {
        path: 'EditUserInfo',
        component: EditUserInfoComponent,
        canActivate: [AuthGuardService],
        data: { roles: ['customerService', 'client', 'admin', 'superAdmin'] },
      },
      {
        path: 'servicelist',
        component: AdminServicesComponent,
        canActivate: [AuthGuardService],
        data: { roles: ['admin'] },
      },
      {
        path: 'serviceDetail/:id',
        component: ServiceDetailsComponent,
        canActivate: [AuthGuardService],
        data: { roles: ['admin'] },
      },
      {
        path: 'AddService',
        component: AddServiceComponent,
        canActivate: [AuthGuardService],
        data: { roles: ['admin'] },
      },
      {
        path: 'Packagelist',
        component: AdminPackagesComponent,

        canActivate: [AuthGuardService],
        data: { roles: ['admin'] },
      },
      {
        path: 'AddService',
        component: AddServiceComponent,
        canActivate: [AuthGuardService],
        data: { roles: ['admin'] },
      },
      {
        path: 'Packagelist',
        component: AdminPackagesComponent,
        canActivate: [AuthGuardService],
        data: { roles: ['admin'] },
      },

{
        path: 'packageDetail/:id',
        component: PackageDetailsComponent,
        canActivate: [AuthGuardService],
        data: { roles: ['admin'] },
      },
     /* {
        path: 'AddPackage',
        component:AddPackageComponent,
        canActivate: [AuthGuardService],
        data: { roles: ['admin'] },
      },*/
      {
        path: 'superpackageDetail/:id',
        component: SuperpackageDetailsComponent,
        canActivate: [AuthGuardService],
        data: { roles: ['admin'] },
      },
      {
        path: 'updatePackage/:id',
        component: EditPackageComponent,
        canActivate: [AuthGuardService],
        data: { roles: ['admin'] },
      },
      /*{
        path: 'AddPackage',
        component: AddPackageComponent,
        canActivate: [AuthGuardService],
        data: { roles: ['admin'] },
      },*/
      {
        path: 'adminslist',
        component: AdminsListComponent,
        canActivate: [AuthGuardService],
        data: { roles: ['superAdmin'] },
      },
      {
        path: 'Customers',
        component: CustomersListComponent,
        canActivate: [AuthGuardService],
        data: { roles: ['superAdmin'] },
      },
      {
        path: 'ServiceProvider',
        component: ServiceProviderlistComponent,
        canActivate: [AuthGuardService],
        data: { roles: ['superAdmin'] },
      },
      {
        path: 'AddAdmin',
        component: AddAdminComponent,
        canActivate: [AuthGuardService],
        data: { roles: ['superAdmin'] },
      },

      {
        path: 'ServiceProviderDetail/:id',
        component: ServiceProviderDetailComponent,
        canActivate: [AuthGuardService],
        data: { roles: ['superAdmin'] },
      },
      {
        path: 'updateServiceProvider/:id',
        component: EditServiceProviderComponent,
        canActivate: [AuthGuardService],
        data: { roles: ['superAdmin'] },
      },
      {
        path: 'AddServiceProvider',
        component: AddServiceProviderComponent,
        canActivate: [AuthGuardService],
        data: { roles: ['superAdmin'] },
      },
      {
        path: 'superservicelist',
        component: ServicesListComponent ,
        canActivate: [AuthGuardService],
        data: { roles: ['superAdmin'] },
      },
      {
        path: 'serviceDetail/:id',
        component: SuperserviceDetailsComponent,
        canActivate: [AuthGuardService],
        data: { roles: ['superAdmin'] },
      },
      {
        path: 'superPackagelist',
        component: PackagesListComponent,
        canActivate: [AuthGuardService],
        data: { roles: ['superAdmin'] },
      },
      {
        path: 'superpackageDetail/:id',
        component: SuperpackageDetailsComponent,
        canActivate: [AuthGuardService],
        data: { roles: ['superAdmin'] },
      },
    ],
  },
];
