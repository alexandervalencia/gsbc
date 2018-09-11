import WeDeploy from 'wedeploy';

export const SORT_BOOKS = 'SORT_BOOKS';

export const GET_BOOKS_BEGIN = 'GET_BOOKS_BEGIN';
export const GET_BOOKS_SUCCESS = 'GET_BOOKS_SUCCESS';
export const GET_BOOKS_FAILURE = 'GET_BOOKS_FAILURE';

export const getBooksBegin = () => ({
  type: GET_BOOKS_BEGIN,
});

export const getBooksSuccess = books => ({
  type: GET_BOOKS_SUCCESS,
  payload: { books },
});

export const getBooksFailure = error => ({
  type: GET_BOOKS_FAILURE,
  payload: { error },
});

export function getBooks() {
  return dispatch => {
    dispatch(getBooksBegin());

    return WeDeploy.data(process.env.REACT_APP_DATABASE)
      .get('books')
      .then(books => {
        dispatch(getBooksSuccess(books));

        return books;
      })
      .catch(error => dispatch(getBooksFailure(error)));
  };
}
