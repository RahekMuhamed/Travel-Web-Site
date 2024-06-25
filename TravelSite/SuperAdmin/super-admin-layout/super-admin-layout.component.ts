import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-super-admin-layout',
  standalone: true,
  templateUrl: './super-admin-layout.component.html',
  styleUrl: './super-admin-layout.component.css',
  imports: [RouterLink, RouterModule],
})
export class SuperAdminLayoutComponent {}
