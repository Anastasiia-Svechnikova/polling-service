import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  filter,
  fromEvent,
  interval,
  map,
  Observable,
  startWith,
  switchMap,
  take,
  takeUntil,
  tap,
  timer,
} from 'rxjs';

import { status } from './types';

const INTERVAL = 10000;

@Injectable({
  providedIn: 'root',
})
export class PollingService {
  doPolling<T>(observable: Observable<T>): Observable<T> {
    const stopped$ = new BehaviorSubject(false);
    const visibilityChange$ = fromEvent(document, 'visibilitychange').pipe(
      map(() => document.visibilityState),
    );

    const visible$ = visibilityChange$.pipe(
      filter((state) => state === status.visible && stopped$.value === true),
      tap(() => stopped$.next(false)),
    );

    const hidden$ = visibilityChange$.pipe(
      filter((state) => state === status.hidden),
      switchMap(() =>
        interval(1000).pipe(
          take(INTERVAL + 1),
          takeUntil(visibilityChange$),
          filter((interval) => interval === INTERVAL / 1000 - 2),
          tap(() => stopped$.next(true)),
        ),
      ),
    );

    return visible$.pipe(
      startWith(''),
      switchMap(() =>
        timer(0, INTERVAL).pipe(
          filter(() => window.navigator.onLine),
          takeUntil(hidden$),
          switchMap(() => observable),
        ),
      ),
    );
  }
}
