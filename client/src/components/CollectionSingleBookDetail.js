import React from "react";
import { Redirect } from "react-router-dom";
import { useThemeValue } from "./ThemeContext";
import Header from "../components/Header";

export default function CollectionSingleBookDetail(props) {
  const [state, dispatch] = useThemeValue();

  const singleBook = props.location.state
    ? props.location.state.singleBook
    : null;

  return (
    <>
      <Header />

      <div className={`hero is-fullheight ` + `${state.style}`}>
        <div className="container">
          {singleBook ? (
            <div>
              <div className="columns">
                <div className="column">
                  <h1 className="title is-2">{singleBook.name}</h1>
                  <p>By: {singleBook.author}</p>
                </div>
              </div>
              <div className="columns">
                <div className="column is-one-third">
                  <img src="https://images.unsplash.com/photo-1490633874781-1c63cc424610?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" />
                </div>
                <div className="column">
                  <p>{singleBook.details}</p>
                  <div className="columns">
                    <div className="column">
                      <button className="button is-primary is-large is-fullwidth">
                        Buy Book
                      </button>
                    </div>
                    <div className="column">
                      <button className="button is-secondary is-large is-fullwidth">
                        Share book
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
