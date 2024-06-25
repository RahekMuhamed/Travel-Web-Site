import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelServiceComponent } from './travel-service.component';

describe('TravelServiceComponent', () => {
  let component: TravelServiceComponent;
  let fixture: ComponentFixture<TravelServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TravelServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
