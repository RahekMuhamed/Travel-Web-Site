import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomerServicesComponent } from './add-customer-services.component';

describe('AddCustomerServicesComponent', () => {
  let component: AddCustomerServicesComponent;
  let fixture: ComponentFixture<AddCustomerServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCustomerServicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCustomerServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
