import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimedQuizComponent } from './timed-quiz.component';

describe('TimedQuizComponent', () => {
  let component: TimedQuizComponent;
  let fixture: ComponentFixture<TimedQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimedQuizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimedQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
