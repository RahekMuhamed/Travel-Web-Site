import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ForgetPasswordComponent } from '../../Authenticaion/forget-password/forget-password.component';
import { ResetPasswordComponent } from '../../Authenticaion/reset-password/reset-password.component';
import { ContactUSComponent } from './contact-us/contact-us.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

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
        HttpClientModule,
        TravelServiceComponent,
    ]
})
export class AppComponent {
  title = 'TravelSite';
}
