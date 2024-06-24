import { Component, OnInit } from '@angular/core';
import { Services, } from '../../src/app/models/services';
import { CommonModule } from '@angular/common';
import { ServicesService } from '../../src/app/services/services.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-services.component.html',
  styleUrl: './admin-services.component.css'
})
export class AdminServicesComponent implements OnInit
{
 service:Services[]|null=null;
 constructor(private serviceservice:ServicesService ,private router :Router){};
 ngOnInit(): void {
   this.serviceservice.getAll().subscribe({next: (response: any) => {
     this.service = response.$values;
   }
   })
 }
 viewDetails(serviceId: number): void {
  this.router.navigate(['/Admin/serviceDetail', serviceId]);
}
addService(): void {
  this.router.navigate(['/Admin/AddService']);
}
updateService(serviceId: number): void {
  this.router.navigate(['/Admin/updateservice', serviceId]);
}
}
