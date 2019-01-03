import * as actionTypes from '../actions/actionTypes';
import { bookSortUtil, sortingOptions } from 'utils';

const initialState = {
  addingBook: false,
  books: [],
  getBooksError: [],
  failedToAddBook: false,
  failedToGetBooks: false,
  gettingBooks: false,
  ratings: [],
  sortValue: '3',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SORT_BOOKS:
      const config = sortingOptions
        .filter(opt => action.payload.sortValue === opt.value)
        .pop();
      const sortedBooks = bookSortUtil(action.payload.books, config);
      return {
        ...state,
        books: sortedBooks,
        sortValue: action.payload.sortValue,
      };
    case actionTypes.ADD_BOOK_BEGIN:
      return {
        ...state,
        addingBook: true,
      };
    case actionTypes.ADD_BOOK_FAILURE:
      return {
        ...state,
        addingBook: false,
        failedToAddBook: true,
      };
    case actionTypes.ADD_BOOK_SUCCESS:
      return {
        ...state,
        failedToAddBook: false,
        gettingBooks: false,
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
