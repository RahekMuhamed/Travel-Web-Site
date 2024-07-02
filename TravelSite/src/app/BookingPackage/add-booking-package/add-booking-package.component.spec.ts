import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookingPackageComponent } from './add-booking-package.component';

describe('AddBookingPackageComponent', () => {
  let component: AddBookingPackageComponent;
  let fixture: ComponentFixture<AddBookingPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBookingPackageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddBookingPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
