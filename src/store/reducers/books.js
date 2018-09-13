import * as actionTypes from '../actions/actionTypes';
import { bookSortUtil /* , SortOptionsList */ } from 'utils';

const initialState = {
  books: [],
  getBooksError: [],
  failedToGetBooks: false,
  gettingBooks: false,
  members: [],
  ratings: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SORT_BOOKS:
      const sortedBooks = bookSortUtil(state.books, action.payload);
      return {
        ...state,
        books: sortedBooks,
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
