// TODO move out db from redux state, use such as SQL/Realm instead
import {createSelector, createSlice} from '@reduxjs/toolkit';
import {normalize} from "normalizr"
import pluralize from 'pluralize'
import {forEach} from 'lodash-es'

import * as schemas from './schema'

const initialState = {};

// slicer
export const NAME = 'DB';
export const DBSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    normalizeResponse: (state, action) => {
      const {modelName, data} = action.payload;
      const pluralModelName = pluralize(modelName)
      const originalData = {[pluralModelName]: data}
      const {entities} = normalize(originalData, {[pluralModelName]: [schemas[modelName]]});
      forEach(entities, (value, key) => {
        const oldValue = state[key] || {}
        state[key] = {
          ...oldValue,
          ...value
        }
      })
    },
  },
});

// selectors
export const dbModelSelector = createSelector(
  (state, {modelName}) => [state.db, pluralize(modelName)],
  ([db, modelName]) => db?.[modelName] || {}
);
export const dbIdSelector = createSelector(
  (state, {modelName, id}) => [state.db?.[pluralize(modelName)], id],
  ([table, id]) => table?.[id] || {}
);

// actions
export const {
  normalizeResponse
} = DBSlice.actions;

export default DBSlice.reducer;
