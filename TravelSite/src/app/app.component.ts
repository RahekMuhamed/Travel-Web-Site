import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from "./sign-up/sign-up.component";
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ContactUSComponent } from './contact-us/contact-us.component';
//import { NavbarComponent } from './Core/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SuperAdminLayoutComponent } from "../../SuperAdmin/super-admin-layout/super-admin-layout.component";
import { HttpClientModule } from '@angular/common/http';
import { TravelServiceComponent } from './travel-service/travel-service.component';
import { ButtonModule } from 'primeng/button';
import { AddPackageComponent } from '../../Admin/add-package/add-package.component';


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
    NavbarComponent,
    HomeComponent,
    NavbarComponent,
    SuperAdminLayoutComponent,
    HttpClientModule,
    TravelServiceComponent, RouterModule,
    ButtonModule,
    AddPackageComponent
  ]
})
export class AppComponent {
  title = 'TravelSite';
}
