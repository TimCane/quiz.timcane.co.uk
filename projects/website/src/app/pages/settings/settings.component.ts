import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, throttle } from 'rxjs';
import { ThemeOption } from '../../interfaces/theme-option';

import { BackgroundOption } from '../../interfaces/background-option';
import { SettingsStateService } from '../../states/settings-state.service';
import { QuizModeEnum } from '../../enums/quiz-mode-enum';
import { QuizStateService } from '../../states/quiz/quiz-state.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  themeOptions$: Observable<Array<ThemeOption>> = this.settingsState.themes;
  backgroundOptions$: Observable<Array<BackgroundOption>> = this.settingsState.backgrounds

  selectedTheme$: Observable<ThemeOption> = this.settingsState.selectedTheme;
  selectedBackground$: Observable<BackgroundOption> = this.settingsState.selectedBackground;

  quizMode$: Observable<QuizModeEnum> = this.settingsState.quizMode;
  QuizModeEnum = QuizModeEnum;

  enduranceLives$: Observable<number> = this.settingsState.enduranceLives;
  timedSeconds$: Observable<number> = this.settingsState.timedSeconds;

  inProgress$: Observable<boolean> = this.quizState.inProgress;

  constructor(private readonly settingsState: SettingsStateService, private quizState: QuizStateService) {
  }

  ngOnInit() {
  }

  isDisabled(mode: QuizModeEnum){
    switch (mode) {
      case QuizModeEnum.Timed:
        return true;    
      default:
        return false;
    }
  }

  onThemeChange(event: any) {
    this.settingsState.setSelectedTheme(event.value as ThemeOption);
  }

  onBackgroundChange(event: any) {
    this.settingsState.setSelectedBackground(event.value as BackgroundOption);
  }

  onQuizModeChange(event: any){
    this.settingsState.setQuizMode(event.value as QuizModeEnum);
    this.quizState.restartQuiz();
  }

  onEnduranceLivesChange(event: any){
    this.settingsState.setEnduranceLives(event.value as number);
  }

  onTimedSecondsChange(event: any){
    this.settingsState.setTimedSeconds(event.value as number);
  }

  ngOnDestroy(): void {
    this.destroy$.next(undefined);
    this.destroy$.complete();
  }

}
