import { createStore, combineReducers, applyMiddleware, compose} from 'redux';
import * as reducers from './reducers';
import thunk from 'redux-thunk';

function initDevtool() {
  try {
    if (window) return window.devToolsExtension();
  } catch(e) {}

  return f => f;
}



export default function(initialState = {}) {
  const store = createStore(
    combineReducers(reducers),
    initialState,
    compose(
      applyMiddleware(thunk),
      initDevtool()
    )
  );

  return store;
};
