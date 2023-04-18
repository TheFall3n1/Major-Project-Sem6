import { createStore, applyMiddleware } from 'redux';
import { composeWithDevToolsDevelopmentOnly } from '@redux-devtools/extension';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  composeWithDevToolsDevelopmentOnly(applyMiddleware(thunk))
);

export default store;
