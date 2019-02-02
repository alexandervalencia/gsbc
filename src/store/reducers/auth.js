import * as actionTypes from '../actions/actionTypes';

const initialState = {
  addingUser: false,
  addUserError: false,
  currentUser: null,
  signInError: false,
  signingIn: false,
  resetPasswordEmailSending: false,
  resetPasswordEmailSent: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_USER_SUCCESS:
      return {
        ...state,
        addingUser: false,
      };
    case actionTypes.ADD_USER_BEGIN:
      return {
        ...state,
        addingUser: true,
      };
    case actionTypes.ADD_USER_FAILURE:
      return {
        ...state,
        addUserError: action.payload,
      };
    case actionTypes.SET_CURRENT_USER_BEGIN:
      return {
        ...state,
        signingIn: true,
      };
    case actionTypes.SET_CURRENT_USER_SUCCESS:
    case actionTypes.SUBMIT_SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        signInError: false,
        signingIn: false,
      };
    case actionTypes.SET_CURRENT_USER_FAILURE:
      return {
        ...state,
        currentUser: null,
        signingIn: false,
      };
    case actionTypes.SIGN_OUT:
      return {
        ...state,
        currentUser: null,
      };
    case actionTypes.SUBMIT_SIGN_IN_BEGIN:
      return {
        ...state,
        signingIn: true,
        signInError: false,
      };
    case actionTypes.SUBMIT_SIGN_IN_FAILURE:
      return {
        ...state,
        signInError: true,
        signingIn: false,
      };
    case actionTypes.RESET_PASSWORD_BEGIN:
      return {
        ...state,
        resetPasswordEmailSending: true,
        resetPasswordEmailSent: false,
      };
    case actionTypes.RESET_PASSWORD_FAILURE:
      return {
        ...state,
        resetPasswordEmailSending: false,
        resetPasswordEmailSent: false,
      };
    case actionTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordEmailSending: false,
        resetPasswordEmailSent: true,
      };
    default:
      return state;
  }
};

export default reducer;
