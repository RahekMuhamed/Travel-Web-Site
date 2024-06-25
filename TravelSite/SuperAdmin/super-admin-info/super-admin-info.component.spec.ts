import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminInfoComponent } from './super-admin-info.component';

describe('SuperAdminInfoComponent', () => {
  let component: SuperAdminInfoComponent;
  let fixture: ComponentFixture<SuperAdminInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperAdminInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuperAdminInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
