import { Injectable } from "@angular/core";
import { QuestionDto, QuestionListDto } from "api-client";
import { map, Observable, of, take } from "rxjs";
import { QuizService } from "../services/quiz.service";
import { StateDictionary } from "./state-dictionary";
import { StateService } from "./state-service";
import { LazyLoadEvent } from 'primeng/api';

export interface QuestionListState {
    questions: QuestionDto[];
    totalRecords: number;
    loading: boolean;
}

const initialState: QuestionListState = {
    questions: [],
    totalRecords: 0,
    loading: true
}

@Injectable({
    providedIn: 'root'
})
export class QuestionListStateService extends StateService<QuestionListState> {
    questions: Observable<QuestionDto[]> = this.select(state => state.questions);
    totalRecords: Observable<number> = this.select(state => state.totalRecords);
    loading: Observable<boolean> = this.select(state => state.loading);


    private questionsDict = new StateDictionary<Observable<QuestionListDto>>();

    constructor(
        private quizService: QuizService
    ) {
        super(initialState);
    }



    getQuestions(event: LazyLoadEvent): Observable<void> {
        return new Observable<void>((subscriber) => {
            this.setLoading(true);

            var size = event.rows!;
            var page = (event.first! / event.rows!) + 1;

            var sortField = event.sortField ?? "text";
            var sortOrder = event.sortOrder!;

            this.loadQuestions(size, page, sortField, sortOrder)
            .pipe(take(1))
                .subscribe(
                    {
                        next: (dto) => {
                            this.setQuestions(dto.questions!);
                            this.setTotalRecords(dto.totalRecords!);

                            subscriber.next();
                        },
                        error: (err) => {
                            subscriber.error(err);
                        },
                        complete: () => {
                            this.setLoading(false);
                        }
                    }
                );
        });
    }

    loadQuestions(size: number, page: number, sortField: string, sortOrder: number): Observable<QuestionListDto> {
        const cacheArgs = [size + page + sortField + sortOrder + ''];

        return this.questionsDict.loadFromCache(cacheArgs, () => {
            return this.quizService.getQuestions(size, page, sortField, sortOrder);
        });
    }


    setQuestions(questions: QuestionDto[]) {
        this.setState({ questions });
    }

    setTotalRecords(totalRecords: number) {
        this.setState({ totalRecords });
    }

    setLoading(loading: boolean) {
        this.setState({ loading });
    }
}