import React from "react";
import {fetchPage} from "./actionsCreator";
import ItemsList from './container/items';
import { connect } from 'react-redux';

class App extends React.Component {
  handlePageClick(event, page) {
    event.preventDefault();
    this.props.dispatch(fetchPage(page));
  }

  render() {
    const {items, page, fetching} = this.props;

    return (
      <div className="container">
        <style>
          {`
            .items-listing--item {padding: 5px;}
            .items-listing--item:nth-child(odd) {background: #FBFBFB}
          `}
        </style>
        <h1>Paperboy</h1>
        {fetching ?
          "Loading" :
          <ItemsList items={items} page={page} onPageClick={this.handlePageClick.bind(this)} />
        }
      </div>
    );
  }
}

function stateToProps(state) {
  return {
    items: state.items.get('items'),
    fetching: state.items.get('fetching'),
    page: state.items.get('page')
  };
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch
  };
};

export default connect(stateToProps, mapDispatchToProps)(App);

