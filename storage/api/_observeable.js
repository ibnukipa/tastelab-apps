import QS from 'query-string'
import CS from 'camelcase-keys'
import {ajax} from 'rxjs/ajax'

import ENV from "@constants/env"
import {mergeMap} from "rxjs/src/internal/operators/mergeMap"
import {of} from "rxjs"
import {authStateSelector} from "@storage/reducer/auth";

const staticHeaders = {
  Accept: 'application/json',
};

const Api$ = (options, state) => {
  let auth = authStateSelector(state?.value)
  const url = `${options.baseUrl || ENV.baseUrl}${options.path}`;
  const query = options.params || {};
  return ajax({
    url: QS.stringifyUrl({url, query}),
    method: options.method || 'GET',
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
      ...staticHeaders,
      ...options.headers,
    },
    body: options.body,
  }).pipe(
    mergeMap((data) => {
      return of(
        {
          ...CS(data.response, {deep: true})
        }
      )
    })
  );
};

export default Api$
