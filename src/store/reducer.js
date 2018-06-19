import * as actionTypes from './actions';

const initialState = {
  books: [],
  members: [],
  ratings: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SORTER_CHANGE:
      return {
        ...state,
        books: [
          ...state.books
        ]
      }
    default:
      return state;
  }
}

export default reducer;
