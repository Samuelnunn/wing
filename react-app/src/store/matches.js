const SET_MATCHES = "session/setPotentialMatches";

const setPotentialMatches = (matches) => {
    return {
        type: SET_MATCHES,
        payload: matches
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

const initialState = [];

function matchesReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_MATCHES:
      newState = action.payload;
      return newState;
    default:
      return state;
  }
}

export default matchesReducer;