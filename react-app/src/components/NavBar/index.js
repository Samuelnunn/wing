import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import AuthFormModal from '../LoginForm/index';
import LoggedInUser from './LoggedInUser';
import SplashPage from '../Splash';
import LogoutButton from '../auth/LogoutButton';
import './Navbar.css'
import '../../index.css'



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
            <div className='border-length'>
                <span className="nav-links">{loaded && sessionLinks} </span>
            </div>
        </div>
    )

    }
    
    export default NavBar;