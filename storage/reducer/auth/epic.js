import {mergeMap, filter, catchError} from 'rxjs/operators'
import {loginFetch, loginSuccess, loginFailed} from "@storage/reducer/auth/index";
import postLogin$ from "@storage/api/postLogin";
import {of} from "rxjs";

export const fetchLoginEpic = (action$) =>
  action$.pipe(
    filter(loginFetch.match),
    mergeMap(({payload}) => postLogin$({
        additionalBody: {
          username: payload.username,
          password: payload.password
        }
      }).pipe(
      mergeMap((response) => {
        return of(
          loginSuccess(response)
        )
      }),
      catchError(error => {
        return of(loginFailed({...payload, error: error.message}));
      })
      )
    )
  )
