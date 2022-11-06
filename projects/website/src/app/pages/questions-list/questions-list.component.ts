import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionDto } from 'api-client';
import { LazyLoadEvent } from 'primeng/api';
import { Observable, Subject, takeUntil } from 'rxjs';
import { QuestionListStateService } from '../../states/question-list-state.service';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss']
})
export class QuestionsListComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  questions$: Observable<QuestionDto[]> = this.questionListState.questions;
  totalRecords$: Observable<number> = this.questionListState.totalRecords;
  loading$: Observable<boolean> = this.questionListState.loading;

  constructor(private questionListState: QuestionListStateService, private router: Router) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next(undefined);
    this.destroy$.complete();
  }

  onHomeClick(){
    this.router.navigate(['menu']);
  }

  onSettingsClick() {
    this.router.navigate(['settings']);
  }

  loadQuestions(event: LazyLoadEvent) {
    this.questionListState.getQuestions(event)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      error: (err) => {
        console.log(err);
      }
    });
  }
}
