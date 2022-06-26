import { combineReducers } from 'redux';
import  homeReducer  from './app/home/store/reducers'
import userReducer from './app/user/store/reducers';
import eventReducer from './app/event/store/reducers';

const rootReducer = combineReducers({
  home: homeReducer,
  user: userReducer,
  event: eventReducer
});

export default rootReducer;