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
import { ServicesListComponent } from '../../Dashboard/SuperAdmin/SuperServices-list/services-list.component';
import { AdminServicesComponent } from '../../Dashboard/Admin/admin-services/admin-services.component';
import { EditUserInfoComponent } from '../../Dashboard/edit-user-info/edit-user-info.component';
import { UserInfoComponent } from '../../Dashboard/user-info/user-info.component';
import { AdminLayoutComponent } from '../../Dashboard/layout/admin-layout.component';
import { SignUpComponent } from '../../Authenticaion/sign-up/sign-up.component';
import { LoginComponent } from '../../Authenticaion/login/login.component';
import { TravelServiceComponent } from './travel-service/travel-service.component';
import { PaymentComponent } from './payment/payment.component';
import { AddBookingPackageComponent } from './BookingPackage/add-booking-package/add-booking-package.component';
import { GetAllBookingPackageComponent } from './BookingPackage/get-all-booking-package/get-all-booking-package.component';
import { PackagesComponent } from './packages/packages.component';
import { ClientServiceDetailsComponent } from './service-details/service-details.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ClientPackageDetailsComponent } from './package-details/package-details.component';
import { JoinGroupComponent } from './real-time-chat/join-group/join-group.component';
import { ChatComponent } from './real-time-chat/chat/chat.component';


export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    title: 'home',
    data: { roles: ['client'] },
  },
  { path: 'join-group', component: JoinGroupComponent },

  // Route to the 'ChatComponent' when the path is 'chat'
  // { path: 'chat', component: ChatComponent },
  //############################


  //chat with css tailwind
  {
    path: 'room',
    loadComponent: () =>
      import('./chat/room/room.component').then((m) => m.RoomComponent),
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'services',
    component: TravelServiceComponent,
    data: { roles: ['client'] },
  },
  {
    path: 'packages',
    component: PackagesComponent,
    data: { roles: ['client'] },
  },
  {
    path: 'serviceDetails/:id',
    component: ClientServiceDetailsComponent,
    data: { roles: ['client'] },
  },
  {
    path: 'clientPackageDetails/:id',
    component: ClientPackageDetailsComponent,
    data: { roles: ['client'] },
  },
  {
    path: 'wishlist',
    component: WishlistComponent,
  },
  // {
  //   path: 'SuperAdmin',
  //   loadChildren: () =>
  //     import('../../SuperAdmin/SuperAdmin.routes').then(
  //       (m) => m.SuperAdminroutes
  //     ),
  //   },
  {
    path: 'payment',
    component: PaymentComponent,
    title: 'checkout',
  },
  {
    path: 'AddBookingPackage',
    component: AddBookingPackageComponent,
    title: 'Booking Package',
  },
  {
    path: 'GetAllPackageBooking',
    component: GetAllBookingPackageComponent,
    title: 'All Booking',
  },
  { path: 'SignUp', component: SignUpComponent, title: 'Register' },
  { path: 'login', component: LoginComponent, title: 'login' },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  { path: 'SuperAdmin/Packagelist', component: PackagesListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  {
    path: 'Admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'userinfo',
        component: UserInfoComponent,
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
        path: 'superservicelist',
        component: ServicesListComponent,
        canActivate: [AuthGuardService],
        data: { roles: ['superAdmin'] },
      },
      {
        path: 'Packagelist',
        component: AdminPackagesComponent,
        canActivate: [AuthGuardService],
        data: { roles: ['admin'] },
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
      {
        path: 'serviceDetail/:id',
        component: ServiceDetailsComponent,
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
        path: 'packageDetail/:id',
        component: PackageDetailsComponent,
        canActivate: [AuthGuardService],
        data: { roles: ['admin'] },
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
    ],
  },
];
