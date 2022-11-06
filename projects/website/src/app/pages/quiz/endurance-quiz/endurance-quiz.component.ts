import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionDto } from 'api-client';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { QuizViewEnum } from '../../../enums/quiz-view-enum';
import { EnduranceQuizStateService } from '../../../states/quiz/endurance-quiz-state.service';
import { QuizStateService } from '../../../states/quiz/quiz-state.service';

@Component({
  selector: 'app-endurance-quiz',
  templateUrl: './endurance-quiz.component.html',
  styleUrls: ['./endurance-quiz.component.scss']
})
export class EnduranceQuizComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  inProgress$: Observable<boolean> = this.quizState.inProgress;
  currentQuestion$: Observable<QuestionDto | null> = this.quizState.currentQuestion;
  index$: Observable<number> = this.quizState.index;
  questionsCount$: Observable<number> = this.quizState.questionsCount;
  loading$: Observable<boolean> = this.quizState.loading;

  remainingLives$: Observable<number> = this.enduranceQuizState.remainingLives;
  correctQuestionsCount$: Observable<number> = this.enduranceQuizState.correctQuestionsCount;

  QuizViewEnum = QuizViewEnum;

  parentSubject:Subject<string>;

  constructor(private quizState: QuizStateService, private enduranceQuizState: EnduranceQuizStateService, private router: Router) {
    this.parentSubject = new Subject();
  }

  ngOnInit(): void {
    var remainingLives = this.remainingLives$;

    remainingLives
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (remainingLives: number) => {
          if(remainingLives <= 0){
            this.router.navigate(["results"])
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(undefined);
    this.destroy$.complete();
  }

  onIncorrectAnswer() {
    this.enduranceQuizState.incorrectAnswer();
    this.parentSubject.next("swipeleft");
  }

  onCorrectAnswer() {
    this.enduranceQuizState.correctAnswer();
    this.parentSubject.next("swiperight");
  }

}
