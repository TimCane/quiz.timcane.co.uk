import { trigger, transition, animate, keyframes } from '@angular/animations';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { QuestionDto } from 'api-client';
import { Subject, takeUntil } from 'rxjs';
import { QuizViewEnum } from '../../enums/quiz-view-enum';
import { swipeleft, swiperight } from '../../utilities/key-frames';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  animations: [
    trigger('cardAnimator', [
      transition('* => swiperight', animate(750, keyframes(swiperight))),
      transition('* => swipeleft', animate(750, keyframes(swipeleft)))
    ])
  ]
})
export class QuestionComponent implements OnInit, OnChanges, OnDestroy {
  private readonly destroy$ = new Subject<void>();


  @Input() question: QuestionDto | null;

  @Input() parentSubject!: Subject<any>;

  QuizViewEnum = QuizViewEnum;

  view: QuizViewEnum;

  swipeDirection: string;

  constructor() {
    this.view = QuizViewEnum.Question;
    this.question = null;
    this.swipeDirection = "";
  }

  ngOnDestroy(): void {
    this.destroy$.next(undefined);
    this.destroy$.complete();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['question']) {
      this.view = QuizViewEnum.Question;
    }
  }

  ngOnInit(): void {
    this.parentSubject
    .pipe(takeUntil(this.destroy$))
    .subscribe(event => {
      this.startAnimation(event)
    });
  }

  startAnimation(state: any) {
    if (!this.swipeDirection) {
      this.swipeDirection = state;
    }
  }

  resetAnimationState(state: any) {
    this.swipeDirection = '';
  }

  onClick() {
    if (this.view == QuizViewEnum.Question) {
      this.view = QuizViewEnum.Answer;
    } else {
      this.view = QuizViewEnum.Question
    }
  }

}
