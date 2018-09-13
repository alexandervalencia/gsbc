import * as actionTypes from '../actions/actionTypes';

const initialState = {
  failedToGetRatings: false,
  getRatingsError: [],
  gettingRatings: false,
  ratings: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_MEMBERS_BEGIN:
      return {
        ...state,
        gettingRatings: true,
      };
    case actionTypes.GET_MEMBERS_SUCCESS:
      return {
        ...state,
        ratings: action.payload,
        failedToGetRatings: false,
        gettingRatings: false,
      };
    case actionTypes.GET_MEMBERS_FAILURE:
      return {
        ...state,
        failedToGetRatings: true,
        getRatingsError: action.payload.error,
        gettingRatings: false,
      };
    default:
      return state;
  }
};

export default reducer;
