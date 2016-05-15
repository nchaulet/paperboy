import React from 'react';

class ItemsTemplate extends React.Component {
  render() {
    const {items, onPageClick, page} = this.props;
    return (
      <div>
        <div className="items-listing">
          {items.map(item => {
            return (
              <div className="items-listing--item" key={item.id}>
                <div>
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
              <li><a onClick={e => onPageClick(e, page - 1)} href={`/?page=${page - 1}`}>{page - 1}</a></li>
            ) : ""}
            <li className="active"><a href="#">{page}</a></li>
            <li><a onClick={e => onPageClick(e, page + 1)} href={`/?page=${page + 1}`}>{page + 1}</a></li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default ItemsTemplate;

