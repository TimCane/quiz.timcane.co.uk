import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, takeUntil } from 'rxjs';
import { QuizModeEnum } from '../../enums/quiz-mode-enum';
import { QuizStateService } from '../../states/quiz/quiz-state.service';
import { SettingsStateService } from '../../states/settings-state.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  quizMode$: Observable<QuizModeEnum> = this.settingsState.quizMode;
  loading$: Observable<boolean> = this.quizState.loading;
  
  QuizModeEnum = QuizModeEnum;
  constructor(private settingsState: SettingsStateService, private quizState: QuizStateService, private router: Router) { }

  ngOnDestroy(): void {
    this.destroy$.next(undefined);
    this.destroy$.complete();
  }

  ngOnInit(): void {
  }

  onMenu(){
    this.router.navigate(["/menu"]);
  }
}
