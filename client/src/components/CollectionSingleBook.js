import React from "react";
import { Link } from "react-router-dom";
export default function CollectionSingleBook(props) {
  return (
    <div>
      <Link
        to={{
          pathname: `/collection/${props.book.id}`,
          state: { singleBook: props.book }
        }}
      >
        <img src="https://images.unsplash.com/photo-1490633874781-1c63cc424610?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" />
      </Link>
    </div>
  );
}
