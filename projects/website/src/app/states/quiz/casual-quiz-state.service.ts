import { Injectable } from "@angular/core";
import { combineLatest, take } from "rxjs";
import { QuizViewEnum } from "../../enums/quiz-view-enum";
import { StateService } from "../state-service";
import { QuizStateService } from "./quiz-state.service";

export interface CasualQuizState {

}

const initialState: CasualQuizState = {

}

@Injectable({
    providedIn: 'root'
})
export class CasualQuizStateService extends StateService<CasualQuizState> {
    constructor(private quizState: QuizStateService) {
        super(initialState);

        this.quizState.onRestart
            .subscribe({
                next: () => {
                    this.onRestartQuiz();
                }
            })
    }

    onRestartQuiz() {

    }
}