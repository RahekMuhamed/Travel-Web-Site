import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from "./sign-up/sign-up.component";
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ContactUSComponent } from './contact-us/contact-us.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, LoginComponent, SignUpComponent,ForgetPasswordComponent,ResetPasswordComponent,ContactUSComponent]
})
export class AppComponent {
  title = 'TravelSite';
}
