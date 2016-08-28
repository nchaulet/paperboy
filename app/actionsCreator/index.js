import fetch from 'isomorphic-fetch';


function fetchData(dispatch, getState) {
  const {searchInfo} = getState();
  const page = searchInfo.get('page');
  const query = searchInfo.get('query');
  const github = searchInfo.get('github');
  const twitter = searchInfo.get('twitter');

  const base_url = `/api/items`;

  let params = query ? `&query=${encodeURIComponent(query)}` : '';

  if (twitter) {
    params += '&providers[]=twitter';
  }

  if (github) {
    params += '&providers[]=github';
  }

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

export function filterProvider(provider, state) {
  return (dispatch, getState) => {
    dispatch({type: "REQUEST_ITEMS"});

    dispatch({type: "UPDATE_SEARCHINFO_PROVIDER", data: {
      provider, state
    }});
    fetchData(dispatch, getState);
  };
};
