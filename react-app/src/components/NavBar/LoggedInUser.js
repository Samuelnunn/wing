import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory, Link } from "react-router-dom";
import { logout } from '../../services/auth';
import LogoutButton from '../auth/LogoutButton'
import User from '../Profile/User'
import MatchCard from "../Match";


function LoggedInUser({ user, setAuthenticated }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu, logout]);

  const logoutUser = async (e) => {
      e.preventDefault()
      dispatch( await logout(history.push("/")))
  }

  return (
    <>
      <Link to="/matches">
        <p title="Profile">Wing</p>
      </Link>
      <Link to="/messages">
        <p>messages</p>
      </Link>
      <Link to="/matched">
        <p>Matches</p>
      </Link>
      <Link to="/profile">
        <p>profile</p>
      </Link>
      {/* <button onClick={openMenu}>
        <p>Menu</p>
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
            <MatchCard />
        </ul>
      )} */}
        <LogoutButton setAuthenticated={setAuthenticated} />
    </>
  );
}

export default LoggedInUser;