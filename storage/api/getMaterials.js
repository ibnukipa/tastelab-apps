import Api$ from "@storage/api/_observeable";

const staticOptions = {
  path: '/raw-materials',
  method: 'GET',
  params: {},
  headers: {
    // todo: make the token stored in redux-state (create login flow with or without UI)
    Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI3IiwianRpIjoiMmRlODRiZjgyYzBhNjg0NGI5NzI5ZjVlNzk0ZThlNjRlOWMxODg2ZGRlYjAwN2E5MjU3ODJkZjAyOTFjZTI4NTc3ZDBhYTE1ZTRmYmZiYmMiLCJpYXQiOjE2MDgzNDczNTgsIm5iZiI6MTYwODM0NzM1OCwiZXhwIjoxNjM5ODgzMzU4LCJzdWIiOiIxNDAiLCJzY29wZXMiOltdfQ.f4eWfsC_w_vc9x8wHxkmV5UIe78Z8dWBiHk31x-eopRKr2cdi3NhfD-V3aUj6ngZa38tgj1kwrchp_J5SaBa4CDoViCupj3GvxMZeKYwdcvu6WCMYiYuOCjlvvAGBMjCgTyubDeXBwiFDcs2GNa-80joFZKdQH7UiA0kVxxEP5S2ExdLIgI5vkyJb_6yysIozVonG9Elq5dTzb-Z-MBGPZdzBDVghNWko7LPCHGjtV9OpAJkRPmNRilkRG-YTHTRBeEW2JFWeGf_TtIguip_MOoDnfoE10-8fEb9Odvdu_Gz9ufWVlgCRWjCNPfEAzx8ooYcLSxxNptrJl1Nj1umkAJv9h86rh0Rk6qqPrved0wTTokospzVWQZVs7OAPlD2SrLXq1Cw3uS8xFjFb4TkjKUJVvi6_5wKpEBrzBFPFBVcicNoXQvBMV3lZG1Dm7Qk3KTSe8paljBUl9aKrnE-FvqBNQWf0hO4Rdy5TQ70HxZrae-JpxY3bE670kgE0LsrXbdb5Ir0TJsCmB32tjsNOMbHQX8kuXVgu4dIsg1qgrsrjlVWtgalIYJLMe_0LGC9lLU0LjqtZ4uzQrMVmA6r_sQ1Ms49apJmZ5kKSE0Gc31GtJL9WJkGGCyI3kR12L4hQ1ErpFlR8RC-Tuba1HqPiwSMYUGw0wYL3nIYqp1en00`,
  },
}

const getMaterials$ = ({
  additionalHeaders,
  additionalParams,
}) =>
  Api$({
    ...staticOptions,
    params: {
      ...staticOptions.params,
      ...(additionalParams || {}),
    },
    headers: {
      ...staticOptions.headers,
      ...(additionalHeaders || {}),
    },
  });

export default getMaterials$
