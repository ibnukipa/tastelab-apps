import { combineReducers } from 'redux';

import material from './material'
import db from './db'

const reducers = {
  material,
  db
};

export default combineReducers(reducers)
