import React from "react";
import {changePage, filterQuery} from "./actionsCreator";
import ItemsList from './container/items';
import { connect } from 'react-redux';
import { debounce } from 'lodash';

const debounceSearch = debounce((searchFn) => {
  return searchFn();
}, 300);

class App extends React.Component {
  handlePageClick(event, page) {
    event.preventDefault();
    this.props.dispatch(changePage(page));
  }

  handleSearch(event) {
    event.preventDefault();

    const { value } = event.target;
    debounceSearch(() => {
      this.props.dispatch(filterQuery(value));
    });
  }

  render() {
    const {items, page, total, fetching} = this.props;

    return (
      <div className="container">
        <style>
          {`
            .items-listing--item {padding: 5px;}
            .items-listing--item:nth-child(odd) {background: #FBFBFB;}

            .search-bar input {border: none; margin: 0 10px;}
          `}
        </style>
        <h1>Paperboy</h1>
        <hr />
        <div className="search-bar">
          <i className="fa fa-search" />
          <input type="text" placeholder="search ..." onChange={e => this.handleSearch(e)} />
        </div>
        {fetching ?
          (
            <h2 className="text-center">
              <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
            </h2>
          ):
          <ItemsList items={items} page={page} total={total} onPageClick={this.handlePageClick.bind(this)} />
        }
      </div>
    );
  }
}

function stateToProps(state) {
  return {
    items: state.items.get('items'),
    fetching: state.items.get('fetching'),
    total: state.items.get('total'),
    page: state.searchInfo.get('page'),
    query: state.searchInfo.get('query')
  };
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch
  };
};

export default connect(stateToProps, mapDispatchToProps)(App);

