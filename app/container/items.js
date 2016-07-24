import React from 'react';

class ItemsTemplate extends React.Component {

  renderProviderIcon(provider) {

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
    return (
      <i className="fa fa-github"></i>
    );
  }

  render() {
    const {items, onPageClick, page, total} = this.props;

    const max_page = Math.trunc(total / 20);

    return (
      <div>
        <div className="items-listing">
          {items.map(item => {
            return (
              <div className="items-listing--item" key={item.id}>
                <div>
                  {this.renderProviderIcon(item.provider)}{" "}
                  {item.data.title ? item.data.title + " : " : ""}
                  {item.data.text}
                  <br/>
                  <a href={item.data.link}>See more</a>
                </div>
              </div>
            );
          })}
        </div>
        <nav className="text-center">
          <ul className="pagination">
            {page > 1 ? (
              <li><a onClick={e => onPageClick(e, page - 1)} href={`/?page=1`}>{"<<"}</a></li>
            ) : null}
            {page > 1 ? (
              <li><a onClick={e => onPageClick(e, page - 1)} href={`/?page=${page - 1}`}>{page - 1}</a></li>
            ) : null}
            <li className="active"><a href="#">{page}</a></li>
            {page < max_page ? (
              <li><a onClick={e => onPageClick(e, page + 1)} href={`/?page=${page + 1}`}>{page + 1}</a></li>
            ) : null}
            {page < max_page ? (
              <li><a onClick={e => onPageClick(e, max_page)} href={`/?page=${max_page}`}>{">>"}</a></li>
            ) : null}
          </ul>
        </nav>
      </div>
    )
  }
}

export default ItemsTemplate;

