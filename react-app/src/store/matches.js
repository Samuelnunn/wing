

const SET_MATCHES = "matches/setPotentialMatches";
const SET_OTHER_USER_MATCHES = "matches/setOtherUserMatched";

const setPotentialMatches = (matches) => {
    return {
        type: SET_MATCHES,
        matches
    }
}

const setOtherUserMatches = (otherUserMatched) => {
    return {
        type: SET_OTHER_USER_MATCHES,
        otherUserMatched
    }
}


export const getPotentialMatches = () => async (dispatch) => {
    const response = await fetch(`/api/matches/`);
    const potentialMatches = await response.json();
    if(!potentialMatches.errors) {
        dispatch(setPotentialMatches(potentialMatches));
    }
  return potentialMatches;
};

export const usersWhoHaveMatchedCurrent = () => async (dispatch) => {
    const response = await fetch(`/api/matches/want/`);
    const potentialMatches = await response.json();
    if(!potentialMatches.errors) {
        dispatch(setOtherUserMatches(potentialMatches));
    }
  return potentialMatches;
};


export const matchUsers = (userId) => async (dispatch) => {
    const response = await fetch(`/api/matches/matched/${userId}`,{
        method: "POST",
    });
    const users = await response.json();
    if(!users.errors) {
        dispatch(setPotentialMatches(users));
    }
  return users;
};



function matchesReducer(state = {matches: [], otherUserMatched: []}, {type, matches, otherUserMatched}) {

  switch (type) {
    case SET_MATCHES:
      return {...state, matches};
    case SET_OTHER_USER_MATCHES:
      return {...state, otherUserMatched};
    default:
      return state;
  }
}

export default matchesReducer;