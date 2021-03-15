import { CardActions } from "@material-ui/core";

const CREATE_MATCHES = "matched/createMatches";
const REMOVE_MATCH = "matched/removeMatches";


const getMatchedUser = (matchedUser) => {
    return {
        type: CREATE_MATCHES,
        matchedUser
    };
};

const removeMatch = (matchedUser) => {
    return {
        type: REMOVE_MATCH,
        matchedUser
    };
};

export const matchedByOtherUser = () => async (dispatch) => {
    const response = await fetch(`/api/matches/matched/`);
    const userMatches = await response.json();
    if(!userMatches.errors) {
        dispatch(getMatchedUser(userMatches));
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
        dispatch(removeMatch(userMatches));
    }
  return userMatches;
};



function matchedReducer(state = { matchedUser: []}, action) {
    switch (action.type) {
      case CREATE_MATCHES:
        return {...state, matchedUser: action.matchedUser};
      case REMOVE_MATCH:
        return {...state, matchedUser: action.matchedUser}
      default:
        return state;
    }
};


  
export default matchedReducer;