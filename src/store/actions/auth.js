import * as actionTypes from './actionTypes';
import WeDeploy from 'wedeploy';

const auth = WeDeploy.auth('https://auth-gsbc.wedeploy.io');

export const getCurrentUserSuccess = currentUser => ({
  type: actionTypes.GET_CURRENT_USER_SUCCESS,
  payload: currentUser,
});

export const getCurrentUserNone = () => ({
  type: actionTypes.GET_CURRENT_USER_NONE,
});

export const getCurrentUser = () => {
  return dispatch => {
    const currentUser = auth.currentUser;

    if (currentUser) {
      dispatch(getCurrentUserSuccess(currentUser));
    } else {
      dispatch(getCurrentUserNone());
    }
  };
};

export const submitSignInBegin = () => ({
  type: actionTypes.SUBMIT_SIGN_IN_BEGIN,
});

export const submitSignIn = (email, password) => {
  return dispatch => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(currentUser => {
        dispatch(submitSignInSuccess(currentUser));
      })
      .catch(error => dispatch(submitSignInFailure(error)));
  };
};

export const submitSignInSuccess = currentUser => ({
  type: actionTypes.SUBMIT_SIGN_IN_SUCCESS,
  payload: currentUser,
});

export const submitSignInFailure = () => ({
  type: actionTypes.SUBMIT_SIGN_IN_FAILURE,
});

export const signOutCurrentUser = () => ({
  type: actionTypes.SIGN_OUT,
});
