import * as actionTypes from '../actions/actionTypes';

const initialState = {
  currentUser: null,
  users: [],
  failedToGetUsers: false,
  getUsersError: [],
  gettingUsers: true,
  settingCurrentUser: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USERS_BEGIN:
      return {
        ...state,
        gettingUsers: true,
      };
    case actionTypes.GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        failedToGetUsers: false,
        gettingUsers: false,
      };
    case actionTypes.GET_USERS_FAILURE:
      return {
        ...state,
        failedToGetUsers: true,
        getUsersError: action.payload.error,
        gettingUsers: false,
      };
    case actionTypes.INIT_APP:
      let currentUser = null;
      if (action.payload.currentUser !== null) {
        currentUser = action.payload.users.find(user => user.userId === action.payload.currentUser.id);
      }
      return {
        ...state,
        currentUser,
        users: action.payload.users,
      };
    case actionTypes.SET_CURRENT_USER_BEGIN:
      return {
        ...state,
        settingCurrentUser: true,
      };
    case actionTypes.SET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        settingCurrentUser: false,
      };
    case actionTypes.SET_CURRENT_USER_FAILURE:
      return {
        ...state,
        currentUser: null,
        settingCurrentUser: false,
      };
    case actionTypes.SIGN_OUT:
      return {
        ...state,
        currentUser: null,
      };
    default:
      return state;
  }
};

export default reducer;
