import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { QuizModeEnum } from '../../enums/quiz-mode-enum';
import { QuizStateService } from '../../states/quiz/quiz-state.service';
import { SettingsStateService } from '../../states/settings-state.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  inProgress$: Observable<boolean> = this.quizState.inProgress;
  loading$: Observable<boolean> = this.quizState.loading;

  quizMode$: Observable<QuizModeEnum> = this.settingsState.quizMode;

  constructor(private router: Router, private quizState: QuizStateService, private readonly settingsState: SettingsStateService) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next(undefined);
    this.destroy$.complete();
  }

  onPlay() {
    this.quizState.loadNextQuestion();
    this.redirectToQuiz();
  }

  onContinue() {
    this.redirectToQuiz();
  }

  onRestart() {
    this.quizState.restartQuiz();
  }

  redirectToQuiz() {
    this.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (loading) => {
          if (!loading) {
            this.router.navigate(['quiz']);
          }
        }
      });
  }

  onQuestionList() {
    this.router.navigate(['question-list']);
  }

}
