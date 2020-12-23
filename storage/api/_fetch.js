import QS from 'query-string';
import CS from 'camelcase-keys';
import ENV from "@constants/env";

const staticHeaders = {
  Accept: 'application/json',
};

const ApiFetch = (options) => () => {
  const url = `${options.baseUrl || ENV.baseUrl}${options.path}`;
  const query = options.params || {};
  return fetch(QS.stringifyUrl({ url, query }), {
    method: options.method || 'GET',
    headers: {
      ...staticHeaders,
      ...options.headers,
    },
    body: options.body,
  }).then((response) => CS(response.json(), { deep: true }));
};

export default ApiFetch
