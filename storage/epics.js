import {combineEpics} from 'redux-observable';
import {catchError, mergeMap} from 'rxjs/operators';
import {BehaviorSubject, of} from 'rxjs';

import * as epics from '@storage/reducer/reducerEpics';
import ENV from "@constants/env";

const combineEpicsAndCatchErrors = (...allEpics) => (action$, state$) => {
  const enhancedEpics = allEpics.map((epic) => (action2$, state2$) =>
    epic(action2$, state2$).pipe(
      catchError((error) => {
        if (ENV.envName === 'DEVELOPMENT') console.warn(`Epic ${epic.name} failed with: `, error);
        return of({
          type: 'Rxjs/UNCAUGHT_ERROR',
        });
      })
    )
  );
  return combineEpics(...enhancedEpics)(action$, state$);
};

const epic$ = new BehaviorSubject(combineEpicsAndCatchErrors(...Object.values(epics)));

export default (action$, state$) =>
  epic$.pipe(
    mergeMap((epic) => epic(action$, state$)),
    catchError((error) => {
      if (ENV.envName === 'DEVELOPMENT') console.warn(`FATAL error with: `, error);
      return of({
        type: 'Rxjs/FATAL_ERROR',
      });
    })
  );
