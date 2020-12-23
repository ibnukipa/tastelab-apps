import {combineReducers} from 'redux';

import material from './material'
import db from './db'
import auth from './auth'

const reducers = {
  material,
  db,
  auth,
};

export default combineReducers(reducers)
