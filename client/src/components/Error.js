import React from "react";

export default function Error(props) {
  const { errorMsg } = props.location.search;

  return (
    <div className="columns">
      <div className="column">
        <h1 className="title is-2">An Error Occurred.</h1>
        <p>{errorMsg}</p>
      </div>
    </div>
  );
}
