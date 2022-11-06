import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionDto } from 'api-client';
import { combineLatest, Observable, Subject, take, takeUntil } from 'rxjs';
import { EnduranceQuizStateService } from '../../../states/quiz/endurance-quiz-state.service';

@Component({
  selector: 'app-endurance-results',
  templateUrl: './endurance-results.component.html',
  styleUrls: ['./endurance-results.component.scss']
})
export class EnduranceResultsComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  correctQuestionsCount$: Observable<number> = this.enduranceQuizState.correctQuestionsCount;
  correctQuestions$: Observable<QuestionDto[]> = this.enduranceQuizState.correctQuestions;

  incorrectQuestionsCount$: Observable<number> = this.enduranceQuizState.incorrectQuestionsCount;
  incorrectQuestions$: Observable<QuestionDto[]> = this.enduranceQuizState.incorrectQuestions;

  constructor(private enduranceQuizState: EnduranceQuizStateService, private router: Router) { }

  ngOnInit(): void {

    combineLatest([this.correctQuestionsCount$, this.incorrectQuestionsCount$])
    .pipe(take(1))
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: ([correctQuestionCount, incorrectQuestionsCount]) => {
        if(correctQuestionCount == 0 && incorrectQuestionsCount == 0){
          this.router.navigate(["/menu"]);
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(undefined);
    this.destroy$.complete();
  }

}
