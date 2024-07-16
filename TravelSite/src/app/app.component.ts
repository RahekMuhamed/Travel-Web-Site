import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ForgetPasswordComponent } from '../../Authenticaion/forget-password/forget-password.component';
import { ResetPasswordComponent } from '../../Authenticaion/reset-password/reset-password.component';
import { ContactUSComponent } from './contact-us/contact-us.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
        RouterOutlet,
        NavbarComponent,
        FooterComponent,
    ]
})
export class AppComponent {
  title = 'TravelSite';
}
