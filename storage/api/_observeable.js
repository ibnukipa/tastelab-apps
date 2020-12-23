import QS from 'query-string';
import CS from 'camelcase-keys';
import { ajax } from 'rxjs/ajax';
import { switchMap } from 'rxjs/operators';

import ENV from "@constants/env";

const staticHeaders = {
  Accept: 'application/json',
};

const Api$ = (options) => {
  const url = `${options.baseUrl || ENV.baseUrl}${options.path}`;
  const query = options.params || {};
  return ajax({
    url: QS.stringifyUrl({ url, query }),
    method: options.method || 'GET',
    headers: {
      ...staticHeaders,
      ...options.headers,
    },
    body: options.body,
  });
};

export default Api$
