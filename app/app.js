import React from "react";

export default function(props) {
  const {items, page} = props;

  return (
    <div className="container">
      <style>
        {`
          .items-listing--item {padding: 5px;}
          .items-listing--item:nth-child(odd) {background: #FBFBFB}
        `}
      </style>
      <h1>Paperboy</h1>
      <div className="items-listing">
        {props.items.map(item => {
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
            <li><a href={`/?page=${page - 1}`}>{page - 1}</a></li>
          ) : ""}
          <li><a>{page}</a></li>
          <li><a href={`/?page=${page + 1}`}>{page + 1}</a></li>
        </ul>
      </nav>
    </div>
  );
};
