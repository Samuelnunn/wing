const SET_MATCHES = "matches/setPotentialMatches";
const SET_OTHER_USER_MATCHES = "matches/setOtherUserMatched";
const SET_SEEN_USERS = "seen/SET_SEEN_USERS";


const setPotentialMatches = (matches) => {
    return {
        type: SET_MATCHES,
        matches
    };
};

const setOtherUserMatches = (otherUserMatched) => {
    return {
        type: SET_OTHER_USER_MATCHES,
        otherUserMatched
    };
};

const setSeenUser = (seenUsers) => {
    return {
        type: SET_SEEN_USERS,
        seenUsers
    };
};




export const userToBeSeen = (userId) => async (dispatch) => {
    const response = await fetch(`/api/matches/seen/${userId}`,{
        method: "POST",
    });
    const user = await response.json();
    // if(!user.errors) {
    //     dispatch(setSeenUser(user));
    // }
  return user;
};

export const getSeenUsers = () => async (dispatch) => {
    const response = await fetch(`/api/matches/seen/`);
    const potentialMatches = await response.json();
    console.log(potentialMatches)
    if(!potentialMatches.errors) {
        dispatch(setSeenUser(potentialMatches));
    }
  return potentialMatches;
};



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
};


function matchesReducer(state = {matches: [], otherUserMatched: [], seenUsers: []}, {type, matches, otherUserMatched, seenUsers}) {
    if (state.seenUsers.length) {
        const filteredUser = new Set();
        state.seenUsers.forEach(({id}) => filteredUser.add(id));
        matches = matches.filter((user) => {
            return !filteredUser.has(user.id);
        });
        console.log(filteredUser)
    }
    switch (type) {
    case SET_MATCHES:
      return {...state, matches};
    case SET_OTHER_USER_MATCHES:
      return {...state, otherUserMatched};
    case SET_SEEN_USERS:
        return {...state, seenUsers};
    default:
      return state;
  };
};

export default matchesReducer;