import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunicationDataComponent } from './communication-data.component';

describe('CommunicationDataComponent', () => {
  let component: CommunicationDataComponent;
  let fixture: ComponentFixture<CommunicationDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunicationDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommunicationDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
