import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerServicessListComponent } from './customer-servicess-list.component';

describe('CustomerServicessListComponent', () => {
  let component: CustomerServicessListComponent;
  let fixture: ComponentFixture<CustomerServicessListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerServicessListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerServicessListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
