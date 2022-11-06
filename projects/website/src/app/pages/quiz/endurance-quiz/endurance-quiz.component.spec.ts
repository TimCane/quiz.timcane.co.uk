import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnduranceQuizComponent } from './endurance-quiz.component';

describe('EnduranceQuizComponent', () => {
  let component: EnduranceQuizComponent;
  let fixture: ComponentFixture<EnduranceQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnduranceQuizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnduranceQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
