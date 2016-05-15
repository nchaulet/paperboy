import fetch from 'isomorphic-fetch'

export function fetchPage(page) {
  return dispatch => {
    dispatch({type: "REQUEST_ITEMS"});

    fetch(`/api/items?page=${page}`)
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: "RECEIVE_ITEMS",
          data: data
        });
      });
  };
};
