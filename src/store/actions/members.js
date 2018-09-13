import * as actionTypes from './actionTypes';
import WeDeploy from 'wedeploy';

export const getMembersBegin = () => ({
  type: actionTypes.GET_MEMBERS_BEGIN,
});

export const getMembersSuccess = members => ({
  type: actionTypes.GET_MEMBERS_SUCCESS,
  payload: members,
});

export const getMembersFailure = error => ({
  type: actionTypes.GET_MEMBERS_FAILURE,
  payload: error,
});

export const getMembers = () => {
  return dispatch => {
    dispatch(getMembersBegin());

    WeDeploy.data(process.env.REACT_APP_DATABASE)
      .get('members')
      .then(members => {
        dispatch(getMembersSuccess(members));
      })
      .catch(error => dispatch(getMembersFailure(error)));
  };
};
