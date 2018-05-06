import { combineReducers } from 'redux';
import userReducer from './userReducer';
import modalReducer from './modalReducer';
import youtubeReducer from './YouTubeReducer';
import roomReducer from './roomReducer';
import chatReducer from './chatReducer';

const reducers = combineReducers({
  userReducer,
  modalReducer,
  youtubeReducer,
  roomReducer,
  chatReducer
});

export default reducers;
