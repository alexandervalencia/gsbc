import React, { Component, createContext } from 'react';
import { firestore } from '../firebase';
import { collectIdsAndDocs } from '../utils/firebaseUtil';
import { bookSorter } from '../utils/booksUtils';
import { sortingOptions } from '../utils/sortingOptions';
import * as sortOpts from '../utils/sortingOptions';

export const BooksContext = createContext();

class BooksProvider extends Component {
  state = {
    books: [],
    orderBy: sortOpts.DATE_DESCENDING,
  };

  unsubscribeFromFirestore = null;

  getBooksFromFirestore = () => {
    const { orderBy } = this.state;
    const sortConfig = sortingOptions.find(option => option.value === orderBy);

    this.unsubscribeFromFirestore = firestore
      .collection('books')
      .orderBy(sortConfig.type, sortConfig.direction)
      .onSnapshot(snapshot => {
        let books = snapshot.docs.map(collectIdsAndDocs);

        if (sortConfig.type === 'author' || sortConfig.type === 'title') {
          books = bookSorter(books, sortConfig);
        }

        this.setState({ books });
      });
  };

  setOrderBy = orderBy => {
    this.setState({ orderBy });
  };

  componentDidMount = () => {
    this.getBooksFromFirestore();
  };

  componentDidUpdate = (_, prevState) => {
    if (prevState.orderBy !== this.state.orderBy) this.getBooksFromFirestore();
  };

  componentWillUnmount = () => {
    this.unsubscribeFromFirestore();
  };

  render() {
    const { books, orderBy } = this.state;
    const { children } = this.props;

    return (
      <BooksContext.Provider value={{ books, orderBy, setOrderBy: this.setOrderBy }}>{children}</BooksContext.Provider>
    );
  }
}

export default BooksProvider;
