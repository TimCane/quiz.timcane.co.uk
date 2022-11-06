import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionDto } from 'api-client';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable, Subject, take } from 'rxjs';
import { QuizViewEnum } from '../../../enums/quiz-view-enum';
import { CasualQuizStateService } from '../../../states/quiz/casual-quiz-state.service';
import { QuizStateService } from '../../../states/quiz/quiz-state.service';

@Component({
  selector: 'app-casual-quiz',
  templateUrl: './casual-quiz.component.html',
  styleUrls: ['./casual-quiz.component.scss']
})
export class CasualQuizComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  currentQuestion$: Observable<QuestionDto | null> = this.quizState.currentQuestion;
  index$: Observable<number> = this.quizState.index;
  questionsCount$: Observable<number> = this.quizState.questionsCount;
  loading$: Observable<boolean> = this.quizState.loading;

  QuizViewEnum = QuizViewEnum;

  parentSubject:Subject<string>;

  constructor(private quizState: QuizStateService, private casualQuizState: CasualQuizStateService) {
    this.parentSubject = new Subject();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next(undefined);
    this.destroy$.complete();
  }

  onPreviousQuestion() {
    this.index$
    .pipe(take(1))
    .subscribe({
      next: (index) => {
        if(index > 0){
          this.parentSubject.next("swipeleft");
        }
      }
    });

    this.quizState.previousQuestion();
  }

  onNextQuestion() {
    this.quizState.nextQuestion();
    this.parentSubject.next("swiperight");
  }

}
