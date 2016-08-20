'use strict';

import {Map, List} from "immutable";

export function searchInfo(state = new Map({page: 1, query: null}), action) {
  switch (action.type) {
    case 'UPDATE_SEARCHINFO_PAGE':
      return state.set('page', action.data);
    case 'UPDATE_SEARCHINFO_QUERY':
      return state
        .set('page', 1)
        .set('query', action.data);
    default: return state;
  }
};

const DEFAULT_ITEMS_STATE = Map({
  items: List(),
  fetching: false,
  total: 0,
  query: null
});

export function items(state = DEFAULT_ITEMS_STATE, action) {
  switch(action.type) {
    case "SEARCH_QUERY":
    case "REQUEST_ITEMS":
      return state.set("fetching", true)
        .set("items", List());
    case "RECEIVE_ITEMS":
      return state
        .set("fetching", false)
        .set("total", parseInt(action.data.total))
        .set("items", List(action.data.data));
    default:
     return state;
  }
};
