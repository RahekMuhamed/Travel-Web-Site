
import { Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { BookingServiceComponent } from './booking-service/booking-service.component';

export const routes: Routes = [
  {
    path:'', redirectTo: 'home', pathMatch:'full'
  },
  {
    path:'home', component:HomeComponent, title:'home'
  }
 ,
  { path: 'booking', component: BookingServiceComponent },
  {path: 'SuperAdmin',
    loadChildren: () => import('../../SuperAdmin/SuperAdmin.routes').then(m => m.SuperAdminroutes)

  }
];
    


