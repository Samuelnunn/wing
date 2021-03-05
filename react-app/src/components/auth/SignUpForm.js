import React, { useState, useRef } from "react";
import { Redirect } from 'react-router-dom';
import { signUp, genderPreferenceFormData } from '../../services/auth';
import { useDispatch } from 'react-redux'
import { addUser } from '../../store/session'
// import { addGenderPreferences } from '../../store/preferences.js'

const SignUpForm = ({authenticated, setAuthenticated}) => {
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
    const [selectedFile, setSelectedFile] = useState("Profile Image")
    const [genderPreference, setGenderPreference] = useState("")

    const dispatch = useDispatch();
    let genders = ["Woman", "Cis Woman", "Trans Woman", "Man",
           "Cis Man", "Trans Man", "Agender", "Androgynous",
           "Bigender", "GenderFluid", "GenderQueer",
           "Gender Nonconforming", "Hijra", "Intersex",
           "Non-binary", "Other", "Pangender", "Transfeminine",
           "Transmasculine", "Transsexual", "Two Spirit"]

    const onSignUp = async (e) => {
        e.preventDefault();
        if (password === repeatPassword) {
            const user = await signUp(username, email, password, 
                                      firstName, lastName, age, 
                                      zipCode, bio, gender, profilePicture,
                                      genderPreference);
            // const genderPreferenceData = await genderPreferenceFormData(genderPreference)
          if (!user.errors) {
            setAuthenticated(true);
            dispatch(addUser(user));
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
        return <Redirect to="/" />;
    }

    return (
        <form onSubmit={onSignUp}>
            <div>
                <input
                    type="text"
                    name="username"
                    placeholder='Username'
                    onChange={updateUsername}
                    value={username}
                ></input>
            </div>
            <div>
            <input
                    type="text"
                    name="email"
                    placeholder='Email'
                    onChange={updateEmail}
                    value={email}
            ></input>
            </div>
            <div>
                <input
                    type="password"
                    name="password"
                    placeholder='Password'
                    onChange={updatePassword}
                    value={password}
                ></input>
            </div>
            <div>
                <input
                    type="password"
                    name="repeat_password"
                    placeholder='Confirm password'
                    onChange={updateRepeatPassword}
                    value={repeatPassword}
                    required={true}
                ></input>
            </div>
            <div>    
                <input
                    type="text"
                    name="firstName"
                    placeholder='First Name'
                    onChange={updateFirstName}
                    value={firstName}
                    required={true}
                ></input>
            </div>
            <div>    
                <input
                    type="text"
                    name="lastName"
                    placeholder='Last Name'
                    onChange={updateLastName}
                    value={lastName}
                    required={true}
                ></input>
            </div>
            <div>    
                <input
                    type="number"
                    name="age"
                    placeholder='Age'
                    onChange={updateAge}
                    value={age}
                    required={true}
                ></input>
            </div>
            <div>    
                <input
                    type="number"
                    name="zipCode"
                    placeholder='Zip Code'
                    onChange={updateZipCode}
                    value={zipCode}
                    required={true}
                ></input>
            </div>
            <div>
                <input
                    type="text"
                    name="bio"
                    placeholder='Tell people about your person'
                    onChange={updateBio}
                    value={bio}
                    required={true}
                ></input>
            </div>
            <div> 
                <p>Idententifying Gender :</p>
                { genders.map(eachGender => {
                    if (gender.length >= 1) {
                    return (
                        <>
                            <input
                                type="checkbox"
                                name="gender"
                                placeholder={eachGender}
                                onChange={updateGender}
                                value={eachGender}
                            ></input>{eachGender}
                        </>
                        )
                    } else {
                        return (
                            <>
                            <input
                                type="checkbox"
                                name="gender"
                                placeholder={eachGender}
                                onChange={updateGender}
                                value={eachGender}
                                required={true}
                            ></input>{eachGender}</> 
                        )   
                    }
                })}
            </div>
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
            <div>
                <h5 className='normalize-text' style={{ margin: '0', overflow: 'hidden' }}>{selectedFile}</h5>
            </div>
            <div>
            <input
                    
                    type="file"
                    name="user_file"
                    onChange={updateProfilePhotoPicture}
                    ref={fileInput}
                /> 
            </div>
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default SignUpForm;
