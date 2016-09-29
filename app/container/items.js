import React from 'react';
import Item from '../component/item';

class ItemsTemplate extends React.Component {
  render() {
    const {items, onPageClick, page, total} = this.props;

    const max_page = Math.trunc(total / 20);

    return (
      <div>
        <div className="items-listing">
          {items.map(item => {
            return (
              <Item key={item.id} item={item} />
            )
          })}
        </div>
        <nav className="text-center">
          <ul className="pagination">
            {page > 1 ? (
              <li><a onClick={e => onPageClick(e, 1)} href={`/?page=1`}>{"<<"}</a></li>
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

