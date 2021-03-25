import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { addGenderPreferences, fetchPreferences } from '../../store/preferences';
import './Profile.css';
function User({user}) {
    const dispatch = useDispatch();

    const genderPreferenceId = useSelector((state) => state.genderPreference.genderPreferences);

    let genders = [ "Woman", "Man", "Agender",
                    "GenderQueer", "Intersex",
                    "Non-binary", "Other","Trans", 
                    ]
    const [genderPreference, setGenderPreference] = useState("")


    let changeGenderPreferences = genderPreferenceId.indexOf(genderPreference)

    const onGenderClick = async (e) => {
        e.preventDefault();

        const userId = user.id
    
        const myUser = addGenderPreferences(userId, changeGenderPreferences);
        if (!myUser.errors) {
            dispatch(addGenderPreferences(userId, changeGenderPreferences += 1));
            window.location.href='/matches';
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
        <div key={user.id} className='whole-user-profile-container'>
            <div className='user-profile-elements'>
                <img src={user.profilePhotoUrl} className='match-card-pic'/>
                <h1 className='match-card-name-age'>{user.firstName}, {user.age}</h1>
                <p className='bio'>{user.bio}</p>    
                <p className='gender-preference-text'>Gender Preferences</p>
                <form onSubmit={onGenderClick} className='multi-select-profile'>
                    <div className='input-sizing'> 
                        { genders.map(eachGender => {
                            if (genderPreference.length >= 1) {
                            return (
                                <div className='each-gender-input'>
                                    <input 
                                        className='gender-text'
                                        type="checkbox"
                                        name="genderPreferences"
                                        placeholder={eachGender}
                                        onChange={updateGenderPreference}
                                        value={eachGender}
                                    ></input>{eachGender}
                                </div>
                                )
                            } else {
                                return (
                                    <div className='each-gender-input'>
                                    <input
                                        type="checkbox"
                                        name="genderPreferences"
                                        className='gender-text'
                                        placeholder={eachGender}
                                        onChange={updateGenderPreference}
                                        value={eachGender}
                                        required={true}
                                    ></input>{eachGender}</div> 
                                )   
                            }
                        })}
                    </div>
                    <button className='gender-preference-update' type="submit">Gender Preferences Update</button>
                </form>
            </div>
        </div>
    );
};

export default User;
