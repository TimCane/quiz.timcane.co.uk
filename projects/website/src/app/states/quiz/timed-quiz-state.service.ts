import { Injectable } from "@angular/core";
import { QuestionDto } from "api-client";
import { Observable, Subscription, take, takeUntil } from "rxjs";
import { Timer } from "../../utilities/timer";
import { SettingsStateService } from "../settings-state.service";
import { StateService } from "../state-service";
import { QuizStateService } from "./quiz-state.service";

export interface TimedQuizState {
    totalTime: number;
    timeElapsed: number;
    timer: Timer | null;
    incorrectQuestions: QuestionDto[];
    correctQuestions: QuestionDto[];
}

const initialState: TimedQuizState = {
    totalTime: 60000,
    timeElapsed: 0,
    timer: null,
    incorrectQuestions: [],
    correctQuestions: []
}

@Injectable({
    providedIn: 'root'
})
export class TimedQuizStateService extends StateService<TimedQuizState> {
    remainingTime: Observable<number> = this.select(state => state.totalTime - state.timeElapsed);

    correctQuestionsCount: Observable<number> = this.select(state => state.correctQuestions.length);
    correctQuestions: Observable<QuestionDto[]> = this.select(state => state.correctQuestions);

    incorrectQuestionsCount: Observable<number> = this.select(state => state.incorrectQuestions.length);
    incorrectQuestions: Observable<QuestionDto[]> = this.select(state => state.incorrectQuestions);

    private timerSubscription: Subscription | null;

    constructor(private quizState: QuizStateService, private settingState: SettingsStateService) {
        super(initialState);

        this.timerSubscription = null;

        this.quizState.onRestart
            .subscribe({
                next: () => {
                    this.onRestartQuiz();
                }
            });


        this.loadSettings();
        this.setupTimer();
    }

    setupTimer() {
        this.state.timer = new Timer(1000);
    }

    startTimer() {
        if (this.state.timer) {
            this.state.timer.start();

            this.timerSubscription = this.state.timer.update
            .subscribe(timeElapsed => {
                this.setTimeElapsed(timeElapsed);
            });
        }
    }

    pauseTimer() {
        if (this.state.timer) {
            this.state.timer.pause();
        }
    }

    stopTimer() {
        this.setTimeElapsed(0);
        this.timerSubscription?.unsubscribe();
        if (this.state.timer) {
            this.state.timer.stop();
        }
    }

    loadSettings() {
        this.settingState.timedSeconds
            .pipe(take(1))
            .subscribe({
                next: (totalTime: number) => {
                    this.setTotalTime(totalTime * 1000);
                }
            })
    }

    onRestartQuiz() {
        this.setState(initialState);
        this.loadSettings();
    }

    correctAnswer() {
        var currentQuestion$ = this.quizState.currentQuestion;

        currentQuestion$
            .pipe(take(1))
            .subscribe({
                next: (question: QuestionDto | null) => {
                    if (question) {
                        this.addCorrectQuestion(question);
                        this.quizState.nextQuestion();
                    }
                },
            })
    }

    incorrectAnswer() {
        var currentQuestion$ = this.quizState.currentQuestion;

        currentQuestion$
            .pipe(take(1))
            .subscribe({
                next: (question: QuestionDto | null) => {
                    if (question) {
                        this.addIncorrectQuestion(question);
                        this.quizState.nextQuestion();
                    }
                },
            })
    }

    setTotalTime(totalTime: number) {
        this.setState({ totalTime });
    }

    setTimeElapsed(timeElapsed: number) {
        this.setState({ timeElapsed });
    }

    addIncorrectQuestion(incorrectQuestion: QuestionDto) {
        this.setState({ incorrectQuestions: [...this.state.incorrectQuestions, incorrectQuestion] });
    }

    addCorrectQuestion(correctQuestion: QuestionDto) {
        this.setState({ correctQuestions: [...this.state.correctQuestions, correctQuestion] });
    }
}