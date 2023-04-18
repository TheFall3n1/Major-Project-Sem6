import { combineReducers } from 'redux';
import linksReducer from './links.reducer';

const rootReducer = combineReducers({
  links: linksReducer
});

export default rootReducer;
