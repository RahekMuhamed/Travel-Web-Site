import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ForgetPasswordComponent } from '../../Authenticaion/forget-password/forget-password.component';
import { ResetPasswordComponent } from '../../Authenticaion/reset-password/reset-password.component';
import { ContactUSComponent } from './contact-us/contact-us.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { TravelServiceComponent } from './travel-service/travel-service.component';
import { PackagesListComponent } from '../../Dashboard/SuperAdmin/SuperPackages-list/packages-list.component';
import { AdminPackagesComponent } from '../../Dashboard/Admin/admin-packages/admin-packages.component';
import { AdminServicesComponent } from '../../Dashboard/Admin/admin-services/admin-services.component';
import { AddPackageComponent } from '../../Dashboard/Admin/add-package/add-package.component';
import { PackageDetailsComponent } from '../../Dashboard/Admin/package-details/package-details.component';
import { AdminsListComponent } from '../../Dashboard/SuperAdmin/admins-list/admins-list.component';
import { SignUpComponent } from '../../Authenticaion/sign-up/sign-up.component';
import { LoginComponent } from '../../Authenticaion/login/login.component';
import { HomeComponent } from './home/home.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [

        RouterOutlet,
        LoginComponent,
        SignUpComponent,
        HomeComponent,
        NavbarComponent,
        FooterComponent,
        RouterModule,
        ForgetPasswordComponent,
        ResetPasswordComponent,
        ContactUSComponent,
        HttpClientModule,
        TravelServiceComponent,
    ]

})
export class AppComponent {
  title = 'TravelSite';
}
