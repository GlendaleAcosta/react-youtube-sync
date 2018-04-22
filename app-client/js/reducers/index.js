import { combineReducers } from 'redux';
import userReducer from './userReducer';
import modalReducer from './modalReducer';
import youtubeReducer from './YouTubeReducer';

const reducers = combineReducers({
  userReducer,
  modalReducer,
  youtubeReducer
});

export default reducers;
