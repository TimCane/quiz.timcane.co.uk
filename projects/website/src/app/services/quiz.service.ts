import { Injectable } from "@angular/core";
import { QuestionDto, QuestionListDto, QuizApiClientService } from "api-client";
import { Observable } from "rxjs";
import { handleError } from "../utilities/handle-error";
import { DataService } from "./data.service";

@Injectable({
    providedIn: 'root',
})
export class QuizService extends DataService {
    constructor(private api: QuizApiClientService) {
        super();
    }


    getQuestions(size: number, page: number, sortField: string, sortOrder: number): Observable<QuestionListDto> {
        return this.mapResult(
            this.api.getQuizQuestions(size, page, sortField, sortOrder),
            res => res as QuestionListDto ?? null,
            () => { },
            (err => handleError('getQuestions', err, null)));
    }


    getRandomQuestion(): Observable<QuestionDto> {
        return this.mapResult(
            this.api.getRandomQuestion(),
            res => res as QuestionDto ?? null,
            () => { },
            (err => handleError('getRandomQuestion', err, null)));
    }

    flagQuestion(currentQuestion: QuestionDto | null) {

    }
}