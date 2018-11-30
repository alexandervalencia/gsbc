import * as actionTypes from '../actions/actionTypes';

import WeDeploy from 'wedeploy';

const initialState = {
  currentUser: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
      };
    case actionTypes.GET_CURRENT_USER_NONE:
      return {
        ...state,
        currentUser: null,
      };
    case actionTypes.SIGN_OUT:
      WeDeploy.auth('https://auth-gsbc.wedeploy.io').signOut();

      return {
        ...state,
        currentUser: null,
      };
    default:
      return state;
  }
};

export default reducer;
