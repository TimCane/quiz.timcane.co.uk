import { Injectable } from "@angular/core";
import { QuestionDto } from "api-client";
import { Observable, take } from "rxjs";
import { SettingsStateService } from "../settings-state.service";
import { StateService } from "../state-service";
import { QuizStateService } from "./quiz-state.service";

export interface EnduranceQuizState {
    maxLives: number;
    incorrectQuestions: QuestionDto[];
    correctQuestions: QuestionDto[];
}

const initialState: EnduranceQuizState = {
    maxLives: 2,
    incorrectQuestions: [],
    correctQuestions: []
}

@Injectable({
    providedIn: 'root'
})
export class EnduranceQuizStateService extends StateService<EnduranceQuizState> {

    remainingLives: Observable<number> = this.select(state => state.maxLives - state.incorrectQuestions.length);

    correctQuestionsCount: Observable<number> = this.select(state => state.correctQuestions.length);
    correctQuestions: Observable<QuestionDto[]> = this.select(state => state.correctQuestions);

    incorrectQuestionsCount: Observable<number> = this.select(state => state.incorrectQuestions.length);
    incorrectQuestions: Observable<QuestionDto[]> = this.select(state => state.incorrectQuestions);

    constructor(private quizState: QuizStateService, private settingState: SettingsStateService) {
        super(initialState);

        this.quizState.onRestart
            .subscribe({
                next: () => {
                    this.onRestartQuiz();
                }
            });


        this.loadSettings();
    }

    loadSettings() {
        this.settingState.enduranceLives
            .pipe(take(1))
            .subscribe({
                next: (maxLives: number) => {
                    this.setMaxLives(maxLives);
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

    setMaxLives(maxLives: number) {
        this.setState({ maxLives });
    }

    addIncorrectQuestion(incorrectQuestion: QuestionDto) {
        this.setState({ incorrectQuestions: [...this.state.incorrectQuestions, incorrectQuestion] });
    }

    addCorrectQuestion(correctQuestion: QuestionDto) {
        this.setState({ correctQuestions: [...this.state.correctQuestions, correctQuestion] });
    }
}