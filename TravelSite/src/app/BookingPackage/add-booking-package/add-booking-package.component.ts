import { Component } from '@angular/core';
import { BookingPackageService } from '../../Services/booking-package.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs'; 

@Component({
  selector: 'app-add-booking-package',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-booking-package.component.html',
  styleUrl: './add-booking-package.component.css'
})
export class AddBookingPackageComponent {
  clientId: string = "1";
  packageId: number = 1010;
  bookingPackageId: number = 1;
  price: number = 10;
  constructor(public bookingPackageService: BookingPackageService ,public router:Router){}
  booking()
  {
    this.bookingPackageService.AddBookingPackage(this.clientId, this.packageId).subscribe(
      bookingPackagobj =>// the result after adding booking package object
      {
        console.log("booking added successfully", bookingPackagobj);
        this.router.navigate(['/payment'], { 
          queryParams: { 
            bookingPackageId:bookingPackagobj.bookingPackageId, 
            amount:this.price 
          }  });
        },
      error =>// if failed to make request
      {
        console.log("error adding booking", error);
      }  )// end of subscribe   
  }
}
