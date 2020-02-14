import * as actionTypes from '../actions/actionTypes';
import { updateObjectInArrayById } from '../../utils/updateObjectInArrayById';

const initialState = {
  addingBook: false,
  books: [],
  getBooksError: [],
  failedToAddBook: false,
  failedToGetBooks: false,
  gettingBooks: false,
  sortValue: '3',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SORT_BOOKS:
      return {
        ...state,
        books: action.payload.sortedBooks,
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
        getBooksError: action.payload,
        gettingBooks: false,
      };
    case actionTypes.INIT_APP:
      return {
        ...state,
        books: action.payload.books,
      };
    case actionTypes.UPDATE_BOOK_RATING_SUCCESS:
      const updatedBooks = updateObjectInArrayById(state.books, action.payload);
      return {
        ...state,
        books: updatedBooks,
      };
    default:
      return state;
  }
};

export default reducer;
