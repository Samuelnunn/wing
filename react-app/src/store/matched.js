const CREATE_MATCHES = "matches/createMatches";

const getMatchedUser = (matchedUser) => {
    return {
        type: CREATE_MATCHES,
        payload: matchedUser
    }
}

export const matchedByOtherUser = () => async (dispatch) => {
    const response = await fetch(`/api/matches/matched/`);
    const userMatches = await response.json();
    if(!userMatches.errors) {
        dispatch(getMatchedUser(userMatches));
    }
  return userMatches;
};

const initialState = [];

function matchedReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
      case CREATE_MATCHES:
        newState = action.payload;
        return newState;
      default:
        return state;
    }
  }
  
  export default matchedReducer;