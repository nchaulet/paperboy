import fetch from 'isomorphic-fetch';


function fetchData(dispatch, getState) {
  const {searchInfo} = getState();
  const page = searchInfo.get('page');
  const query = searchInfo.get('query');

  const base_url = `/api/items`;

  const params = query ? `&query=${encodeURIComponent(query)}` : '';
  fetch(`${base_url}?page=${page}${params}`)
    .then(response => response.json())
    .then(data => {
      dispatch({
        type: "RECEIVE_ITEMS",
        data: data
      });
    });
}

export function changePage(page) {
  return (dispatch, getState) => {
    dispatch({type: "REQUEST_ITEMS"});
    dispatch({type: "UPDATE_SEARCHINFO_PAGE", data: page});
    fetchData(dispatch, getState);
  };
};

export function filterQuery(query) {
  return (dispatch, getState) => {
    dispatch({type: "REQUEST_ITEMS"});

    dispatch({type: "UPDATE_SEARCHINFO_QUERY", data: query});
    fetchData(dispatch, getState);
  };
};
