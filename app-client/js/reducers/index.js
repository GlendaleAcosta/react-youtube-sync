import { combineReducers } from 'redux';
import userReducer from './userReducer';
import modalReducer from './modalReducer';

const reducers = combineReducers({
  userReducer,
  modalReducer
});

export default reducers;
