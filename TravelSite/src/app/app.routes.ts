import { Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { BookingServiceComponent } from './booking-service/booking-service.component';
import { TravelServiceComponent } from './travel-service/travel-service.component';
import { PackagesComponent } from './packages/packages.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { PackageDetailsComponent } from './package-details/package-details.component';
import { AdminPackagesComponent } from '../../Admin/admin-packages/admin-packages.component';
import { AddPackageComponent } from '../../Admin/add-package/add-package.component';
import { PackageDetailsComponent } from '../../Admin/package-details/package-details.component';
import { EditPackageComponent } from '../../Admin/edit-package/edit-package.component';
import { SuperpackageDetailsComponent } from '../../SuperAdmin/superpackage-details/superpackage-details.component';
import { PackagesListComponent } from '../../SuperAdmin/packages-list/packages-list.component';
import { AdminServicesComponent } from '../../Admin/admin-services/admin-services.component';
import { EditServiceComponent } from '../../Admin/edit-service/edit-service.component';
import { ServiceDetailsComponent } from '../../Admin/service-details/service-details.component';
import { AddServiceComponent } from '../../Admin/add-service/add-service.component';
import { AdminInfoComponent } from '../../Admin/admin-info/admin-info.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { AdminLayoutComponent } from '../../Admin/admin-layout/admin-layout.component';

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
  { path: 'Admin/AddPackage', component: AddPackageComponent },
  { path: 'Admin/AddService', component: AddServiceComponent },
  // { path: 'Admin/Packagelist', component: AdminPackagesComponent },
  // { path: 'Admin/servicelist', component: AdminServicesComponent },
  {path:'Admin/packageDetail/:id',component:PackageDetailsComponent},
  // {path:'Admin/serviceDetail/:id',component:ServiceDetailsComponent},
  { path: 'Admin/updatePackage/:id', component: EditPackageComponent },
  { path: 'Admin/updateservice/:id', component: EditServiceComponent },
  {path :'SuperAdmin/packageDetail/:id',component:SuperpackageDetailsComponent},
  {path:'SuperAdmin/Packagelist',component:PackagesListComponent},
  {path: 'Admin/info',component:AdminInfoComponent},
  {path :'login',component:LoginComponent},
  {path:'signup',component:SignUpComponent},
  // {path: 'userinfo',component:UserInfoComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // {path:'Aminlayout',component:AdminLayoutComponent},
  {path: 'Admin',
    component: AdminLayoutComponent,
    children: [
      { path: 'userinfo', component: UserInfoComponent },
      { path: 'servicelist', component: AdminServicesComponent,       },
      { path: 'packagelist', component: AdminPackagesComponent },
      {path:'serviceDetail/:id',component:ServiceDetailsComponent},

    ]
    }
];
