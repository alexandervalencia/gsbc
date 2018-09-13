import * as actionTypes from '../actions/actionTypes';

const initialState = {
  currentMember: {},
  members: [],
  failedToGetMembers: false,
  getMembersError: [],
  gettingMembers: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_MEMBERS_BEGIN:
      return {
        ...state,
        gettingMembers: true,
      };
    case actionTypes.GET_MEMBERS_SUCCESS:
      return {
        ...state,
        members: action.payload,
        failedToGetMembers: false,
        gettingMembers: false,
      };
    case actionTypes.GET_MEMBERS_FAILURE:
      return {
        ...state,
        failedToGetMembers: true,
        getMembersError: action.payload.error,
        gettingMembers: false,
      };
    case actionTypes.SET_CURRENT_MEMBER:
      return {
        ...state,
        currentMember: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
