import React, { useState, useRef } from "react";
import { Redirect, useHistory } from 'react-router-dom';
import { signUp, genderPreferenceFormData } from '../../services/auth';
import { useDispatch } from 'react-redux';
import { addUser } from '../../store/session';
import './SignUp.css';
import wing from './w-logo.png';

const SignUpForm = ({authenticated, setAuthenticated, onClose}) => {
    const history = useHistory();
    const fileInput = useRef(null)
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [bio, setBio] = useState("");
    const [gender, setGender] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const [selectedFile, setSelectedFile] = useState("Choose A Profile Picture");
    const [genderPreference, setGenderPreference] = useState("");

    const dispatch = useDispatch();
    let genders = ["Woman", "Man",
                   "Agender", "GenderQueer",
                   "Intersex", "Non-binary", 
                   "Other", "Trans",];

    const onSignUp = async (e) => {
        e.preventDefault();
        if (password === repeatPassword) {
            const user = await signUp(username, email, password, 
                                      firstName, lastName, age, 
                                      zipCode, bio, gender, profilePicture,
                                      genderPreference);
          if (!user.errors) {
            setAuthenticated(true);
            onClose()
            dispatch(addUser(user));
            window.location.href='/matches';
            // dispatch(addGenderPreferences(genderPreferenceData))
          }
        }
    };

    const updateUsername = (e) => {
        setUsername(e.target.value);
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };
  
    const updatePassword = (e) => {
        setPassword(e.target.value);
    };
  
    const updateRepeatPassword = (e) => {
        setRepeatPassword(e.target.value);
    };
  
    const updateFirstName = (e) => {
        setFirstName(e.target.value);
    };
  
    const updateLastName = (e) => {
        setLastName(e.target.value);
    };
    
    const updateAge = (e) => {
        setAge(e.target.value);
    };

    const updateZipCode = (e) => {
        setZipCode(e.target.value);
    };
  
    const updateBio = (e) => {
        setBio(e.target.value);
    };
  
    const updateGender = (e) => {
        setGender(e.target.value);
    };
    
    const updateGenderPreference = (e) => {
        setGenderPreference(e.target.value);
    };
  
    const updateProfilePhotoPicture = (e) => {
        setProfilePicture(e.target.files[0]);
        if (!e.target.files.length) {
            setSelectedFile('Profile Image')
        } else {
            setSelectedFile(`${e.target.value.split('\\').pop()}`)
        }
    }

    if (authenticated) {
        return <Redirect to="/matches" />;
    }

    return (
        <form onSubmit={onSignUp} className='signup-form-container'>
            <div className='right-side-container'>
                <img src={wing} className='w-logo'/>
            </div>
            <div className='sign-up-side'>
                <div className='email-ele'>
                    <input
                        type="text"
                        name="username"
                        placeholder='Username'
                        onChange={updateUsername}
                        value={username}
                        className='input-fields'
                    ></input>
                </div>
                <div className='email-ele'> 
                    <input
                        type="text"
                        name="email"
                        placeholder='Email'
                        onChange={updateEmail}
                        value={email}
                        className='input-fields'
                    ></input>
                </div>
                <div className='email-ele'>
                    <input
                        type="password"
                        name="password"
                        placeholder='Password'
                        onChange={updatePassword}
                        value={password}
                        className='input-fields'
                    ></input>
                </div>
                <div className='email-ele'>                    <input
                        type="password"
                        name="repeat_password"
                        placeholder='Confirm password'
                        onChange={updateRepeatPassword}
                        value={repeatPassword}
                        required={true}
                        className='input-fields'
                    ></input>
                </div>
                <div className='email-ele'>  
                    <input
                        type="text"
                        name="firstName"
                        placeholder='First Name'
                        onChange={updateFirstName}
                        value={firstName}
                        required={true}
                        className='input-fields'
                    ></input>
                </div>
                <div className='email-ele'>  
                    <input
                        type="text"
                        name="lastName"
                        placeholder='Last Name'
                        onChange={updateLastName}
                        value={lastName}
                        required={true}
                        className='input-fields'
                    ></input>
                </div>
                <div className='email-ele'> 
                    <input
                        type="number"
                        name="age"
                        placeholder='Age'
                        onChange={updateAge}
                        value={age}
                        required={true}
                        className='input-fields'
                    ></input>
                </div>
                <div className='email-ele'>   
                    <input
                        type="number"
                        name="zipCode"
                        placeholder='Zip Code'
                        onChange={updateZipCode}
                        value={zipCode}
                        required={true}
                        className='input-fields'
                    ></input>
                </div>
                <div className='bio-ele'>
                    <label>Tell the world about your person</label>
                    <input
                        type="text"
                        name="bio"
                        placeholder='Short Bio'
                        onChange={updateBio}
                        value={bio}
                        required={true}
                        className='bio-text-ele'
                    ></input>
                </div>
                <div className='gender-id-ele'>
                    <label className='gender-id-label'>Identifying Gender </label> 
                    {genders.map(eachGender => {
                        if (gender.length >= 1) {
                        return (
                            <div className='gender-text'>
                                <input
                                    type="checkbox"
                                    name="gender"
                                    placeholder={eachGender}
                                    onChange={updateGender}
                                    value={eachGender}
                                    className='gender-text'
                                ></input>{eachGender}
                            </div>
                            )
                        } else {
                            return (
                                <div className='gender-text'>
                                    <input
                                        type="checkbox"
                                        name="gender"
                                        placeholder={eachGender}
                                        onChange={updateGender}
                                        value={eachGender}
                                        required={true}
                                        className='gender-text'
                                    ></input>{eachGender}
                                </div> 
                            )   
                        }
                    })}
                    </div>
                <div className='gender-pref-ele'> 
                    <label className='gender-pref-label'>Gender Preferences</label>
                    { genders.map(eachGender => {
                        if (genderPreference.length >= 1) {
                        return (
                            <div className='gender-text'>
                                <input
                                    type="checkbox"
                                    name="genderPreferences"
                                    placeholder={eachGender}
                                    onChange={updateGenderPreference}
                                    value={eachGender}
                                    className='gender-text'
                                ></input>{eachGender}
                            </div>
                            )
                        } else {
                            return (
                                <div className='gender-text'>
                                    <input
                                        type="checkbox"
                                        name="genderPreferences"
                                        placeholder={eachGender}
                                        onChange={updateGenderPreference}
                                        value={eachGender}
                                        required={true}
                                        className='gender-text'
                                    ></input>{eachGender}
                                </div> 
                            )   
                        }
                    })}
                </div>
                <div>
                    <h5 className='normalize-text' style={{ margin: '0', overflow: 'hidden' }}>
                        {selectedFile}</h5>
                </div>
                <div className='profile-pic-upload-container'>
                <label className='profile-pic-input'>Upload Picture 
                    <input       
                        type="file"
                        name="user_file"
                        onChange={updateProfilePhotoPicture}
                        ref={fileInput}
                        className='profile-pic-input'
                    /> 
                </label>
                </div>
                <div className='padding-buffer'/>
                <button type="submit" className='button-ele'>Sign Up</button>
            </div>
        </form>
    );
};

export default SignUpForm;
