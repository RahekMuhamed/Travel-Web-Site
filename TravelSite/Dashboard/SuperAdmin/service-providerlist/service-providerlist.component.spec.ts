import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProviderlistComponent } from './service-providerlist.component';

describe('ServiceProviderlistComponent', () => {
  let component: ServiceProviderlistComponent;
  let fixture: ComponentFixture<ServiceProviderlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceProviderlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceProviderlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
