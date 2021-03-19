import React from "react";
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux";
import { logout } from "../../services/auth";
import '../LoginForm/LoginForm.css'

const LogoutButton = ({setAuthenticated}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    await logout();
    setAuthenticated(false);
    window.location.href='/';
  };


  return <button onClick={onLogout} id='nav-link-buttons'>Logout</button>;
};

export default LogoutButton;

