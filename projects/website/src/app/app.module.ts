import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { CardModule } from 'primeng/card';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { SplitButtonModule } from 'primeng/splitbutton';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SliderModule } from 'primeng/slider';
import {RippleModule} from 'primeng/ripple';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionsListComponent } from './pages/questions-list/questions-list.component';
import { MenuComponent } from './pages/menu/menu.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { StyleManagerService } from './services/style-manager.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HelpComponent } from './pages/help/help.component';
import { CasualQuizComponent } from './pages/quiz/casual-quiz/casual-quiz.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { ResultsComponent } from './pages/results/results.component';
import { TimedQuizComponent } from './pages/quiz/timed-quiz/timed-quiz.component';
import { EnduranceQuizComponent } from './pages/quiz/endurance-quiz/endurance-quiz.component';
import { EnduranceResultsComponent } from './pages/results/endurance-results/endurance-results.component';
import { QuestionComponent } from './components/question/question.component';
import { SwipeDirective } from './directives/swipe.directive';

@NgModule({
  declarations: [
    AppComponent,
    QuestionsListComponent,
    CasualQuizComponent,
    MenuComponent,
    SettingsComponent,
    HelpComponent,
    EnduranceQuizComponent,
    TimedQuizComponent,
    QuizComponent,
    ResultsComponent,
    EnduranceResultsComponent,
    QuestionComponent,
    SwipeDirective,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    TableModule,
    ButtonModule,
    SkeletonModule,
    HttpClientModule,
    CardModule,
    ConfirmPopupModule,
    BrowserAnimationsModule,
    ToastModule,
    DropdownModule,
    SplitButtonModule,
    RadioButtonModule,
    SliderModule,
    RippleModule
  ],
  providers: [ConfirmationService, MessageService, StyleManagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
