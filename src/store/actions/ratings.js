// import WeDeploy from 'wedeploy';

// import * as actionTypes from './actionTypes';

// const data = WeDeploy.data(process.env.REACT_APP_DATABASE);

// export const addRating = (bookId, memberId, ratingValue) => dispatch => {
//   dispatch(addRatingBegin());

//   data
//     .create('ratings', {
//       bookId: bookId,
//       memberId: memberId,
//       ratingValue: ratingValue,
//     })
//     .then(rating => {
//       dispatch(addRatingSuccess(rating));
//     })
//     .catch(error => dispatch(addRatingFailure(error)));
// };

// export const addRatingBegin = () => ({
//   type: actionTypes.ADD_RATING_BEGIN,
// });

// export const addRatingFailure = error => ({
//   type: actionTypes.ADD_RATING_FAILURE,
//   payload: error,
// });

// export const addRatingSuccess = rating => ({
//   type: actionTypes.ADD_RATING_SUCCESS,
//   payload: rating,
// });

// export const getRatingsBegin = () => ({
//   type: actionTypes.GET_RATINGS_BEGIN,
// });

// export const getRatingsSuccess = ratings => ({
//   type: actionTypes.GET_RATINGS_SUCCESS,
//   payload: ratings,
// });

// export const getRatingsFailure = error => ({
//   type: actionTypes.GET_RATINGS_FAILURE,
//   payload: error,
// });

// export const getRatings = () => dispatch => {
//   dispatch(getRatingsBegin());

//   data
//     .get('ratings')
//     .then(ratings => {
//       dispatch(getRatingsSuccess(ratings));
//     })
//     .catch(error => dispatch(getRatingsFailure(error)));
// };

// export const updateRating = (ratingValue, ratingId) => dispatch => {
//   dispatch(updateRatingBegin());

//   data
//     .update(`ratings/${ratingId}`, { ratingValue: ratingValue })
//     .then(rating => {
//       data.get(`ratings/${ratingId}`).then(newRating => dispatch(updateRatingSuccess(newRating)));
//     })
//     .catch(error => dispatch(updateRatingFailure(error)));
// };

// export const updateRatingBegin = () => ({
//   type: actionTypes.UPDATE_RATING_BEGIN,
// });

// export const updateRatingFailure = error => ({
//   type: actionTypes.UPDATE_RATING_FAILURE,
//   payload: error,
// });

// export const updateRatingSuccess = rating => ({
//   type: actionTypes.UPDATE_RATING_SUCCESS,
//   payload: rating,
// });
