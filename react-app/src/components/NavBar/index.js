import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useAuthContext } from '../../context/AuthContext'
import AuthFormModal from '../LoginForm/index'
import LoggedInUser from './LoggedInUser'
import LogoutButton from '../auth/LogoutButton';
import { useState } from 'react';
import './Navbar.css'
import MatchCard from '../Match';


const NavBar = ({ loaded, setAuthenticated }) => {
    const user = useSelector(state => state.session.user)

    let sessionLinks;

    if (user) {
       sessionLinks = ( 
            <LoggedInUser user={user} loaded={loaded} setAuthenticated={setAuthenticated} /> 
       );
    } else {
        sessionLinks = (
        <>
            <AuthFormModal setAuthenticated={setAuthenticated}/> 
        </>
        )
    }

    return (
        <div className='nav-bar'>
            <span className="nav-links">{loaded && sessionLinks} </span>
        </div>
    )

    }
    
    export default NavBar;