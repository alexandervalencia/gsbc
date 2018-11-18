import * as actionTypes from './actionTypes';
import WeDeploy from 'wedeploy';
import { bookSortUtil, sortingOptions } from 'utils';

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

    WeDeploy.data(process.env.REACT_APP_DATABASE)
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
