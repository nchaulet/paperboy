import {Map, List} from "immutable";

const DEFAULT_STATE = Map({
  items: List(),
  fetching: false,
  total: 0,
  page: 1
});

export default function(state = DEFAULT_STATE, action) {

  switch(action.type) {
    case "REQUEST_ITEMS":
      return state.set("fetching", true)
        .set("items", List());
    case "RECEIVE_ITEMS":
      return state
        .set("fetching", false)
        .set("page", parseInt(action.data.page))
        .set("total", parseInt(action.data.total))
        .set("items", List(action.data.data));
    default:
     return state;
  }

};
