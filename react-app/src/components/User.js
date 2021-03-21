import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { addGenderPreferences, fetchPreferences } from '../store/preferences';

function User({user}) {
    const dispatch = useDispatch();

    const genderPreferenceId = useSelector((state) => state.genderPreference.genderPreferences);

    console.log(genderPreferenceId)

    let genders = ["Woman", "Cis Woman", "Trans Woman", "Man",
    "Cis Man", "Trans Man", "Agender", "Androgynous",
    "Bigender", "GenderFluid", "GenderQueer",
    "Gender Nonconforming", "Hijra", "Intersex",
    "Non-binary", "Other", "Pangender", "Transfeminine",
    "Transmasculine", "Transsexual", "Two Spirit"]
    const [genderPreference, setGenderPreference] = useState("")

    console.log(genderPreferenceId.indexOf("Man"))
    let changeGenderPreferences = genderPreferenceId.indexOf(genderPreference)
    // console.log(change_gender_preferences += 1)
    // const currentgenderPreference = useSelector((state) => state.messages)
    const onGenderClick = async (e) => {
    e.preventDefault();
    // console.log(gendersToUpdate)
    const userId = user.id
    
    const myUser = addGenderPreferences(userId, changeGenderPreferences);
    // const genderPreferenceData = await genderPreferenceFormData(genderPreference)
    console.log(genderPreference)
    if (!myUser.errors) {
        dispatch(addGenderPreferences(userId, changeGenderPreferences += 1));
        window.location.href='/matches';
        // dispatch(addGenderPreferences(genderPreferenceData))
    }
};

const updateGenderPreference = (e) => {
    e.preventDefault()
    setGenderPreference(e.target.value);
};

  if (!user) {
    return null;
  }

  return (
    <ul key={user.id}>
      <li>
        <strong>User Id</strong> {user.id}
      </li>
      <li>
        <strong>Username</strong> {user.username}
      </li>
      <li>
        <strong>Email</strong> {user.email}
      </li>
      <form onSubmit={onGenderClick}>
      <div> 
                <p>Gender Preference:</p>
                { genders.map(eachGender => {
                    if (genderPreference.length >= 1) {
                    return (
                        <>
                            <input
                                type="checkbox"
                                name="genderPreferences"
                                placeholder={eachGender}
                                onChange={updateGenderPreference}
                                value={eachGender}
                            ></input>{eachGender}
                        </>
                        )
                    } else {
                        return (
                            <>
                            <input
                                type="checkbox"
                                name="genderPreferences"
                                placeholder={eachGender}
                                onChange={updateGenderPreference}
                                value={eachGender}
                                required={true}
                            ></input>{eachGender}</> 
                        )   
                    }
                })}
            </div>
            <button type="submit">Gender Preferences Update</button>
      </form>
    </ul>
  );
}
export default User;
