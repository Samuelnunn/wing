const SET_GENDER_PREFERENCES = 'session/setGenderPreferences';
const REMOVE_GENDER_PREFERENCES= 'session/removeGenderPreferences';

const setGenderPreference = (genderPreferences) => {
    return {
      type: SET_GENDER_PREFERENCES,
      genderPreferences,
    };
  };

const removeGenderPreferences = () => {
  return {
    type: REMOVE_GENDER_PREFERENCES,
  };
};


export const addGenderPreferences = (genderPreference, id) => async (dispatch) => {
    const formData = new FormData();
    formData.append("gender_preference", genderPreference)
    
    const response = await fetch(`/api/users/${id}`,{
        method: "PUT",
        body: formData,
    });
    const genderPreferences = await response.json();
    if(!genderPreferences.errors) {
        dispatch(setGenderPreference(genderPreferences));
    }
  return genderPreferences;
};



const initialState = { genderPreferences: null };
const genderPreferenceReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_GENDER_PREFERENCES:
          return { ...state, genderPreferences: action.genderPreferences };
        default:
          return state;
      }
};

export default genderPreferenceReducer;