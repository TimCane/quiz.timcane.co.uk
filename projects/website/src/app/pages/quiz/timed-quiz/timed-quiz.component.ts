import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { TimedQuizStateService } from '../../../states/quiz/timed-quiz-state.service';
import { Timer } from '../../../utilities/timer';

@Component({
  selector: 'app-timed-quiz',
  templateUrl: './timed-quiz.component.html',
  styleUrls: ['./timed-quiz.component.scss']
})
export class TimedQuizComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  remainingTime$: Observable<number> = this.timedQuizState.remainingTime;

  constructor(private timedQuizState: TimedQuizStateService, private router: Router) {

  }

  ngOnInit(): void {
    this.timedQuizState.startTimer();

    var remainingLives = this.remainingTime$;

    remainingLives
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (remainingLives: number) => {
          if(remainingLives <= 0){
            this.timedQuizState.stopTimer();
            this.router.navigate(["results"])
          }
        }
      });

  }

  ngOnDestroy(): void {
    this.destroy$.next(undefined);
    this.destroy$.complete();
  }

}
