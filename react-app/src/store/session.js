const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => {
    return {
      type: SET_USER,
      user,
    };
  };

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};


export const addUser = (user) => async (dispatch) => {
    const response = await fetch('/api/auth/',{
        headers: {
          'Content-Type': 'application/json'
        }
    });
    const user = await response.json();
    if(!user.errors) {
        dispatch(setUser(user));
    }
  return user;
};

export const loginUser = (email, password) => async (dispatch) => {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
    });
    const user = await response.json();
    if (!user.errors) {
        dispatch(setUser(user));
    }
    return user;
};

export const signUp = (username, email, password, firstName, lastName, age,
                       zipCode, bio, gender, profilePicture) => async (dispatch) => {
    const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            email,
            password,
            firstName, 
            lastName, 
            age,
            zipCode, 
            bio, 
            gender, 
            profilePicture
        }),
    });
    const user = await response.json();
    if (!user.errors) {
        dispatch(setUser(user));
    }
    return user;
  };

export const logoutUser = () => async (dispatch) => {
    dispatch(removeUser());
    return "Logged out";
};



const initialState = { user: null };

function sessionReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_USER:
        newState = Object.assign({}, state, { user: action.user });
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state, { user: undefined });
      return newState;
    default:
      return state;
  }
}

export default sessionReducer;