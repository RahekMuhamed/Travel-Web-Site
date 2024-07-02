import { Component, OnInit } from '@angular/core';
import { Services, } from '../../../src/app/models/services';
import { CommonModule } from '@angular/common';
import { ServicesService } from '../../../src/app/services/services.service';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-services-list',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './services-list.component.html',
  styleUrl: './services-list.component.css'
})
export class ServicesListComponent implements OnInit
{
 service:Services[]|null=null;
 constructor(private serviceservice:ServicesService ,    private router: Router
 ){};
 ngOnInit(): void {
   this.serviceservice.getAll().subscribe({next: (response: any) => {
     this.service = response.$values;
   }
   })
 }
 viewDetails(serviceId: number): void {
  this.router.navigate(['/Admin/serviceDetail', serviceId]);
}
}
