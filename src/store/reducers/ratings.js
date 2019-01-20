import * as actionTypes from '../actions/actionTypes';
import { updateObjectInArrayById } from '../../utils/updateObjectInArrayById';

const initialState = {
  addRatingError: false,
  addingRating: false,
  failedToGetRatings: false,
  getRatingsError: [],
  gettingRatings: false,
  ratings: [],
  updateRatingError: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_RATING_BEGIN:
      return {
        ...state,
        addRatingError: false,
        addingRating: true,
      };
    case actionTypes.ADD_RATING_FAILURE:
      return {
        ...state,
        addingRating: false,
        addRatingError: true,
      };
    case actionTypes.ADD_RATING_SUCCESS:
      return {
        ...state,
        addingRating: false,
        ratings: [...state.ratings, action.payload],
      };
    case actionTypes.GET_RATINGS_BEGIN:
      return {
        ...state,
        gettingRatings: true,
      };
    case actionTypes.GET_RATINGS_SUCCESS:
      return {
        ...state,
        ratings: action.payload,
        failedToGetRatings: false,
        gettingRatings: false,
      };
    case actionTypes.GET_RATINGS_FAILURE:
      return {
        ...state,
        failedToGetRatings: true,
        getRatingsError: action.payload.error,
        gettingRatings: false,
      };
    case actionTypes.UPDATE_RATING_SUCCESS:
      const updatedRatings = updateObjectInArrayById(state.ratings, action.payload);

      return {
        ...state,
        ratings: updatedRatings,
      };
    default:
      return state;
  }
};

export default reducer;
