import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymnetFailureComponent } from './paymnet-failure.component';

describe('PaymnetFailureComponent', () => {
  let component: PaymnetFailureComponent;
  let fixture: ComponentFixture<PaymnetFailureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymnetFailureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymnetFailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
