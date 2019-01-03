import * as actionTypes from './actionTypes';
import WeDeploy from 'wedeploy';
import { bookSortUtil, newBookConfig, sortingOptions } from 'utils';

const weDeployData = WeDeploy.data(process.env.REACT_APP_DATABASE);

export const addBook = values => {
  return dispatch => {
    dispatch(addBookBegin());

    let newBook = newBookConfig(values);

    weDeployData
      .create('books', newBook)
      .then(function(book) {
        dispatch(addBookSuccess());
        dispatch(getBooks());
      })
      .catch(error => dispatch(addBookFailure(error)));
  };
};

export const addBookBegin = () => ({
  type: actionTypes.ADD_BOOK_BEGIN,
});

export const addBookFailure = error => ({
  type: actionTypes.ADD_BOOK_FAILURE,
  payload: error,
});

export const addBookSuccess = books => ({
  type: actionTypes.ADD_BOOK_SUCCESS,
  payload: books,
});

export const getBooksBegin = () => ({
  type: actionTypes.GET_BOOKS_BEGIN,
});

export const getBooksSuccess = books => ({
  type: actionTypes.GET_BOOKS_SUCCESS,
  payload: books,
});

export const getBooksFailure = error => ({
  type: actionTypes.GET_BOOKS_FAILURE,
  payload: error,
});

export const getBooks = (sortValue = '3') => {
  return dispatch => {
    dispatch(getBooksBegin());

    weDeployData
      .get('books')
      .then(books => {
        const config = sortingOptions.filter(opt => sortValue === opt.value)[0];
        const sortedBooks = bookSortUtil(books, config);

        dispatch(getBooksSuccess(sortedBooks));
      })
      .catch(error => dispatch(getBooksFailure(error)));
  };
};

export const sortBooks = (books, sortValue) => ({
  type: actionTypes.SORT_BOOKS,
  payload: {
    books: books,
    sortValue: sortValue,
  },
});
