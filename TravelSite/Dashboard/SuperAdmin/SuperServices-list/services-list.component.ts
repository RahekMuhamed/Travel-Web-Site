import { Component, OnInit } from '@angular/core';
import { Services, } from '../../../src/app/models/services';
import { CommonModule } from '@angular/common';
import { ServicesService } from '../../../src/app/services/services.service';
@Component({
  selector: 'app-services-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services-list.component.html',
  styleUrl: './services-list.component.css'
})
export class ServicesListComponent implements OnInit
{
 service:Services[]|null=null;
 constructor(private serviceservice:ServicesService){};
 ngOnInit(): void {
   this.serviceservice.getAll().subscribe({next: (response: any) => {
     this.service = response.$values;
   }
   })
 }

}
