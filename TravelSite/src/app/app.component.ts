import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ContactUSComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SuperAdminLayoutComponent } from "../../SuperAdmin/super-admin-layout/super-admin-layout.component";
import { HttpClientModule } from '@angular/common/http';
import { TravelServiceComponent } from './travel-service/travel-service.component';
import { SuperAdminLayoutComponent } from '../../SuperAdmin/super-admin-layout/super-admin-layout.component';
import { PackagesListComponent } from '../../SuperAdmin/packages-list/packages-list.component';
import { AdminPackagesComponent } from '../../Admin/admin-packages/admin-packages.component';
import { AdminServicesComponent } from '../../Admin/admin-services/admin-services.component';
import { AddPackageComponent } from '../../Admin/add-package/add-package.component';
import { PackageDetailsComponent } from '../../Admin/package-details/package-details.component';
import { RouterOutlet } from '@angular/router';
import { AdminLayoutComponent } from '../../Admin/admin-layout/admin-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    RouterOutlet,
    LoginComponent,
    SignUpComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    ContactUSComponent,
    HomeComponent,
    NavbarComponent,
    SuperAdminLayoutComponent,
    HttpClientModule,
    TravelServiceComponent,RouterModule
  ],
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports:[RouterOutlet,
    LoginComponent,
    SignUpComponent,
    PackagesListComponent,
    AdminPackagesComponent,
    AdminServicesComponent,
    AdminLayoutComponent
  ],
  // imports: [
  //   RouterOutlet,
  //   LoginComponent,
  //   SignUpComponent,
  //   ForgetPasswordComponent,
  //   ResetPasswordComponent,
  //   ContactUSComponent,
  //   SuperAdminLayoutComponent,
  //   SidebarComponent,
  //   PackagesListComponent,
  //   AdminPackagesComponent,
  //   AdminServicesComponent,
  //   SuperAdminContainerComponent,
  //   AddPackageComponent,
  //   PackageDetailsComponent,
  // ],
})
export class AppComponent {
  title = 'TravelSite';
}
