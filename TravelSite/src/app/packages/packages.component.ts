import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
    selector: 'app-packages',
    standalone: true,
    templateUrl: './packages.component.html',
    styleUrl: './packages.component.css',
    imports: [NavbarComponent, FooterComponent]
})
export class PackagesComponent {

}
