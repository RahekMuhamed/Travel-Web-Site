import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProviderDetailComponent } from './service-provider-detail.component';

describe('ServiceProviderDetailComponent', () => {
  let component: ServiceProviderDetailComponent;
  let fixture: ComponentFixture<ServiceProviderDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceProviderDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceProviderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
