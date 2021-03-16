const SET_MATCHES = "matched/SET_MATCHED_USERS";
const SET_MATCH = "matched/SET_MATCHED_USER";


const setMatchedUsers = (matchedUsers) => {
    return {
        type: SET_MATCHES,
        matchedUsers
    };
};

const setMatchedUser = (matchedUser) => {
    return {
        type: SET_MATCH,
        matchedUser
    };
};

export const getMatches = () => async (dispatch) => {
    const response = await fetch(`/api/matches/matched/`);
    const userMatches = await response.json();
    if (!userMatches.errors) {
      dispatch(setMatchedUsers(userMatches));
    }
    return userMatches;
};

export const matchedByOtherUser = () => async (dispatch) => {
    const response = await fetch(`/api/matches/matched/`);
    const userMatches = await response.json();
    if(!userMatches.errors) {
        dispatch(setMatchedUsers(userMatches));
    }
  return userMatches
};

export const unmatchUser = (userId) => async (dispatch) => {
    const response = await fetch(`/api/matches/unmatch/${userId}`, {
        method: "DELETE",
    });
    const userMatches = await response.json();
    console.log(userMatches)
    if(!userMatches.errors) {
        dispatch(setMatchedUser(userMatches));
    }
  return userMatches;
};

const initialState = { matchedUsers: {} };

function matchedReducer(state = initialState, action) {
    switch (action.type) {
      case SET_MATCHES:
        return {...state, matchedUsers: { ...action.matchedUsers }};
      case SET_MATCH:
        return {...state, matchedUsers: {[action.matchedUser.id]: action.matchedUser, ...state.matchedUsers}}
      default:
        return state;
    }
};


  
export default matchedReducer;