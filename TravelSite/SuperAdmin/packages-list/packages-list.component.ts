import { Component, OnInit } from '@angular/core';
import { Package } from '../../src/app/models/packages';
import { PackagesService } from '../../src/app/services/packages.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-packages-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './packages-list.component.html',
  styleUrl: './packages-list.component.css'
})
export class PackagesListComponent implements OnInit
 {
  packages:Package[]|null=null;
  constructor(private packageservice:PackagesService){};
  ngOnInit(): void {
    this.packageservice.getAll().subscribe({next: (response: any) => {
      this.packages = response.$values;
    }
    })
  }

}
