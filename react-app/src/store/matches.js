

const SET_MATCHES = "matches/setPotentialMatches";

const setPotentialMatches = (matches) => {
    return {
        type: SET_MATCHES,
        matches
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



function matchesReducer(state = {matches: []}, {type, matches}) {

  switch (type) {
    case SET_MATCHES:
      return {...state, matches};
    default:
      return state;
  }
}

export default matchesReducer;