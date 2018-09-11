import * as actionTypes from './actions';
import { BookSortUtil, SortOptionsList } from 'utils';

const initialState = {
  books: [],
  members: [],
  ratings: [],
};

const onSorterChange = function(event) {
  const sortValue = event.target.value;
  let config;

  SortOptionsList.forEach(option => {
    if (sortValue === option.value) {
      config = option;
    }
  });

  const sortedBooks = BookSortUtil(this.state.books, config);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SORT_BOOKS:
      const sortedBooks = BookSortUtil(state.books, action.payload.value);

      return {
        ...state,
        books: sortedBooks,
      };
    default:
      return state;
  }
};

export default reducer;
