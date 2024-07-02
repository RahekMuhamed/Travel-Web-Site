import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCustomerServicesComponent } from './delete-customer-services.component';

describe('DeleteCustomerServicesComponent', () => {
  let component: DeleteCustomerServicesComponent;
  let fixture: ComponentFixture<DeleteCustomerServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteCustomerServicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteCustomerServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
