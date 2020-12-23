import Api$ from "@storage/api/_observeable";

const postLogin$ = ({
  additionalHeaders,
  additionalParams,
  additionalBody,
}) =>
  Api$({
    path: '/oauth/token',
    method: 'POST',
    params: additionalParams,
    headers: additionalHeaders,
    body: {
      "grant_type": "password",
      "client_id": "7",
      "client_secret": "7NDniuscI4542dXzaUiCTN79iIuuMNiQ0wcItmxa",
      ...additionalBody
    }
  });

export default postLogin$
