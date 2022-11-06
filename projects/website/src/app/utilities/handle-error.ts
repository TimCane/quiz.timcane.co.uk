export function handleError<T>(operation: string, error: any, result?: T) {
    console.error(operation + ' ' + error);
    return result as T;
}