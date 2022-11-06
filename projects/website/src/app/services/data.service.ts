import { Observable, of, throwError } from "rxjs";
import { catchError, map, shareReplay, tap } from "rxjs/operators";

const NOOP = () => { };

export class DataService {
  protected mapResult<T>(
    observable: Observable<any>,
    mapper: (data: any) => T,
    stateUpdater?: (res: T) => void,
    errorNotifier?: (err: any) => any
  ): Observable<T> {
    return observable
      .pipe(
        shareReplay(1),
        map(mapper),
        catchError(error => {
          const returnValue = errorNotifier ? errorNotifier(error) : undefined;
          return returnValue !== undefined ? of(returnValue) : throwError(error);
        }),
        tap(stateUpdater || NOOP)
      );
  }
}
