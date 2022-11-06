import { Injectable } from "@angular/core";
import { QuestionDto } from "api-client";
import { combineLatest, delay, map, Observable, Subject, take, timer } from "rxjs";
import { QuizService } from "../../services/quiz.service";
import { StateService } from "../state-service";

export interface QuizState {
    preCachedQuestion: QuestionDto | null;
    questions: QuestionDto[];
    index: number;
    loading: boolean;
}

const initialState: QuizState = {
    preCachedQuestion: null,
    questions: [],
    index: -1,
    loading: false
}

@Injectable({
    providedIn: 'root'
})
export class QuizStateService extends StateService<QuizState> {
    private preCachedQuestion: Observable<QuestionDto | null> = this.select(state => state.preCachedQuestion);

    inProgress: Observable<boolean> = this.select(state => state.questions.length > 0);
    currentQuestion: Observable<QuestionDto | null> = this.select(state => state.questions[state.index]);
    questions: Observable<QuestionDto[]> = this.select(state => state.questions);

    index: Observable<number> = this.select(state => state.index);
    questionsCount: Observable<number> = this.select(state => state.questions.length);

    loading: Observable<boolean> = this.select(state => state.loading);

    onRestart: Subject<void> = new Subject();

    constructor(private quizService: QuizService) {
        super(initialState);

        this.preCacheQuestion();
    }

    preCacheQuestion() {
        this.quizService.getRandomQuestion()
            .pipe(take(1))
            .subscribe({
                next: (question) => {
                    this.setPreCachedQuestion(question);
                }
            });
    }

    flagCurrentQuestion() {
        this.currentQuestion
            .pipe(take(1))
            .subscribe({
                next: (currentQuestion) => {
                    this.quizService.flagQuestion(currentQuestion);
                }
            })
    }

    loadNextQuestion() {
        this.setLoading(true);

        const randomQuestion$ = this.preCachedQuestion;
        const wait$ = timer(700);

        combineLatest([randomQuestion$, wait$])
            .pipe(take(1))
            .subscribe({
                next: ([randomQuestion]) => {
                    this.addQuestion(randomQuestion);
                },
                complete: () => {
                    this.setLoading(false);
                    this.preCacheQuestion();
                }
            });
    }

    previousQuestion() {
        var loading = this.state.loading;
        var index = this.state.index;

        if (!loading) {
            this.setIndex(index - 1);
        }
    }

    nextQuestion() {
        var loading = this.state.loading;
        var index = this.state.index;
        var questions = this.state.questions;

        if (!loading) {
            this.setIndex(index + 1);

            if (index == (questions.length - 1)) {
                this.loadNextQuestion();
            }
        }
    }

    restartQuiz() {
        if (!this.state.loading) {
            this.setState(initialState);
            this.onRestart.next();
            this.preCacheQuestion();
        }
    }

    addQuestion(question: QuestionDto | null) {
        if (question) {
            this.setState({ questions: [...this.state.questions, question] });
            this.setIndex(this.state.questions.length - 1);
        }
    }

    setIndex(index: number) {
        if (index <= 0) {
            this.setState({ index: 0 });
        } else if (index >= this.state.questions.length) {
            this.setState({ index: this.state.questions.length - 1 });
        } else {
            this.setState({ index });
        }
    }

    setLoading(loading: boolean) {
        this.setState({ loading });
    }

    setPreCachedQuestion(preCachedQuestion: QuestionDto) {
        this.setState({ preCachedQuestion });
    }
}