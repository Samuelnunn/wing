import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import LogoutButton from '../auth/LogoutButton';
import { useState } from 'react';


const LandingPage = ({ setAuthenticated }) => {
    
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)

    const loadMainFeed = () => {
        // dispatch(getMatchesForUser()) - store
      }
     
      return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/login" exact={true} activeClassName="active">
                        Login
                    </NavLink>
                </li>
                <li>
                  <NavLink to="/sign-up" exact={true} activeClassName="active">
                        Sign Up
                  </NavLink>
                </li> 
            </ul>
        </nav>
      
  );
}



export default LandingPage;