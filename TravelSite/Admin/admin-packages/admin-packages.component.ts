import { Component, OnInit } from '@angular/core';
import { Package } from '../../src/app/models/packages';
import { PackagesService } from '../../src/app/services/packages.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-admin-packages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-packages.component.html',
  styleUrl: './admin-packages.component.css'
})
export class AdminPackagesComponent implements OnInit
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
