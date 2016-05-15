import App from "./app";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import createStore from './store';
import {Map, List} from "immutable";

const state = {
  items: new Map({
    items: window.__STATE.items.items,
    fetching: window.__STATE.items.fetching,
    page: window.__STATE.items.page
  })
};

const store = createStore(state);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root'));
