import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentCancellComponent } from './payment-cancell.component';

describe('PaymentCancellComponent', () => {
  let component: PaymentCancellComponent;
  let fixture: ComponentFixture<PaymentCancellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentCancellComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentCancellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
