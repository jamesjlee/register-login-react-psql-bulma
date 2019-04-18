import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import CollectionSingleBook from "./CollectionSingleBook";
import BookData from "../data/books";
import { connect } from "react-redux";
import * as actions from "../actions";
import { useThemeValue } from "./ThemeContext";
// import styles from '../styles/Collection.css';

function Collection(props) {
  const [books, setBooks] = useState([]);
  const [state, dispatch] = useThemeValue();

  useEffect(() => {
    props.getSecret();
    setBooks(BookData);
  });

  return (
    <div className={`hero is-fullheight ` + `${state.style}`}>
      <Header />
      <div className="container has-gutter-top-bottom">
        <h1 className="tittle is-2">Your Book Collection {props.secret}</h1>
        <div className="columns is-multiline">
          {books.map((book) => (
            <div className="column is-3" key={book.id}>
              <CollectionSingleBook book={book} />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    secret: state.collection.secret
  };
}

export default connect(
  mapStateToProps,
  actions
)(Collection);
