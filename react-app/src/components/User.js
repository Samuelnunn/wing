import React, { useState, useEffect, useSelector } from "react";
import { useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { addGenderPreferences } from '../store/preferences';

function User({user}) {
    // const user = useSelector(state => state.session.user);
    console.log(user)
  const [genderPreference, setGenderPreference] = useState("")
  const dispatch = useDispatch();
  let genders = ["Woman", "Cis Woman", "Trans Woman", "Man",
         "Cis Man", "Trans Man", "Agender", "Androgynous",
         "Bigender", "GenderFluid", "GenderQueer",
         "Gender Nonconforming", "Hijra", "Intersex",
         "Non-binary", "Other", "Pangender", "Transfeminine",
         "Transmasculine", "Transsexual", "Two Spirit"]

 const onGenderClick = async (e) => {
    e.preventDefault();
    const userId = user.id
    const myUser = await addGenderPreferences(userId, genderPreference);
    // const genderPreferenceData = await genderPreferenceFormData(genderPreference)
    if (!myUser.errors) {
        dispatch(addGenderPreferences(user));
        window.location.href='/matches';
        // dispatch(addGenderPreferences(genderPreferenceData))
    }
};

const updateGenderPreference = (e) => {
    setGenderPreference(e.target.value);
};

  if (!user) {
    return null;
  }

  return (
    <ul>
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
