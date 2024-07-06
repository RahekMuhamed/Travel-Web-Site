import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterModule, TabMenuModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] | undefined;

  constructor(private router: Router) {}
  ngOnInit() {
    // this.items = [
    //   { label: 'Dashboard', icon: 'pi pi-home' },
    //   { label: 'Transactions', icon: 'pi pi-chart-line' },
    //   { label: 'Products', icon: 'pi pi-list' },
    //   { label: 'Messages', icon: 'pi pi-inbox' },
    // ];

    this.items = [
      { label: 'Home ', icon: 'pi pi-home', route: '/home' },
      {
        label: 'Programmatic',
        icon: 'pi pi-palette',
        command: () => {
          this.router.navigate(['/theming']);
        },
      },
      { label: 'Packages', icon: 'pi pi-link', route: '/packages' },
    ];
  }
}
