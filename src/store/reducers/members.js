import * as actionTypes from '../actions/actionTypes';

const initialState = {
  currentMember: {},
  members: [],
  failedToGetMembers: false,
  getMembersError: [],
  gettingMembers: true,
  settingCurrentMember: false,
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
    case actionTypes.SET_CURRENT_MEMBER_BEGIN:
      return {
        ...state,
        settingCurrentMember: true,
      };
    case actionTypes.SET_CURRENT_MEMBER_SUCCESS:
      return {
        ...state,
        currentMember: action.payload,
        settingCurrentMember: false,
      };
    case actionTypes.SET_CURRENT_MEMBER_FAILURE:
      return {
        ...state,
        currentMember: action.payload,
        settingCurrentMember: false,
      };
    default:
      return state;
  }
};

export default reducer;
