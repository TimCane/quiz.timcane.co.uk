import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasualQuizComponent } from './casual-quiz.component';

describe('CasualQuizComponent', () => {
  let component: CasualQuizComponent;
  let fixture: ComponentFixture<CasualQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasualQuizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CasualQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
