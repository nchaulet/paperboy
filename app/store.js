import { createStore, combineReducers, applyMiddleware } from 'redux';
import * as reducers from './reducers';
import thunk from 'redux-thunk';

export default function(initialState = {}) {
  const store = createStore(
    combineReducers(reducers),
    initialState,
    applyMiddleware(thunk)
  );

  return store;
};
