import Api$ from "@storage/api/_observeable";

const getMaterials$ = ({
  additionalHeaders,
  additionalParams,
}, state$) =>
  Api$({
    path: '/raw-materials',
    method: 'GET',
    params: additionalParams,
    headers: additionalHeaders,
  }, state$);

export default getMaterials$
