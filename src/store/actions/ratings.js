import * as actionTypes from './actionTypes';
import WeDeploy from 'wedeploy';

export const getRatingsBegin = () => ({
  type: actionTypes.GET_RATINGS_BEGIN,
});

export const getRatingsSuccess = ratings => ({
  type: actionTypes.GET_RATINGS_SUCCESS,
  payload: ratings,
});

export const getRatingsFailure = error => ({
  type: actionTypes.GET_RATINGS_FAILURE,
  payload: error,
});

export const getRatings = () => {
  return dispatch => {
    dispatch(getRatingsBegin());

    WeDeploy.data(process.env.REACT_APP_DATABASE)
      .get('ratings')
      .then(ratings => {
        dispatch(getRatingsSuccess(ratings));
      })
      .catch(error => dispatch(getRatingsFailure(error)));
  };
};
