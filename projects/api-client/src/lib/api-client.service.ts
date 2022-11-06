//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.17.0.0 (NJsonSchema v10.8.0.0 (Newtonsoft.Json v12.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming

import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable({
    providedIn: 'root'
})
export class QuizApiClientService {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "http://localhost:7071/api";
    }

    /**
     * @return The OK response
     */
    questionCount(): Observable<CountOfQuestionsDto> {
        let url_ = this.baseUrl + "/QuestionCount";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processQuestionCount(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processQuestionCount(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<CountOfQuestionsDto>;
                }
            } else
                return _observableThrow(response_) as any as Observable<CountOfQuestionsDto>;
        }));
    }

    protected processQuestionCount(response: HttpResponseBase): Observable<CountOfQuestionsDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = CountOfQuestionsDto.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status === 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result204: any = null;
            let resultData204 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result204 = resultData204 !== undefined ? resultData204 : <any>null;
    
            return throwException("No Content was returned.", status, _responseText, _headers, result204);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @return The OK response
     */
    getQuizQuestions(size: number, page: number, sortField: string, sortOrder: number): Observable<QuestionListDto> {
        let url_ = this.baseUrl + "/GetQuizQuestions?";
        if (size === undefined || size === null)
            throw new Error("The parameter 'size' must be defined and cannot be null.");
        else
            url_ += "size=" + encodeURIComponent("" + size) + "&";
        if (page === undefined || page === null)
            throw new Error("The parameter 'page' must be defined and cannot be null.");
        else
            url_ += "page=" + encodeURIComponent("" + page) + "&";
        if (sortField === undefined || sortField === null)
            throw new Error("The parameter 'sortField' must be defined and cannot be null.");
        else
            url_ += "sortField=" + encodeURIComponent("" + sortField) + "&";
        if (sortOrder === undefined || sortOrder === null)
            throw new Error("The parameter 'sortOrder' must be defined and cannot be null.");
        else
            url_ += "sortOrder=" + encodeURIComponent("" + sortOrder) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetQuizQuestions(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetQuizQuestions(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<QuestionListDto>;
                }
            } else
                return _observableThrow(response_) as any as Observable<QuestionListDto>;
        }));
    }

    protected processGetQuizQuestions(response: HttpResponseBase): Observable<QuestionListDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = QuestionListDto.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status === 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result204: any = null;
            let resultData204 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result204 = resultData204 !== undefined ? resultData204 : <any>null;
    
            return throwException("No Content was returned.", status, _responseText, _headers, result204);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @return The OK response
     */
    getRandomQuestion(): Observable<QuestionDto> {
        let url_ = this.baseUrl + "/GetRandomQuestion";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetRandomQuestion(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetRandomQuestion(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<QuestionDto>;
                }
            } else
                return _observableThrow(response_) as any as Observable<QuestionDto>;
        }));
    }

    protected processGetRandomQuestion(response: HttpResponseBase): Observable<QuestionDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = QuestionDto.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status === 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result204: any = null;
            let resultData204 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result204 = resultData204 !== undefined ? resultData204 : <any>null;
    
            return throwException("No Content was returned.", status, _responseText, _headers, result204);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }
}

export class CountOfQuestionsDto implements ICountOfQuestionsDto {
    count?: number | undefined;

    constructor(data?: ICountOfQuestionsDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.count = _data["count"];
        }
    }

    static fromJS(data: any): CountOfQuestionsDto {
        data = typeof data === 'object' ? data : {};
        let result = new CountOfQuestionsDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["count"] = this.count;
        return data;
    }
}

export interface ICountOfQuestionsDto {
    count?: number | undefined;
}

export class QuestionDto implements IQuestionDto {
    answer?: string | undefined;
    text?: string | undefined;

    constructor(data?: IQuestionDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.answer = _data["answer"];
            this.text = _data["text"];
        }
    }

    static fromJS(data: any): QuestionDto {
        data = typeof data === 'object' ? data : {};
        let result = new QuestionDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["answer"] = this.answer;
        data["text"] = this.text;
        return data;
    }
}

export interface IQuestionDto {
    answer?: string | undefined;
    text?: string | undefined;
}

export class QuestionListDto implements IQuestionListDto {
    pageNumber?: number | undefined;
    pageSize?: number | undefined;
    questions?: QuestionDto[] | undefined;
    sortField?: string | undefined;
    sortOrder?: number | undefined;
    totalPages?: number | undefined;
    totalRecords?: number | undefined;

    constructor(data?: IQuestionListDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.pageNumber = _data["pageNumber"];
            this.pageSize = _data["pageSize"];
            if (Array.isArray(_data["questions"])) {
                this.questions = [] as any;
                for (let item of _data["questions"])
                    this.questions!.push(QuestionDto.fromJS(item));
            }
            this.sortField = _data["sortField"];
            this.sortOrder = _data["sortOrder"];
            this.totalPages = _data["totalPages"];
            this.totalRecords = _data["totalRecords"];
        }
    }

    static fromJS(data: any): QuestionListDto {
        data = typeof data === 'object' ? data : {};
        let result = new QuestionListDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["pageNumber"] = this.pageNumber;
        data["pageSize"] = this.pageSize;
        if (Array.isArray(this.questions)) {
            data["questions"] = [];
            for (let item of this.questions)
                data["questions"].push(item.toJSON());
        }
        data["sortField"] = this.sortField;
        data["sortOrder"] = this.sortOrder;
        data["totalPages"] = this.totalPages;
        data["totalRecords"] = this.totalRecords;
        return data;
    }
}

export interface IQuestionListDto {
    pageNumber?: number | undefined;
    pageSize?: number | undefined;
    questions?: QuestionDto[] | undefined;
    sortField?: string | undefined;
    sortOrder?: number | undefined;
    totalPages?: number | undefined;
    totalRecords?: number | undefined;
}

export class ApiException extends Error {
    override message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
    if (result !== null && result !== undefined)
        return _observableThrow(result);
    else
        return _observableThrow(new ApiException(message, status, response, headers, null));
}

function blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
        if (!blob) {
            observer.next("");
            observer.complete();
        } else {
            let reader = new FileReader();
            reader.onload = event => {
                observer.next((event.target as any).result);
                observer.complete();
            };
            reader.readAsText(blob);
        }
    });
}