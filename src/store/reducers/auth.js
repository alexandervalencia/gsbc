import * as actionTypes from '../actions/actionTypes';

const initialState = {
  currentUser: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
      };
    case actionTypes.GET_CURRENT_USER_NONE:
      return {
        ...state,
        currentUser: {},
      };
    default:
      return state;
  }
};

export default reducer;
