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


export const fetchPreferences = () => {
    return async (dispatch) => {
        const response = await fetch(`/api/preferences/genders/`);
        const responseJSON = await response.json();
        dispatch(setGenderPreference());
       
      }
    };



export const addPreferenceToState = () => async (dispatch) => {
    const response = await fetch(`/api/preference/genders/`);
    const preferences = await response.json()
    dispatch(setGenderPreference(preferences))
    return preferences;
  

};

export const addGenderPreferences = (id, genderPreference) => async (dispatch) => {
    console.log(genderPreference)
    const response = await fetch(`/api/preference/genders/${genderPreference}`,{
        method: "PUT",
    
    });


};

const initialState = { genderPreferences: [] };
const genderPreferenceReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_GENDER_PREFERENCES:
          return { ...state, genderPreferences: action.genderPreferences };
        default:
          return state;
      }
};

export default genderPreferenceReducer;