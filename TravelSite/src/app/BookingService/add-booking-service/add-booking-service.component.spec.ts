import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookingServiceComponent } from './add-booking-service.component';

describe('AddBookingServiceComponent', () => {
  let component: AddBookingServiceComponent;
  let fixture: ComponentFixture<AddBookingServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBookingServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddBookingServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
