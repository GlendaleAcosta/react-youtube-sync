import { combineReducers } from 'redux';
import userReducer from './userReducer';
import modalReducer from './modalReducer';
import youtubeReducer from './YouTubeReducer';
import roomReducer from './roomReducer';

const reducers = combineReducers({
  userReducer,
  modalReducer,
  youtubeReducer,
  roomReducer
});

export default reducers;
