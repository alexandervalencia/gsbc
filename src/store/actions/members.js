import * as actionTypes from './actionTypes';
import WeDeploy from 'wedeploy';

export const addMember = values => {
  return dispatch => {
    dispatch(addMemberBegin());

    let newMember = {
      active: true,
      email: values.email,
      nameFirst: values.nameFirst,
      nameLast: values.nameLast,
    };

    WeDeploy.data(process.env.REACT_APP_DATABASE)
      .create('members', newMember)
      .then(() => {
        dispatch(addMemberSuccess());
        dispatch(getMembers());
      })
      .catch(error => dispatch(addMemberFailure(error)));
  };
};

export const addMemberBegin = () => ({
  type: actionTypes.ADD_MEMBER_BEGIN,
});

export const addMemberFailure = error => ({
  type: actionTypes.ADD_MEMBER_FAILURE,
  payload: error,
});

export const addMemberSuccess = members => ({
  type: actionTypes.ADD_MEMBER_SUCCESS,
  payload: members,
});

export const setCurrentMember = authUser => {
  return dispatch => {
    dispatch(setCurrentMemberBegin());

    let currentMember = {};
    const currentUser = authUser || WeDeploy.auth('auth-gsbc.wedeploy.io').currentUser;
    const members = WeDeploy.data(process.env.REACT_APP_DATABASE).get('members');

    Promise.all([currentUser, members]).then(([curUser, mbrs]) => {
      if (curUser && mbrs) {
        currentMember = mbrs.filter(member => member.userId === currentUser.id).pop();

        dispatch(setCurrentMemberSuccess(currentMember));
      } else {
        dispatch(setCurrentMemberFailure(currentMember));
      }
    });
  };
};

export const setCurrentMemberBegin = () => ({
  type: actionTypes.SET_CURRENT_MEMBER_BEGIN,
});

export const setCurrentMemberFailure = noMember => ({
  type: actionTypes.SET_CURRENT_MEMBER_FAILURE,
  payload: noMember,
});

export const setCurrentMemberSuccess = currentMember => ({
  type: actionTypes.SET_CURRENT_MEMBER_SUCCESS,
  payload: currentMember,
});

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
