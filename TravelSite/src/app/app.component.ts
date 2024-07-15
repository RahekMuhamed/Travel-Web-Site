import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ForgetPasswordComponent } from '../../Authenticaion/forget-password/forget-password.component';
import { ResetPasswordComponent } from '../../Authenticaion/reset-password/reset-password.component';
import { ContactUSComponent } from './contact-us/contact-us.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from '../../Authenticaion/login/login.component';
import { SignUpComponent } from '../../Authenticaion/sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',

    imports: [
      // RouterOutlet,

        // LoginComponent,
        // SignUpComponent,
        // HomeComponent,
        // NavbarComponent,
        // FooterComponent,
        // RouterModule,
        // ForgetPasswordComponent,
        // ResetPasswordComponent,
        // HttpClientModule,
        // TravelServiceComponent,

        RouterOutlet,
        LoginComponent,
        SignUpComponent,
        HomeComponent,
        NavbarComponent,
        HttpClientModule,
        
          ]
})
export class AppComponent {
  title = 'TravelSite';
}
