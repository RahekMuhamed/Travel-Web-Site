
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'SuperAdmin',
    loadChildren: () => import('../../SuperAdmin/SuperAdmin.routes').then(m => m.SuperAdminroutes)
  }
];


