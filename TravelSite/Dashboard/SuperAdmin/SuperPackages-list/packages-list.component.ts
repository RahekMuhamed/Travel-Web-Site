import { Component, OnInit } from '@angular/core';
import { Package } from '../../../src/app/models/packages';
import { PackagesService } from '../../../src/app/services/packages.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SearchBarComponent } from '../../search-bar/search-bar.component';

@Component({
  selector: 'app-packages-list',
  standalone: true,
  imports: [SearchBarComponent,CommonModule, RouterModule,],
  templateUrl: './packages-list.component.html',
  styleUrl: './packages-list.component.css',
})
export class PackagesListComponent implements OnInit {
  packages: Package[]=[];
  filteredPackages: Package[] = [];

  constructor(
    private packageservice: PackagesService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.packageservice.getAll().subscribe({
      next: (response: any) => {
        this.packages = response.$values;
        this.filteredPackages = response.$values;

      },
    });
  }
  viewDetails(packageId: number): void {
    this.router.navigate(['/profile/superpackageDetail', packageId]);
  }
  onSearch(query: string): void {
    this.filteredPackages = this.packages.filter((pkg) =>
      pkg.name.toLowerCase().includes(query.toLowerCase())
    );
  }
}
