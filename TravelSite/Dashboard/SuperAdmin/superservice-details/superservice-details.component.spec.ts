import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperserviceDetailsComponent } from './superservice-details.component';

describe('SuperserviceDetailsComponent', () => {
  let component: SuperserviceDetailsComponent;
  let fixture: ComponentFixture<SuperserviceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperserviceDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuperserviceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
