import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnduranceResultsComponent } from './endurance-results.component';

describe('EnduranceResultsComponent', () => {
  let component: EnduranceResultsComponent;
  let fixture: ComponentFixture<EnduranceResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnduranceResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnduranceResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
