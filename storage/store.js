import {createEpicMiddleware} from 'redux-observable'

import {configureStore} from '@reduxjs/toolkit'
import reducers from '@storage/reducer'
import epics from '@storage/epics'
import ENV from "@constants/env"

const epicMiddleware = createEpicMiddleware()
const store = configureStore({
  reducer: reducers,
  middleware: [epicMiddleware],
  devTools: ENV.envName !== 'PRODUCTION',
});
epicMiddleware.run(epics)

export {store};
