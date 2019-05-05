// import * as actionTypes from './actionTypes';
// import WeDeploy from 'wedeploy';

// export const addUser = values => {
//   return dispatch => {
//     dispatch(addUserBegin());

//     let newUser = {
//       active: true,
//       email: values.email,
//       nameFirst: values.nameFirst,
//       nameLast: values.nameLast,
//     };

//     WeDeploy.data(process.env.REACT_APP_DATABASE)
//       .create('users', newUser)
//       .then(() => {
//         dispatch(addUserSuccess());
//         dispatch(getUsers());
//       })
//       .catch(error => dispatch(addUserFailure(error)));
//   };
// };

// export const addUserBegin = () => ({
//   type: actionTypes.ADD_USER_BEGIN,
// });

// export const addUserFailure = error => ({
//   type: actionTypes.ADD_USER_FAILURE,
//   payload: error,
// });

// export const addUserSuccess = users => ({
//   type: actionTypes.ADD_USER_SUCCESS,
//   payload: users,
// });

// export const setCurrentUser = authUser => {
//   return dispatch => {
//     dispatch(setCurrentUserBegin());

//     let currentUser = {};
//     const currentUser = authUser || WeDeploy.auth('auth-gsbc.wedeploy.io').currentUser;
//     const users = WeDeploy.data(process.env.REACT_APP_DATABASE).get('users');

//     Promise.all([currentUser, users]).then(([curUser, mbrs]) => {
//       if (curUser && mbrs) {
//         currentUser = mbrs.filter(user => user.userId === currentUser.id).pop();

//         dispatch(setCurrentUserSuccess(currentUser));
//       } else {
//         dispatch(setCurrentUserFailure(currentUser));
//       }
//     });
//   };
// };

// export const setCurrentUserBegin = () => ({
//   type: actionTypes.SET_CURRENT_USER_BEGIN,
// });

// export const setCurrentUserFailure = noUser => ({
//   type: actionTypes.SET_CURRENT_USER_FAILURE,
//   payload: noUser,
// });

// export const setCurrentUserSuccess = currentUser => ({
//   type: actionTypes.SET_CURRENT_USER_SUCCESS,
//   payload: currentUser,
// });

// export const getUsersBegin = () => ({
//   type: actionTypes.GET_USERS_BEGIN,
// });

// export const getUsersSuccess = users => ({
//   type: actionTypes.GET_USERS_SUCCESS,
//   payload: users,
// });

// export const getUsersFailure = error => ({
//   type: actionTypes.GET_USERS_FAILURE,
//   payload: error,
// });

// export const getUsers = () => {
//   return dispatch => {
//     dispatch(getUsersBegin());

//     WeDeploy.data(process.env.REACT_APP_DATABASE)
//       .get('users')
//       .then(users => {
//         dispatch(getUsersSuccess(users));
//       })
//       .catch(error => dispatch(getUsersFailure(error)));
//   };
// };
