import WeDeploy from 'wedeploy';

import * as actionTypes from './actionTypes';
import { addMember, setCurrentMember } from './members';

const auth = WeDeploy.auth('https://auth-gsbc.wedeploy.io');

export const addUser = values => {
  return dispatch => {
    dispatch(addUserBegin());

    let newUser = {
      email: values.email,
      password: values.password,
      name: `${values.nameFirst} ${values.nameLast}`,
    };

    auth
      .createUser(newUser)
      .then(() => {
        dispatch(addUserSuccess());
        dispatch(addMember(values));
        dispatch(submitSignIn(values.email, values.password));
      })
      .catch(error => dispatch(addUserFailure(error)));
  };
};

export const addUserBegin = () => ({
  type: actionTypes.ADD_USER_BEGIN,
});

export const addUserFailure = error => ({
  type: actionTypes.ADD_USER_FAILURE,
  payload: error,
});

export const addUserSuccess = () => ({
  type: actionTypes.ADD_USER_SUCCESS,
});

export const resetPassword = email => dispatch => {
  dispatch(resetPasswordBegin());
  // console.log(email);
  auth
    .sendPasswordResetEmail(email)
    .then(() => {
      // Email sent.
      dispatch(resetPasswordSuccess());
    })
    .catch(error => {
      //An error happened.
      dispatch(resetPasswordFailure(error));
    });
};

export const resetPasswordBegin = () => ({
  type: actionTypes.RESET_PASSWORD_BEGIN,
});

export const resetPasswordFailure = () => ({
  type: actionTypes.RESET_PASSWORD_FAILURE,
});

export const resetPasswordSuccess = () => ({
  type: actionTypes.RESET_PASSWORD_SUCCESS,
});

export const setCurrentUserSuccess = currentUser => ({
  type: actionTypes.SET_CURRENT_USER_SUCCESS,
  payload: currentUser,
});

export const setCurrentUserFailure = () => ({
  type: actionTypes.SET_CURRENT_USER_FAILURE,
});

export const setCurrentUser = () => {
  return dispatch => {
    const currentUser = auth.currentUser;

    if (currentUser) {
      dispatch(setCurrentUserSuccess(currentUser));
      dispatch(setCurrentMember(currentUser));
    } else {
      dispatch(setCurrentUserFailure());
    }
  };
};

export const submitSignInBegin = () => ({
  type: actionTypes.SUBMIT_SIGN_IN_BEGIN,
});

export const submitSignIn = (email, password, setStatus, setSubmitting) => {
  return dispatch => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(currentUser => {
        dispatch(submitSignInSuccess(currentUser));
        setSubmitting(false);
      })
      .catch(error => {
        dispatch(submitSignInFailure(error));
        setSubmitting(false);
        setStatus({ password: 'Incorrect password, please try again' });
      });
  };
};

export const submitSignInSuccess = currentUser => ({
  type: actionTypes.SUBMIT_SIGN_IN_SUCCESS,
  payload: currentUser,
});

export const submitSignInFailure = error => ({
  type: actionTypes.SUBMIT_SIGN_IN_FAILURE,
  payload: error,
});

export const signOutCurrentUser = () => ({
  type: actionTypes.SIGN_OUT,
});

export const submitSignOut = () => dispatch => {
  WeDeploy.auth('https://auth-gsbc.wedeploy.io').signOut();

  dispatch(signOutCurrentUser());
};
