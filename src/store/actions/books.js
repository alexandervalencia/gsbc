import * as actionTypes from './actionTypes';
import WeDeploy from 'wedeploy';

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

export const getBooks = () => {
  return dispatch => {
    dispatch(getBooksBegin());

    WeDeploy.data(process.env.REACT_APP_DATABASE)
      .get('books')
      .then(books => {
        dispatch(getBooksSuccess(books));
      })
      .catch(error => dispatch(getBooksFailure(error)));
  };
};

export const sortBooks = books => {
  return {
    type: actionTypes.SORT_BOOKS,
    payload: books,
  };
};
