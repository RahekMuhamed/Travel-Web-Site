import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperpackageDetailsComponent } from './superpackage-details.component';

describe('SuperpackageDetailsComponent', () => {
  let component: SuperpackageDetailsComponent;
  let fixture: ComponentFixture<SuperpackageDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperpackageDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuperpackageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
