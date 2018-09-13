import * as actionTypes from '../actions/actionTypes';
import { bookSortUtil, sortingOptions } from 'utils';

const initialState = {
  books: [],
  getBooksError: [],
  failedToGetBooks: false,
  gettingBooks: false,
  ratings: [],
  sortValue: '3',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SORT_BOOKS:
      const config = sortingOptions.filter(
        opt => action.sortValue === opt.value
      )[0];
      const sortedBooks = bookSortUtil(action.books, config);
      return {
        ...state,
        books: sortedBooks,
        sortValue: action.sortValue,
      };
    case actionTypes.GET_BOOKS_BEGIN:
      return {
        ...state,
        gettingBooks: true,
      };
    case actionTypes.GET_BOOKS_SUCCESS:
      return {
        ...state,
        books: action.payload,
        failedToGetBooks: false,
        gettingBooks: false,
      };
    case actionTypes.GET_BOOKS_FAILURE:
      return {
        ...state,
        failedToGetBooks: true,
        getBooksError: action.payload.error,
        gettingBooks: false,
      };
    default:
      return state;
  }
};

export default reducer;
