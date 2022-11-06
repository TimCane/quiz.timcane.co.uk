import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable, Subject, take } from 'rxjs';
import { QuizModeEnum } from '../../enums/quiz-mode-enum';
import { QuizStateService } from '../../states/quiz/quiz-state.service';
import { SettingsStateService } from '../../states/settings-state.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  inProgress$: Observable<boolean> = this.quizState.inProgress;
  quizMode$: Observable<QuizModeEnum> = this.settingsState.quizMode;
  
  QuizModeEnum = QuizModeEnum;

  constructor(private settingsState: SettingsStateService, private quizState: QuizStateService, private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.inProgress$
      .pipe(take(1))
      .subscribe({
        next: (inProgress) => {
          if (!inProgress) {
            this.router.navigate(['menu']);
          }
        }
      })
  }

  onQuestionFlagged(event: Event) {
    this.confirmationService.confirm({
      target: event.target!,
      message: 'Are you sure that you want to flag this question?',
      icon: 'pi pi-flag-fill',
      accept: () => {
        this.quizState.flagCurrentQuestion();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'This question has been flagged' });
      },
      reject: () => {
        //reject action
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(undefined);
    this.destroy$.complete();
  }

}
