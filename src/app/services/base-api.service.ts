import { of, OperatorFunction } from 'rxjs';
import { catchError } from 'rxjs/operators';

export abstract class BaseApiService {
  protected handleError<T>(fallback: T): OperatorFunction<T, T> {
    return catchError((error) => {
      console.error('API error:', error);
      return of(fallback);
    });
  }
}
