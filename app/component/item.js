import React from 'react';
import Linkify from 'react-linkify';

function renderProviderIcon(provider) {

  if (provider === "github") {
    return (
      <i className="fa fa-github"></i>
    );
  }

  if (provider === "twitter") {
    return (
      <i className="fa fa-twitter"></i>
    );
  }

  return null;
}

function renderText(text) {
  return <Linkify>{text}</Linkify>;
}

class Item extends React.Component {
  render() {
    const {item} = this.props;

    return (
      <div className="items-listing--item" key={item.id}>
        <div>
          {renderProviderIcon(item.provider)}{" "}
          {item.data.title ? item.data.title + " : " : ""}
          {renderText(item.data.text)}
          <br/>
          <a href={item.data.link}>See more</a>
        </div>
      </div>
    );
  }
}

export default Item;

