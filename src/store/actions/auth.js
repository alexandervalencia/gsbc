import * as actionTypes from './actionTypes';
import WeDeploy from 'wedeploy';

export const getCurrentUserSuccess = currentUser => ({
  type: actionTypes.GET_CURRENT_USER_SUCCESS,
  payload: currentUser,
});

export const getCurrentUserNone = () => ({
  type: actionTypes.GET_CURRENT_USER_NONE,
});

export const getCurrentUser = () => {
  return dispatch => {
    const currentUser = WeDeploy.auth('https://auth-gsbc.wedeploy.io')
      .currentUser;

    if (currentUser) {
      dispatch(getCurrentUserSuccess(currentUser));
    } else {
      dispatch(getCurrentUserNone());
    }
  };
};

export const signOutCurrentUser = () => ({
  type: actionTypes.SIGN_OUT,
});
