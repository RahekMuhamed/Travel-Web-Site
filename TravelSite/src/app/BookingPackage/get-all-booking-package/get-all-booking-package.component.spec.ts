import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllBookingPackageComponent } from './get-all-booking-package.component';

describe('GetAllBookingPackageComponent', () => {
  let component: GetAllBookingPackageComponent;
  let fixture: ComponentFixture<GetAllBookingPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetAllBookingPackageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetAllBookingPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
