import { Routes } from '@angular/router';
import { AdminsListComponent } from '../SuperAdmin/admins-list/admins-list.component';
import { CustomerServicessListComponent } from '../SuperAdmin/customer-servicess-list/customer-servicess-list.component';
import { CustomersListComponent } from '../SuperAdmin/customers-list/customers-list.component';
import { AddAdminComponent } from '../SuperAdmin/add-admin/add-admin.component';
import { DeleteAdminComponent } from '../SuperAdmin/delete-admin/delete-admin.component';
import { AddCustomerServicesComponent } from '../SuperAdmin/add-customer-services/add-customer-services.component';
import { DeleteCustomerServicesComponent } from '../SuperAdmin/delete-customer-services/delete-customer-services.component';
import { DeleteCustomerComponent } from '../SuperAdmin/delete-customer/delete-customer.component';
import { SuperAdminLayoutComponent } from './super-admin-layout/super-admin-layout.component';
import { SuperAdminInfoComponent } from './super-admin-info/super-admin-info.component';
import { ServicesListComponent } from './services-list/services-list.component';
import { PackagesListComponent } from './packages-list/packages-list.component';

export const SuperAdminroutes: Routes = [
  {
    path: '',
    component: SuperAdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'info', pathMatch: 'full' },
      { path: 'info', component: SuperAdminInfoComponent },
      { path: 'services', component: ServicesListComponent },
      { path: 'packages', component: PackagesListComponent },
      {
        path: 'Admins',
        component: AdminsListComponent,
        children: [
          { path: 'AddAdmin', component: AddAdminComponent },
          { path: 'DeleteAdmin', component: DeleteAdminComponent }
        ]
      },
      {
        path: 'Customers',
        component: CustomersListComponent,
        children: [
          { path: 'DeleteCustomer', component: DeleteCustomerComponent }
        ]
      },
      {
        path: 'CustomerService',
        component: CustomerServicessListComponent,
        children: [
          { path: 'AddCustomerServices', component: AddCustomerServicesComponent },
          { path: 'DeleteCustomerServices', component: DeleteCustomerServicesComponent }
        ]
      }
    ]
  }
];
